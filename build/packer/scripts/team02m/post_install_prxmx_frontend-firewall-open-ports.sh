#!/bin/bash

sudo firewall-cmd --zone=meta-network --add-port=3000/tcp --permanent

sudo firewall-cmd --reload
