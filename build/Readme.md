## Vanilla build templates

[proxmox-jammy-ubuntu-with-vault-integration](/build/packer/proxmox-jammy-ubuntu-with-vault-integration/) - A base template with a vanilla ubuntu server. Any templates for our infrastructure should be based on this template.

When creating a new template you should:
 - edit VMNAME in variables.pkr.hcl (on the new template)
 - add any necessary scripts in [scripts/team02m](/build/packer/scripts/team02m/)

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

[variables.pkr.hcl](/build/packer/proxmox-jammy-vault-template/variables.pkr.hcl) should already be filled out with the information for our team.

[proxmox-jammy-ubuntu-vault-infra](/build/terraform/proxmox-jammy-ubuntu-vault-infra/) - Used for deploying instances from that template. It currently doesn't contain any scripts for actually setting up vault on it. (I will update this when I add them).

We have a vault server already running and it should be used in each sprint! There shouldn't be any time when you need to deploy this again.

## Database template

[ubuntu-server-mariadb](/build/packer/ubuntu-server-mariadb/) - A template which includes scripts for installing mariadb and populating it with our team's tables.

[post_install_mariadb_setup.sh](/build/packer/scripts/team02m/post_install_mariadb_setup.sh) - The install script which gets mariadb, creates the tables, sets the port, opens firewall, and then runs the secure installation script.

[team02m_db.sql](/build/packer/scripts/) - The SQL script which defines the db schema and is used in the previos script. I am going to figure out how to populate it with test data.

[ubuntu-server-mariadb-infra](/build/terraform/ubuntu-server-mariadb-infra/) - Terraform scripts for deploying database instances. Uses the team02m-mariadb-template in proxmox which was created by the packer template.

Vault secrets for database:
 - "/secret/data/team02m-db-port", "DBPORT"
 - "/secret/data/team02m-db-user", "DBUSER"
 - "/secret/data/team02m-db-pass", "DBPASS"

## ExpressJS nginx template

TO BE MADE.