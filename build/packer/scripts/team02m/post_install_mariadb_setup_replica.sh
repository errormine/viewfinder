#!/bin/bash

# Install MariaDB
sudo apt update
curl -LsS https://r.mariadb.com/downloads/mariadb_repo_setup | sudo bash
sudo apt install -y mariadb-server
echo "MariaDB installation complete."
mariadb -V

# Start MariaDB service
sudo systemctl start mariadb

# Set unique server ID for the replica
echo "server-id = 2" | sudo tee -a /etc/mysql/mariadb.conf.d/50-server.cnf
echo "relay-log = /var/log/mysql/mariadb-relay-bin" | sudo tee -a /etc/mysql/mariadb.conf.d/50-server.cnf

# Create user for web app
sudo mariadb -e "CREATE USER '${DBUSER}'@'${IPRANGE}' IDENTIFIED BY 'password';"
sudo mariadb -e "SET PASSWORD FOR '${DBUSER}'@'${IPRANGE}' = PASSWORD('${DBPASS}');"
sudo mariadb -e "GRANT SELECT, UPDATE, INSERT, DELETE ON team02m_db.* TO '${DBUSER}'@'${IPRANGE}';"
sudo mariadb -e "FLUSH PRIVILEGES;"

# Configure the MariaDB replica ADD master
sudo mariadb -e "CHANGE MASTER TO MASTER_HOST='team02m-db-vm0.service.consul', MASTER_PORT='${DBPORT}', MASTER_USER='replicator', MASTER_PASSWORD='${DBPASSREPLICA}';"
sudo mariadb -e "START SLAVE;"

# Restart MariaDB service
sudo systemctl restart mariadb

echo "MariaDB REPLICA setup complete."

sudo mariadb -e "SHOW SLAVE STATUS\G"





