#!/bin/bash

# Install MariaDB
sudo apt-get update
curl -LsS https://r.mariadb.com/downloads/mariadb_repo_setup | sudo bash
sudo apt-get install -y mariadb-server
mariadb -V

# Start MariaDB service
sudo systemctl start mariadb

# Create tables
sudo mariadb < /tmp/team02m_db.sql

# Change port number
sudo sed -i 's/^port\s*=.*/port = 3307/' /etc/mysql/mariadb.conf.d/50-server.cnf

# Allow external connections
sudo sed -i 's/^bind-address\s*=.*/bind-address = 0.0.0.0/' /etc/mysql/mariadb.conf.d/50-server.cnf

# Open firewall
sudo systemctl start firewalld
sudo firewall-cmd --zone=meta-network --add-port=3307/tcp --permanent
sudo firewall-cmd --reload

# Create user for web app
sudo mariadb -e "CREATE USER '${DBUSER}'@'localhost' IDENTIFIED BY 'password';"
sudo mariadb -e "SET PASSWORD FOR '${DBUSER}'@'localhost' = PASSWORD('${DBPASS}');"
sudo mariadb -e "GRANT SELECT, UPDATE, INSERT, DELETE ON team02_db.* TO '${DBUSER}'@'localhost';"
# THis probably needs some work to be secure

# Restart MariaDB service
sudo systemctl restart mariadb