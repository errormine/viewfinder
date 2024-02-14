#!/bin/bash

# Install MariaDB
sudo apt-get update
sudo apt-get install -y mariadb-server

# Start MariaDB service
sudo systemctl start mariadb

# Create tables from team02m_db.sql
sudo mysql < ./team02m_db.sql

# Restart MariaDB service
sudo systemctl restart mariadb
