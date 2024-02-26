#https://registry.terraform.io/providers/Telmate/proxmox/latest/docs
variable "vanilla_id" {
  default = "team02m-ubuntu-server"
}
variable "db_id" {}
variable "web_id" {}

variable "error_level" {
  default = "debug"
}

variable "pm_log_enable" {}

variable "pm_parallel" {}

variable "pm_timeout" {}

variable "pm_log_file" {}

# Also commented out in terraform.tfvars, not sure how this should be handled with multiple resources
#variable "numberofvms" {}
#variable "desc" {}
variable "web_server_count" {
  default = 1
}

variable "default_template" {}
variable "db_template" {}
variable "web_template" {}

variable "memory" {}

variable "cores" {}

variable "sockets" {}

variable "disk_size" {}

variable "keypath" {}

variable "additional_wait" {
  default = 30
}

variable "clone_wait" {
  default = 30
}
###############################################################################
# This is the consul dns master -- no need to edit this
###############################################################################
variable "consulip-240-prod-system28" {
  default = "10.110.0.59"
}

variable "consulip-240-student-system41" {
  default = "10.110.0.58"
}

variable "consulip-242-room" {
  default = "10.110.0.38"
}
