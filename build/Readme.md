## Vault server

[proxmox-jammy-vault-template](/build/packer/proxmox-jammy-vault-template/) - Template for creating the image for the vault server. It is pretty much just an empty ubuntu server with some scripts provided by the professor.

[variables.pkr.hcl](/build/packer/proxmox-jammy-vault-template/variables.pkr.hcl) should already filled out with the information for our team.

[proxmox-jammy-ubuntu-vault-infra](/build/terraform/proxmox-jammy-ubuntu-vault-infra/) - Used for deploying instances from that template. It currently doesn't contain any scripts for actually setting up vault on it. (I will update this when I add them).

An instance of our vault server should already be up and running at https://team-02m-vault-server-vm0.service.consul:8200 (it is only accessible from within the IIT network).

## Infrastructure build templates

[proxmox-jammy-ubuntu-with-vault-integration](/build/packer/proxmox-jammy-ubuntu-with-vault-integration/) - A base template with a vanilla ubuntu server. Any templates for our ifrastructure should be based on this template.

When creating a new template you should:
 - edit VMNAME in variables.pkr.hcl (on the new template)
 - add any necessary scripts in [scripts/proxmox](/build/packer/scripts/proxmox/)

[proxmox-jammy-ubuntu-infra](/build/terraform/proxmox-jammy-ubuntu-infra/) - The terraform scripts corresponding to the default ubuntu server image. This should already have the basic information required for deploying instances from that image.

When creating a new template you should change the template-terraform.tfvars to terraform.tfvars

THEN fill out:
 - keypath
 - pm_timeout (if necessary)
 - yourinitials
 - numberofvms (probably just 1 when testing)
 - desc
 - template-to-clone

 ## Database template

CREATE THIS TEMPLATE AND EXPLAIN THE CHANGES TO SHOW AN EXAMPLE