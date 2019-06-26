
# API EndPoint

## Users 

### Create (methode POST)
=> http://localhost:3000/api/users/

dans le body:

  * firstname
  * lastname 
  * email 
  * password
  * status
  * groupeId: id du groupe ?

### Read One (methode GET)
=> http://localhost:3000/api/users/:id

en param l'id de l'user a récuperer 

### Update (methode PUT)
=> http://localhost:3000/api/users/:id

en param l'id de l'user a modifier 
dans le body:
  * firstname
  * lastname 
  * email 
  * password
  * status
  * groupeId: id du groupe ?
  
### Login (methode POST)
=> http://localhost:3000/api/login

dans le body email, password 


### List all user (methode GET )
=> http://localhost:3000/api/users/


## Series


### Create (methode POST)
=> http://localhost:3000/api/series/

dans le body:

  * topic
  * name 
  * level 
  * description
  * groupeId [] (tableau d'id facultatif)
  * creatorId (id de l'user qui a créer )
  * exercices [] tableau avec les id des exos facultatif 

### Read One (methode GET)
=> http://localhost:3000/api/series/:id

en param l'id de l'user a récuperer 

### Update (methode PUT)
=> http://localhost:3000/api/series/:id

en param l'id de l'user a modifier 
dans le body:
  * topic 
  * name  
  * level 
  * description
  * creator
  * exerciesid []
  * groupeId: id du groupe ?
  
### Delete serie (methode DELETE)
=> http://localhost:3000/api/series/:id


### List all serie (methode GET )
=> http://localhost:3000/api/series/


### Read One by groupId 
=> http://localhost:3000/api/series/groupId/:groupId

