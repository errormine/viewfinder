#!/bin/bash

# Clone the repository
GIT_SSH_COMMAND="ssh -i /tmp/ssh_deploy_key"
git clone git@github.com:illinoistech-itm/team02m-2024.git

# Install vault
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install vault

# Unwrap secret_id
export VAULT_ADDR='https://team-02m-vault-server-vm0.service.consul:8200'
export VAULT_SKIP_VERIFY='true'
vault unwrap

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