
# API EndPoint

## Users 

### Create (methode POST)
=> http://localhost/api/users/

dans le body:

  * firstname
  * lastname 
  * email 
  * password
  * status
  * groupeId: id du groupe ?

### Read One (methode GET)
=> http://localhost/api/users/:id

en param l'id de l'user a récuperer 

### Update (methode PUT)
=> http://localhost/api/users/:id

en param l'id de l'user a modifier 
dans le body:
  * firstname
  * lastname 
  * email 
  * password
  * status
  * groupeId: id du groupe ?
  
### Login (methode POST)
=> http://localhost/api/login

dans le body email, password 


### List all user (methode GET )
=> http://localhost/api/users/


## Series


### Create (methode POST)
=> http://localhost/api/series/

dans le body:

  * topic
  * name 
  * level 
  * description
  * groupeId [] (tableau d'id )
  * creatorId (id de l'user qui a créer )
  * exercices [] tableau avec les id des exos 

### Read One (methode GET)
=> http://localhost/api/series/:id

en param l'id de l'user a récuperer 

### Update (methode PUT)
=> http://localhost/api/series/:id

en param l'id de l'user a modifier 
dans le body:
  * topic 
  * name  
  * level 
  * description
  * creator
  * exerciesid []
  * groupeId: id du groupe ?
  

### List all serie (methode GET )
=> http://localhost/api/series/



