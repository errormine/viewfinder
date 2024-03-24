//  variables.pkr.hcl

// For those variables that you don't provide a default for, you must
// set them from the command line, a var-file, or the environment.

# This is the name of the node in the Cloud Cluster where to deploy the virtual instances
locals {
  NODENAME = vault("/secret/data/team02m-NODENAME","NODENAME4")
}

locals {
  USERNAME = vault("/secret/data/team02m-username-packer-system","USERNAME")
}

locals {
  PROXMOX_TOKEN = vault("/secret/data/team02m-token-packer-system","TOKEN")
}

locals {
  URL = vault("/secret/data/team02m-url","SYSTEM42")
}

locals {
  SSHPW = vault("/secret/data/team02m-ssh","SSHPASS")
}

# For the database
locals {
  DBPORT = vault("/secret/data/team02m-db-port","DBPORT")
}

locals {
  DBUSER = vault("/secret/data/team02m-db-user","DBUSER")
}

locals {
  DBPASS = vault("/secret/data/team02m-db-pass","DBPASS")
}

# This variable is the IP address range to allow your connections
# The SQL wildcard is the %
# 10.110.%.%
variable "CONNECTIONFROMIPRANGE" {
  type      = string
  sensitive = true
  default   = "10.110.%.%"
}
# For the NodeJS app
variable "MEMORY" {
  type    = string
  default = "4192"
}

variable "DISKSIZE" {
  type    = string
  default = "25G"
}

variable "STORAGEPOOL" {
  type    = string
  default = "datadisk1"
}

variable "NUMBEROFCORES" {
  type    = string
  default = "1"
}

# This is the name of the Virtual Machine Template you want to create
variable "VANILLA_VMNAME" {
  type    = string
  default = "team02m-vanilla-template"
}

variable "LB_VMNAME" {
  type    = string
  default = "team02m-lb-template"
}

variable "DB_VMNAME" {
  type    = string
  default = "team02m-db-template"
}

variable "WEB_VMNAME" {
  type    = string
  default = "team02m-web-template"
}

variable "iso_checksum" {
  type = string
  default =  "file:http://mirrors.edge.kernel.org/ubuntu-releases/22.04.4/SHA256SUMS"
}

# https://developer.hashicorp.com/terraform/language/values/variables#declaring-an-input-variable
variable "iso_urls" {
  type    = list(string)
  default = ["https://mirrors.edge.kernel.org/ubuntu-releases/22.04.4/ubuntu-22.04.4-live-server-amd64.iso","http://www.releases.ubuntu.com/jammy/ubuntu-22.04.4-live-server-amd64.iso"]
}
  