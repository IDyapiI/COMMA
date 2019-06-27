
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


## Exercises


### Create (méthode POST)
=> http://localhost:3000/api/exercises/

dans le body:
  * kind
  * question
  * listResponse
  * response
  
### Read One (méthode GET)
=> http://localhost:3000/api/exercises/:id

en param l'id de l'exercice à récupérer

### Update One (méthode PUT)
=> http://localhost:3000/api/exercises/:id

en param l'id de l'exercice à modifier
dans le body:
  * kind
  * question
  * listResponse
  * response
  
###  Delete One (méthode DELETE)
=> http://localhost:3000/api/exercises/:id

en param l'id de l'exercice à supprimer


## Groups


### Create (méthode GET)
=> http://localhost:3000/api/groups/

dans le body:
  * name
  * level

### Read One (méthode POST)
=> http://localhost:3000/api/groups/:id

en param l'id du groupe à récupérer

### Update One (méthode PUT)
=> http://localhost:3000/api/groups/:id

en param l'id du groupe à modifier
dans le body:
  * name
  * level
  
### Delete One (méthode DELETE)
=> http://localhost:3000/api/groups/:id

en param l'id de l'exercice à supprimer


## RESULTS

### Create (méthode GET)
=> http://localhost:3000/api/results/

dans le body:
  * grade
  * groupId
  * userId

### Read One (méthode POST)
=> http://localhost:3000/api/results/:id

en param l'id du résultat à récupérer

### Update One (méthode PUT)
=> http://localhost:3000/api/results/:id

en param l'id du résultat à récupérer
dans le body:
  * grade
  






 


