#!/bin/bash

echo "export DB_PORT='${DBPORT}'" >> /home/vagrant/.bashrc
echo "export DB_PASS='${DBPASS}'" >> /home/vagrant/.bashrc
echo "export DB_USER='${DBUSER}'" >> /home/vagrant/.bashrc

echo "export NO_DB=FALSE" >> /home/vagrant/.bashrc

echo "export MINIO_ENDPOINT='${MINIOENDPOINT}'" >> /home/vagrant/.bashrc
echo "export MINIO_ACCESS_KEY='${ACCESSKEY}'" >> /home/vagrant/.bashrc
echo "export MINIO_SECRET_KEY='${SECRETKEY}'" >> /home/vagrant/.bashrc
echo "export S3_BUCKET_NAME='${BUCKETNAME}'" >> /home/vagrant/.bashrc

# Clone the repository
git clone git@github.com:illinoistech-itm/team02m-2024.git

# Install Node.js
sudo apt update
curl -fsSL https://deb.nodesource.com/setup_21.x | sudo -E bash - &&\
sudo apt-get install -y nodejs

# Install dependencies
sudo npm install -g express pm2
cd /home/vagrant/team02m-2024/code/svelte/

#Building the app
sudo -u vagrant npm install
sudo -u vagrant npm run build
sudo -u vagrant pm2 start build --name "webapp"

# This creates your javascript application service file
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u vagrant --hp /home/vagrant

# This saves which files we have already started -- so pm2 will 
# restart them at boot
sudo -u vagrant pm2 save