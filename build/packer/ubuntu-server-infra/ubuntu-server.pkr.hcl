locals { timestamp = regex_replace(timestamp(), "[- TZ:]", "") }

# Packer Proxmox Plugin Docs
# https://github.com/hashicorp/packer-plugin-proxmox/tree/main/docs
packer {
  required_plugins {
    virtualbox = {
      version = ">= 1.0.8"
      source  = "github.com/hashicorp/proxmox"
    }
  }
}

# source blocks are generated from your builders; a source can be referenced in
# build blocks. A build block runs provisioner and post-processors on a
# source. Read the documentation for source blocks here:
# https://www.packer.io/docs/from-1.5/blocks/source
# https://github.com/burkeazbill/ubuntu-22-04-packer-fusion-workstation/blob/master/ubuntu-2204-daily.pkr.hcl
source "proxmox-iso" "ubuntu-vanilla" {
  boot_command = [
    "e<wait>",
    "<down><down><down>",
    "<end><bs><bs><bs><bs><wait>",
    "autoinstall ds=nocloud-net\\;s=http://{{ .HTTPIP }}:{{ .HTTPPort }}/ ---<wait>",
    "<f10><wait>"
  ]
  boot_wait = "5s"
  cores     = "${var.NUMBEROFCORES}"
  node      = "${local.NODENAME}"
  username  = "${local.USERNAME}"
  token     = "${local.PROXMOX_TOKEN}"
  cpu_type  = "host"
  disks {
    disk_size    = "${var.DISKSIZE}"
    storage_pool = "${var.STORAGEPOOL}"
    # storage_pool_type is deprecated and should be omitted, it will be removed in a later version of the proxmox plugin
    # storage_pool_type = "lvm"
    type = "virtio"
    io_thread = true
  }
  http_directory   = "subiquity/http"
  http_port_max    = 9200
  http_port_min    = 9001
  iso_checksum     = "${var.iso_checksum}"
  iso_urls         = "${var.iso_urls}"
  iso_storage_pool = "local"
  memory           = "${var.MEMORY}"

  network_adapters {
    bridge = "vmbr0"
    model  = "virtio"
  }
  network_adapters {
    bridge = "vmbr1"
    model  = "virtio"
  }
  network_adapters {
    bridge = "vmbr2"
    model  = "virtio"
  }

  os                       = "l26"
  proxmox_url              = "${local.URL}"
  insecure_skip_tls_verify = true
  unmount_iso              = true
  qemu_agent               = true
  scsi_controller          = "virtio-scsi-single"       
  cloud_init               = true
  cloud_init_storage_pool  = "${var.STORAGEPOOL}"
  ssh_password             = "${local.SSHPW}"
  ssh_username             = "vagrant"
  ssh_timeout              = "28m"
  template_description     = "A Packer template for creating an empty ubuntu server"
  vm_name                  = "${var.VANILLA_VMNAME}"
}

source "proxmox-iso" "lb-server" {
  boot_command = [
    "e<wait>",
    "<down><down><down>",
    "<end><bs><bs><bs><bs><wait>",
    "autoinstall ds=nocloud-net\\;s=http://{{ .HTTPIP }}:{{ .HTTPPort }}/ ---<wait>",
    "<f10><wait>"
  ]
  boot_wait = "5s"
  cores     = "${var.NUMBEROFCORES}"
  node      = "${local.NODENAME}"
  username  = "${local.USERNAME}"
  token     = "${local.PROXMOX_TOKEN}"
  cpu_type  = "host"
  disks {
    disk_size    = "${var.DISKSIZE}"
    storage_pool = "${var.STORAGEPOOL}"
    # storage_pool_type is deprecated and should be omitted, it will be removed in a later version of the proxmox plugin
    # storage_pool_type = "lvm"
    type = "virtio"
    io_thread = true
  }
  http_directory   = "subiquity/http"
  http_port_max    = 9200
  http_port_min    = 9001
  iso_checksum     = "${var.iso_checksum}"
  iso_urls         = "${var.iso_urls}"
  iso_storage_pool = "local"
  memory           = "${var.MEMORY}"

  network_adapters {
    bridge = "vmbr0"
    model  = "virtio"
  }
  network_adapters {
    bridge = "vmbr1"
    model  = "virtio"
  }
  network_adapters {
    bridge = "vmbr2"
    model  = "virtio"
  }

  os                       = "l26"
  proxmox_url              = "${local.URL}"
  insecure_skip_tls_verify = true
  unmount_iso              = true
  qemu_agent               = true
  scsi_controller          = "virtio-scsi-single"       
  cloud_init               = true
  cloud_init_storage_pool  = "${var.STORAGEPOOL}"
  ssh_password             = "${local.SSHPW}"
  ssh_username             = "vagrant"
  ssh_timeout              = "28m"
  template_description     = "A Packer template for creating an ubuntu server with Nginx installed"
  vm_name                  = "${var.LB_VMNAME}"
}

