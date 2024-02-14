#!/bin/bash

# Install MariaDB
sudo apt-get update
curl -LsS https://r.mariadb.com/downloads/mariadb_repo_setup | sudo bash
sudo apt-get install -y mariadb-server
mariadb -V

# Start MariaDB service
sudo systemctl start mariadb

# Create tables from team02m_db.sql
sudo mariadb < ./team02m_db.sql

# Change port number
sudo sed -i 's/^port\s*=.*/port = 3307/' /etc/mysql/mariadb.conf.d/50-server.cnf

# Allow external connections
sudo sed -i 's/^bind-address\s*=.*/bind-address = 0.0.0.0/' /etc/mysql/mariadb.conf.d/50-server.cnf

# Open firewall
sudo systemctl start firewalld
sudo firewall-cmd --zone=public --add-port=3307/tcp --permanent
sudo firewall-cmd --reload

# Restart MariaDB service
sudo systemctl restart mariadb

# Set root password
#mariadb -u root <<EOF
#SET PASSWORD FOR root@localhost = '${ROOT_PASSWORD}';
#FLUSH PRIVILEGES;
#EOF

# Secure MariaDB
#mariadb_secure_installation -u root --password="${ROOT_PASSWORD}" --use-default