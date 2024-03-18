#!/bin/bash

# Clone the repository
GIT_SSH_COMMAND="ssh -i /tmp/ssh_deploy_key"
git clone git@github.com:illinoistech-itm/team02m-2024.git

# Install Node.js
sudo apt update
curl -fsSL https://deb.nodesource.com/setup_21.x | sudo -E bash - &&\
sudo apt-get install -y nodejs

# Install dependencies
sudo npm install -g express pm2

# Open firewalld
sudo firewall-cmd --zone=public --add-port=5000/tcp --permanent
sudo firewall-cmd --reload

# Start the server
cd team02m-2024/code/nodejs
pm2 start index.js