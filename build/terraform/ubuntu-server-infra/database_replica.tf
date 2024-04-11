data "vault_generic_secret" "db-port" {
  path = "secret/team02m-db-port"
}

data "vault_generic_secret" "db-pass-replica" {
  path = "secret/team02m-db-pass-replica"
}

resource "proxmox_vm_qemu" "db-server-replica" {
  count           = 0
  name            = "${var.replica-id}-vm${count.index}.service.consul"
  desc            = "MariaDB Ubuntu 20.04"
  target_node     = "${data.vault_generic_secret.target_node.data[random_shuffle.nodename.result[0]]}"
  clone           = var.replica-template_to_clone
  os_type         = "cloud-init"
  memory          = var.backend-memory
  cores           = var.backend-cores
  sockets         = var.backend-sockets
  scsihw          = "virtio-scsi-pci"
  bootdisk        = "virtio0"
  boot            = "cdn"
  agent           = 1

  ipconfig0 = "ip=dhcp"
  ipconfig1 = "ip=dhcp"
  ipconfig2 = "ip=dhcp"

  network {
    model  = "virtio"
    bridge = "vmbr0"
#    macaddr = "04:9F:15:00:00:00" 
  }

  network {
    model  = "virtio"
    bridge = "vmbr1"
#    macaddr = "04:9F:15:00:00:00" 
  }

  network {
    model  = "virtio"
    bridge = "vmbr2"
#    macaddr = "04:9F:15:00:00:00" 
  }

  disk {
    type    = "virtio"
    storage = random_shuffle.datadisk.result[0]
    size    = var.backend-disk_size
  }

  depends_on = [proxmox_vm_qemu.db-server]

  provisioner "remote-exec" {
    # This inline provisioner is needed to accomplish the final fit and finish of your deployed
    # instance and condigure the system to register the FQDN with the Consul DNS system
    inline = [
      "sudo hostnamectl set-hostname ${var.backend-id}-vm${count.index}",
      "sudo sed -i 's/changeme/${random_id.id.dec}${count.index}/' /etc/consul.d/system.hcl",
      "sudo sed -i 's/replace-name/${var.backend-id}-vm${count.index}/' /etc/consul.d/system.hcl",
      "sudo sed -i 's/ubuntu-server/${var.backend-id}-vm${count.index}/' /etc/hosts",
      "sudo sed -i 's/FQDN/${var.backend-id}-vm${count.index}.service.consul/' /etc/update-motd.d/999-consul-dns-message",
      "sudo sed -i 's/#datacenter = \"my-dc-1\"/datacenter = \"rice-dc-1\"/' /etc/consul.d/consul.hcl",
      "echo 'retry_join = [\"${var.consulip-240-prod-system28}\",\"${var.consulip-240-student-system41}\",\"${var.consulip-242-room}\"]' | sudo tee -a /etc/consul.d/consul.hcl",
      "sudo systemctl daemon-reload",
      "sudo systemctl restart consul.service",
      "sudo rm /opt/consul/node-id",
      "sudo systemctl restart consul.service",
      "sudo sed -i 's/0.0.0.0/${var.backend-id}-vm${count.index}.service.consul/' /etc/systemd/system/node-exporter.service",
      "sudo systemctl daemon-reload",
      "sudo systemctl enable node-exporter.service",
      "sudo systemctl start node-exporter.service",
      "sudo growpart /dev/vda 3",
      "sudo lvextend -l +100%FREE /dev/ubuntu-vg/ubuntu-lv",
      "sudo resize2fs /dev/ubuntu-vg/ubuntu-lv",      
      "echo 'Your FQDN is: ' ; dig +answer -x ${self.default_ipv4_address} +short",
      "sudo mariadb -e \"CHANGE MASTER TO MASTER_HOST='team02m-db-vm0.service.consul', MASTER_USER='replicator', MASTER_PORT=${data.vault_generic_secret.db-port.data["DBPORT"]}, MASTER_PASSWORD='${data.vault_generic_secret.db-pass-replica.data["DBPASS"]}';\"",
      "sudo mariadb -e \"START REPLICA;\"",
      "sudo mariadb -e \"SHOW REPLICA STATUS;\"",
    ]

    connection {
      type        = "ssh"
      user        = "vagrant"
      private_key = file("${path.module}/${var.keypath}")
      host        = self.ssh_host
      port        = self.ssh_port
    }
  }
}
