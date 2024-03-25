# Sprint 02 Report

## Our Team
* Project manager - David Singer
* UI/UX - Daniel Lim
* Developers - Andrei Neacsu
* IT Operations - Dylan Baltrus

## Intro
Team 03: Project Name: TBD

We plan to create a "social media" website designed for photographers to showcase their work and discover photos from other people. It will primarly be focused on "professional" users who want to have a place to store high quality images and showcase their work. 

## Sprint-03 Presentation Summary

* Goals
    * Deploy live webservers to Rice campus servers with basic app functionality.
* Project Management Tool 
    * Which project management tool we used, and how we used it.
    * 25 Point Distribution
        * Lists of tasks that we want to complete
        * Point distributed to the task
        * Who the tasks was assigned to
    * Task Completion
        * Which tasks were actually completed.
* Demo
    * All members utilizing the live webpage
* UI/UX 
    * Cover the progress made for the User Interface
* Conclusion
    * Overview and discussion of changes from Sprint-02 to Sprint-03

### 3-Tier Overview
First tier:
 - Configure Load balancer
 - Enable HTTPS TLS Cert (self-assigned)
 - Use Nginx with proper routes
 - Deploy VM templates on SYSTEM41 & SYSTEM42

Second Tier:
 - 3 active webservers
 - Disable direct Public IP acess to 2nd and 3rd server. 
 - Connect to database, use Consul DNS resolver on the meta-network

Third tier:
 - Configure database to connect to meta-network (10.110.0.0/16)
 - Simulate fake user data for presentation

 ## Project Management Tool
* The project mangement tool that we used was *GitHub Projects*. 
* 25 Build Point Item: Discussed with group and distributed based on time required to complete & Difficulty
* [Our GitHub Projects Board](https://github.com/orgs/illinoistech-itm/projects/4/views/1)

### Points Distribution
Project Management:
* 2: Task Management and Documentation
* 2: Communication Facilitation
* 1: Create Sprint-03 Report
- David

Development:
* 2: UI/UX Flow
- Daniel
* 3: Front-end page development
- Andrei
* 4: Vault Server Builds via Terraform
- Dylan
* 4: Database/backend Integration
- Andrei
* 5: Deploy Servers
- Dylan & Andrei

Testing:
* 2: Simulate Data + Test UI flow/display
- Daniel

### Goal Completion Status
Completed:
 - Live server deployed and basic features shown in demo tested.

Uncompleted:
 - Display of pre-simulated data and post comments

### Additionals
Min.io S3 Storage Integration (bleeds into Sprint04)
 - on prem S3-like Object Storage, using [min.io](https://min.io webpage for on-prem S3 storage min.io").

## Demo
Done through live servere deployment. 
Demonstration of the website flow per each team member to demonstrate a successful login of a user via Google Auth,
- Make account
- Post photo
- Add comment or add photo to Favorites. (show in Favorites)
- Logout (not featured)

## UI/UX 

[the Figma board](https://www.figma.com/file/LAYheUrCbrUKIADzD1x7qV/Photo-sharing-platform?type=design&node-id=0%3A1&mode=design&t=9Xs39i6trfKAgfzU-1)

* [Current Site](https://system62.rice.iit.edu)

## Conclusion

* Project management tool: *GitHub Projects*
* Login, Feed, Profile, Albums, and Single View pages
* Database: MariaDB + Min.io
* UI/UX: Svelte/Sveltekit


Overview of all the changes from Sprint-02 to Sprint-03

### Open Comments
* Dev Take-aways
* Knowledge Sharing
* War Stories
