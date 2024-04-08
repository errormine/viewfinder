#!/bin/bash

# Install MariaDB
sudo apt update
curl -LsS https://r.mariadb.com/downloads/mariadb_repo_setup | sudo bash
sudo apt install -y mariadb-server
echo "MariaDB installation complete."
mariadb -V

# Start MariaDB service
sudo systemctl start mariadb

# Create tables
sudo mariadb < /tmp/team02m_db.sql

# Set port number
sudo sed -i "20s/.*/port=${DBPORT}/" /etc/mysql/mariadb.conf.d/50-server.cnf

# Allow external connections
sudo sed -i 's/^bind-address\s*=.*/bind-address = 0.0.0.0/' /etc/mysql/mariadb.conf.d/50-server.cnf

# Enable MASTER and binary logging
# https://mariadb.com/kb/en/setting-up-replication/
echo "server-id = 1" | sudo tee -a /etc/mysql/mariadb.conf.d/50-server.cnf
echo "log_bin = /var/log/mysql/mariadb-bin" | sudo tee -a /etc/mysql/mariadb.conf.d/50-server.cnf
echo "binlog_do_db = team02m_db" | sudo tee -a /etc/mysql/mariadb.conf.d/50-server.cnf

# Open firewall
sudo systemctl start firewalld
sudo firewall-cmd --zone=meta-network --add-port=${DBPORT}/tcp --permanent
sudo firewall-cmd --reload

# Create user for web app
sudo mariadb -e "CREATE USER '${DBUSER}'@'${IPRANGE}' IDENTIFIED BY 'password';"
sudo mariadb -e "SET PASSWORD FOR '${DBUSER}'@'${IPRANGE}' = PASSWORD('${DBPASS}');"
sudo mariadb -e "GRANT SELECT, UPDATE, INSERT, DELETE ON team02m_db.* TO '${DBUSER}'@'${IPRANGE}';"
sudo mariadb -e "FLUSH PRIVILEGES;"

# Create a replication user using secret (vault) 
sudo mariadb -e "CREATE USER 'replicator'@'${IPRANGE}' IDENTIFIED BY 'password';"
sudo mariadb -e "SET PASSWORD FOR 'replicator'@'${IPRANGE}' = PASSWORD('${DBPASSREPLICA}');"
sudo mariadb -e "GRANT REPLICATION SLAVE ON team02m_db.* TO 'replicator'@'${IPRANGE}';"
sudo mariadb -e "FLUSH PRIVILEGES;"

# Restart MariaDB service
sudo systemctl restart mariadb

echo "MariaDB MASTER setup complete."