source "proxmox-iso" "db-server" {
  boot_command = [
    "e<wait>",
    "<down><down><down>",
    "<end><bs><bs><bs><bs><wait>",
    "autoinstall ds=nocloud-net\\;s=http://{{ .HTTPIP }}:{{ .HTTPPort }}/ ---<wait>",
    "<f10><wait>"
  ]
  boot_wait = "5s"
  cores     = "${var.NUMBEROFCORES}"
  node      = "${local.NODENAME}"
  username  = "${local.USERNAME}"
  token     = "${local.PROXMOX_TOKEN}"
  cpu_type  = "host"
  disks {
    disk_size    = "${var.DISKSIZE}"
    storage_pool = "${var.STORAGEPOOL}"
    # storage_pool_type is deprecated and should be omitted, it will be removed in a later version of the proxmox plugin
    # storage_pool_type = "lvm"
    type = "virtio"
    io_thread = true
  }
  http_directory   = "subiquity/http"
  http_port_max    = 9200
  http_port_min    = 9001
  iso_checksum     = "${var.iso_checksum}"
  iso_urls         = "${var.iso_urls}"
  iso_storage_pool = "local"
  memory           = "${var.MEMORY}"

  network_adapters {
    bridge = "vmbr0"
    model  = "virtio"
  }
  network_adapters {
    bridge = "vmbr1"
    model  = "virtio"
  }
  network_adapters {
    bridge = "vmbr2"
    model  = "virtio"
  }

  os                       = "l26"
  proxmox_url              = "${local.URL}"
  insecure_skip_tls_verify = true
  unmount_iso              = true
  qemu_agent               = true
  scsi_controller          = "virtio-scsi-single"       
  cloud_init               = true
  cloud_init_storage_pool  = "${var.STORAGEPOOL}"
  ssh_password             = "${local.SSHPW}"
  ssh_username             = "vagrant"
  ssh_timeout              = "28m"
  template_description     = "A Packer template for creating an ubuntu server with MariaDB installed"
  vm_name                  = "${var.DB_VMNAME}"
}

source "proxmox-iso" "web-server" {
  boot_command = [
    "e<wait>",
    "<down><down><down>",
    "<end><bs><bs><bs><bs><wait>",
    "autoinstall ds=nocloud-net\\;s=http://{{ .HTTPIP }}:{{ .HTTPPort }}/ ---<wait>",
    "<f10><wait>"
  ]
  boot_wait = "5s"
  cores     = "${var.NUMBEROFCORES}"
  node      = "${local.NODENAME}"
  username  = "${local.USERNAME}"
  token     = "${local.PROXMOX_TOKEN}"
  cpu_type  = "host"
  disks {
    disk_size    = "${var.DISKSIZE}"
    storage_pool = "${var.STORAGEPOOL}"
    # storage_pool_type is deprecated and should be omitted, it will be removed in a later version of the proxmox plugin
    # storage_pool_type = "lvm"
    type = "virtio"
    io_thread = true
  }
  http_directory   = "subiquity/http"
  http_port_max    = 9200
  http_port_min    = 9001
  iso_checksum     = "${var.iso_checksum}"
  iso_urls         = "${var.iso_urls}"
  iso_storage_pool = "local"
  memory           = "${var.MEMORY}"

  network_adapters {
    bridge = "vmbr0"
    model  = "virtio"
  }
  network_adapters {
    bridge = "vmbr1"
    model  = "virtio"
  }
  network_adapters {
    bridge = "vmbr2"
    model  = "virtio"
  }

  os                       = "l26"
  proxmox_url              = "${local.URL}"
  insecure_skip_tls_verify = true
  unmount_iso              = true
  qemu_agent               = true
  scsi_controller          = "virtio-scsi-single"       
  cloud_init               = true
  cloud_init_storage_pool  = "${var.STORAGEPOOL}"
  ssh_password             = "${local.SSHPW}"
  ssh_username             = "vagrant"
  ssh_timeout              = "28m"
  template_description     = "A Packer template for creating an ubuntu server with SvelteKit installed"
  vm_name                  = "${var.WEB_VMNAME}"
}

