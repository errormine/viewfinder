## Vanilla build templates

[proxmox-jammy-ubuntu-with-vault-integration](/build/packer/proxmox-jammy-ubuntu-with-vault-integration/) - A base template with a vanilla ubuntu server. Any templates for our infrastructure should be based on this template.

When creating a new template you should:
 - edit VMNAME in variables.pkr.hcl (on the new template)
 - add any necessary scripts in [/packer/scripts/team02m](/build/packer/scripts/team02m/)

[proxmox-jammy-ubuntu-infra](/build/terraform/proxmox-jammy-ubuntu-infra/) - The terraform scripts corresponding to the default ubuntu server image. This should already have the basic information required for deploying instances from that image.

When creating a new template you should change the template-terraform.tfvars to terraform.tfvars

THEN fill out:
 - keypath
 - pm_timeout (if necessary)
 - yourinitials
 - numberofvms (probably just 1 when testing)
 - desc
 - template-to-clone

## Vault server

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

Secrets to be used by our app:
 - team02m-google-client-id, CLIENTID
 - team02m-google-secret-id, SECRETID

Policies:

ssh-secret-policy:

```
path "secret/data/*" { 
  capabilities = ["read","create", "update","delete"] 
} 

path "auth/token/create" { 
   capabilities = ["create", "read", "update", "list"] 
}
```

webapp:
```
path "secret/data/*" {
    capabilities = [ "read" ]
}
```

## Database template

[ubuntu-server-mariadb](/build/packer/ubuntu-server-mariadb/) - A template which includes scripts for installing mariadb and populating it with our team's tables.

[post_install_mariadb_setup.sh](/build/packer/scripts/team02m/post_install_mariadb_setup.sh) - The mariadb installation script. Also configures firewall and such.

Vault secrets used during database creation:
 - "/secret/data/team02m-db-port", "DBPORT"
 - "/secret/data/team02m-db-user", "DBUSER"
 - "/secret/data/team02m-db-pass", "DBPASS"

[team02m_db.sql](/build/packer/scripts/) - The SQL script which defines the db schema and is used in the previos script.

[ubuntu-server-mariadb-infra](/build/terraform/ubuntu-server-mariadb-infra/) - Terraform scripts for deploying database instances. Uses the template which was created the mariadb packer template.

## ExpressJS nginx template

Vault approle setup:
 - nodejs role with policy "webapp"
 - only has read permission on /secret/data/*
 - role id and secret id are required to get a token

To read role id:

`vault read auth/approle/role/nodejs/role-id`

To generate new secret id:

`vault write -f auth/approle/role/nodejs/secret-id`

## THIS IS UNFINISHED!!!!! I'm not sure how to read the role id and secret id from packer so someone will need to figure this out in a nother sprint.
