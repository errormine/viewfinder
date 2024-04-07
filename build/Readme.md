## TEMPLATES PROVIDED BY THE PROFESSOR

The vanilla build templates and vault server were both provided with most things preconfigured. 

> [!IMPORTANT]
> They are filled out with the changes required for our team and probably don't need to be touched anymore. I have documented them for the sake of completeness.

### Vanilla build template

[proxmox-jammy-ubuntu-with-vault-integration](/build/packer/proxmox-jammy-ubuntu-with-vault-integration/) - A base template with a vanilla ubuntu server. Any templates for our infrastructure should be based on this template.

[proxmox-jammy-ubuntu-infra](/build/terraform/proxmox-jammy-ubuntu-infra/) - The terraform scripts corresponding to the default ubuntu server image. This should already have the basic information required for deploying instances from that image.

### Vault server

[proxmox-jammy-vault-template](/build/packer/proxmox-jammy-vault-template/) - Template for creating the image for the vault server. It is pretty much just an empty ubuntu server with some scripts provided by the professor.

[proxmox-jammy-ubuntu-vault-infra](/build/terraform/proxmox-jammy-ubuntu-vault-infra/) - Used for deploying instances from the vault server template. 

We have a vault server already running and it should be used in each sprint! There shouldn't be any time when you need to deploy this again.

### VAULT SETUP

Most things are mounted at `secret/` meaning most things will be located at `secret/data/*`.

Basic items (ALL MOUNTED AT `secret/data/`):
 - team02m-ssh, SSHPASS
 - team02m-NODENAME, NODENAME3 NODENAME4
 - team02m-username-packer-system, USERNAME
 - team02m-token-packer-system, TOKEN
 - team02m-username-tf-system, USERNAME
 - team02m-token-tf-system, TOKEN
 - team02m-url SYSTEM41 SYSTEM42

Secrets for our database:
 - team02m-db-port, DBPORT
 - team02m-db-user, DBUSER
 - team02m-db-pass, DBPASS
 - team02m-db-pass-replica, DBPASS 

Secrets to be used by our app:
 - team02m-google-client-id, CLIENTID
 - team02m-google-client-secret, CLIENTSECRET

 Secrets for our webserver:
 - minio-endpoint, MINIOENDPOINT
 - minio-access-key, ACCESSKEY
 - minio-secret-key, SECRETKEY
 - s3-bucket-name, BUCKETNAME

Policies:

ssh-secret-policy:

```
path "secret/data/*" { 
  capabilities = ["read","create", "update","delete"] 
} 

path "auth/token/create" { 
   capabilities = ["create", "read", "update", "list"] 
} 

path "auth/approle/role/nodejs/role-id" {
   capabilities = ["read"]
}

path "auth/approle/role/nodejs/secret-id" {
    capabilities = ["update"]
}
```

webapp:
```
path "secret/data/*" {
    capabilities = [ "read" ]
}
```

## TEMPLATES

These are the templates created specifically for our team based on those provided to us. They are consolidated into one folder: [/build/packer/ubuntu-server-infra](/build/packer/ubuntu-server-infra/)

Inside of [ubuntu-server-infra/ubuntu-server.pkr.hcl] we have several different source blocks which define each template. If you want to add another one based on the vanilla ubuntu template it should go in here.

Before building any templates you should use `packer validate .` to check and make sure your settings are correct. If the configuration is valid you can then use `packer build .` to build your template on the proxmox server.

> [!TIP]
> When you want to build only a single template you can run `packer build` with the `-only` flag to build a single template at a time.
> For example: `packer build -only=proxmox-iso.web-server .` would build only the web server template.

This file also includes a vanilla ubuntu server if you really need to use it. It is the `source "proxmox-iso" "ubuntu-vanilla"` block.

### Database template

A template which includes scripts for installing mariadb and populating it with our team's tables.

Located at `source "proxmox-iso" "db-server"` in [ubuntu-server.pkr.hcl](/build/packer/ubuntu-server-infra/ubuntu-server.pkr.hcl)

[post_install_mariadb_setup.sh](/build/packer/scripts/team02m/post_install_mariadb_setup.sh) - The mariadb installation script. Also configures firewall and such.

Vault secrets used during database creation:
 - "/secret/data/team02m-db-port", "DBPORT"
 - "/secret/data/team02m-db-user", "DBUSER"
 - "/secret/data/team02m-db-pass", "DBPASS"

[team02m_db.sql](/build/packer/scripts/) - The SQL script which defines the db schema and is used in the previos script.

### Web server template

Located at `source "proxmox-iso" "web-server"` in [ubuntu-server.pkr.hcl](/build/packer/ubuntu-server-infra/ubuntu-server.pkr.hcl)

Vault approle setup:
 - nodejs role with policy "webapp"
 - only has read permission on /secret/data/*
 - role id and secret id are required to get a token

## TERRAFORM SCRIPTS

These are used for deploying instances based on the templates created by packer. There are two which were provided by the professor and shoudln't be used. They are `proxmox-jammy-ubuntu-infra` and `proxmox-jammy-ubuntu-vault-infra`.

To check the terraform config use `terraform validate`. If the configuration is valid you can use `terraform apply` deploy all instances defined in the current directory. Terraform automatically combines each `.tf` file into one when running the apply commmand.

> [!TIP]
> You can apply only one of the templates by using the `-target` flag with `terraform apply`
> For example: `terraform apply -target=proxmox_vm_qemu.db_server` will only apply the terraform settings for the database resource block.

### Terraform variables

Two important files here:
 - [terraform.tfvars](/build/terraform/ubuntu-server-infra/terraform.tfvars) - Provided for easy configuration of the terraform scripts. Each variable should be documented to tell you what it does.
 - [variables.tf](/build/terraform/ubuntu-server-infra/variables.tf) - This is where the variables are actually defined. Each variable in here is used in the rest of the scripts and some can be edited from `terraform.tfvars`

### Database deploy script

Located at [ubuntu-server-infra/database.tf](/build/terraform/ubuntu-server-infra/database.tf)

### Web server deploy script

Located at [ubuntu-server-infra/web.tf](/build/terraform/ubuntu-server-infra/web.tf)

TODO: Get the secret id delivery working so that we can deploy the web server with terraform.