build {
  sources = ["source.proxmox-iso.ubuntu-vanilla", "source.proxmox-iso.db-server", "source.proxmox-iso.web-server", "source.proxmox-iso.lb-server"]

  ########################################################################################################################
  # Using the file provisioner to SCP this file to the instance 
  # Add .hcl configuration file to register an instance with Consul for dynamic DNS on the third interface
  ########################################################################################################################

  provisioner "file" {
    source      = "./system.hcl"
    destination = "/home/vagrant/"
  }

  ########################################################################################################################
  # Copy the node-exporter-consul-service.json file to the instance move this file to /etc/consul.d/ 
  # directory so that each node can register as a service dynamically -- which Prometheus can then 
  # scape and automatically find metrics to collect
  ########################################################################################################################

  provisioner "file" {
    source      = "../scripts/team02m/node-exporter-consul-service.json"
    destination = "/home/vagrant/"
  }

  ########################################################################################################################
  # Copy the consul.conf file to the instance to update the consul DNS to look on the internal port of 8600 to resolve
  # .consul domain lookups
  ########################################################################################################################

  provisioner "file" {
    source      = "../scripts/team02m/consul.conf"
    destination = "/home/vagrant/"
  }

  ########################################################################################################################
  # Copy the node_exporter service file to the template so that the instance can publish its own system metrics on the
  # metrics interface
  ########################################################################################################################

  provisioner "file" {
    source      = "../scripts/team02m/node-exporter.service"
    destination = "/home/vagrant/"
  }

  ########################################################################################################################
  # This is the script that will open the default firewall ports and create the default firewalld zones.
  ########################################################################################################################

  provisioner "shell" {
    execute_command = "echo 'vagrant' | {{ .Vars }} sudo -E -S sh '{{ .Path }}'"
    scripts         = ["../scripts/team02m/post_install_prxmx-firewall-configuration.sh"]
  }

  ########################################################################################################################
  # These shell scripts are needed to create the cloud instance and register the instance with Consul DNS
  # Don't edit this
  ########################################################################################################################

  provisioner "shell" {
    execute_command = "echo 'vagrant' | {{ .Vars }} sudo -E -S sh '{{ .Path }}'"
    scripts = ["../scripts/team02m/post_install_prxmx_ubuntu_2204.sh",
      "../scripts/team02m/post_install_prxmx_start-cloud-init.sh",
      "../scripts/team02m/post_install_prxmx_install_hashicorp_consul.sh",
    "../scripts/team02m/post_install_prxmx_update_dns_for_consul_service.sh"]
  }

  ########################################################################################################################
  # Script to change the bind_addr in Consul to the dynmaic Go lang call to
  # Interface ens20
  # https://www.consul.io/docs/troubleshoot/common-errors
  ########################################################################################################################

  provisioner "shell" {
    execute_command = "echo 'vagrant' | {{ .Vars }} sudo -E -S sh '{{ .Path }}'"
    scripts         = ["../scripts/team02m/post_install_change_consul_bind_interface.sh"]
  }

  ############################################################################################
  # Script to give a dynamic message about the consul DNS upon login
  #
  # https://ownyourbits.com/2017/04/05/customize-your-motd-login-message-in-debian-and-ubuntu/
  #############################################################################################

  provisioner "shell" {
    execute_command = "echo 'vagrant' | {{ .Vars }} sudo -E -S sh '{{ .Path }}'"
    scripts         = ["../scripts/team02m/post_install_update_dynamic_motd_message.sh"]
  }

  ############################################################################################
  # Script to install telegraf dependencies for collecting hardware metrics
  #
  #############################################################################################

  provisioner "shell" {
    execute_command = "echo 'vagrant' | {{ .Vars }} sudo -E -S sh '{{ .Path }}'"
    scripts         = ["../scripts/team02m/post_install_prxmx_ubuntu_install-prometheus-node-exporter.sh"]
  }

  ########################################################################################################################
  # Script to install MariaDB
  ########################################################################################################################

  provisioner "file" {
    only        = ["proxmox-iso.db-server"]
    source      = "../scripts/team02m/team02m_db.sql"
    destination = "/tmp/team02m_db.sql"
  }

  provisioner "shell" {
    only             = ["proxmox-iso.db-server"]
    execute_command  = "echo 'vagrant' | {{ .Vars }} sudo -E -S sh '{{ .Path }}'"
    environment_vars = ["DBUSER=${local.DBUSER}", "DBPASS=${local.DBPASS}", "DBPORT=${local.DBPORT}"]
    scripts          = ["../scripts/team02m/post_install_mariadb_setup.sh"]
  }

  ########################################################################################################################
  # Script to install SvelteKit
  ########################################################################################################################

  provisioner "shell" {
    only             = ["proxmox-iso.web-server"]
    execute_command  = "echo 'vagrant' | {{ .Vars }} sudo -E -S sh '{{ .Path }}'"
    environment_vars = ["DBUSER=${local.DBUSER}", "DBPASS=${local.DBPASS}", "DBPORT=${local.DBPORT}", 
    "MINIOENDPOINT=${local.MINIOENDPOINT}", "ACCESSKEY=${local.ACCESSKEY}", "SECRETKEY=${local.SECRETKEY}",
    "BUCKETNAME=${local.BUCKETNAME}"]
    scripts          = ["../scripts/team02m/post_install_sveltekit_setup.sh"]
  }

########################################################################################################################
  # Scripts to add deploy key
#########################################################################################################################


  provisioner "file" {
    source      = "../scripts/team02m/.ssh/config"
    destination = "/home/vagrant/.ssh/config"
  }

  # This should be a key which is added as a deploy key in the github repository
  provisioner "file" {
    source      = "./ssh_deploy_key"
    destination = "/home/vagrant/.ssh/ssh_deploy_key"
  }

 ########################################################################################################################
  # Scripts to install open firewall ports, install Nginx
#########################################################################################################################
 provisioner "shell" {
    execute_command = "echo 'vagrant' | {{ .Vars }} sudo -E -S sh '{{ .Path }}'"
    scripts = ["../scripts/team02m/post_install_prxmx_frontend-firewall-open-ports.sh"]
    environment_vars = ["DBUSER=${local.DBUSER}", "DBPASS=${local.DBPASS}"]
    only             = ["proxmox-iso.web-server"]
  }

  provisioner "shell" {
    execute_command = "echo 'vagrant' | {{ .Vars }} sudo -E -S sh '{{ .Path }}'"
    scripts = ["../scripts/team02m/post_install_prxmx_backend-firewall-open-ports.sh"]
    environment_vars = ["DBUSER=${local.DBUSER}", "IPRANGE=${var.CONNECTIONFROMIPRANGE}", "DBPASS=${local.DBPASS}"]
    only             = ["proxmox-iso.db-server"]
  }
  provisioner "shell" {
    execute_command = "echo 'vagrant' | {{ .Vars }} sudo -E -S sh '{{ .Path }}'"
    scripts = ["../scripts/team02m/post_install_prxmx_load-balancer-firewall-open-ports.sh",
      "../scripts/team02m/post_install_prxmx_load_balancer.sh",
    "../scripts/team02m/move-nginx-files.sh"]
    only = ["proxmox-iso.lb-server"]
  }
}
