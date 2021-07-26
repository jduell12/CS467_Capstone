# CS467_Capstone Backend
Dating App for Animal Adoption

This is the Backend Database/API for the project located at [Github](https://github.com/jennresado/CS467_Capstone)

## Database 
The database is composed of 11 tables:
* Users
* User_Animals
* Animals
* Dispositions 
* Animal_dispositions
* Availability
* Animal_availability
* Breeds
* Animal_breeds
* Types
* Animal_types

The database is set up as a PostgreSQL and hosted on Heroku at (https://bring-me-home-backend.herokuapp.com/)

## Endpoints 
For more detailed documentation: ()

| TYPE | URL | What it does | Required in Body | Required in Headers |
|-----| -----|------------ | ---------------- | ------------------- |
| GET | `base_url/` | Checks if the server is working | N/a | N/a 

### Auth Router
| TYPE | URL | What it does | Required in Body | Required in Headers |
|-----| -----|------------ | ---------------- | ------------------- |
| POST | `base_url/auth/register` | Registers a new user in the database | username, password, first_name, last_name, email, admin | N/a | 
| POST | `base_url/auth/login` | Logs in an already registered user | username, password | N/a 

### Users Router
| TYPE | URL | What it does | Required in Body | Required in Headers |
|-----| -----|------------ | ---------------- | ------------------- |
| GET | `base_url/users/` | Gets the information of the user | N/a | Jwt token that was provided on registration or log in | 
| PUT | `base_url/users/` | Edits the user | Any changes wanting to be made to the user | Jwt token that was provided on registration or log in| 
| DEL |  `base_url/users/` | Deletes the user | N/a | Jwt token that was provided on registration or log in|

### Animals Router
All changes made to an animal object (put, post, or del) must be done by an admin user otherwise a message saying the user is unauthorized will be sent. 

| TYPE | URL | What it does | Required in Body | Required in Headers |
|-----| -----|------------ | ---------------- | ------------------- |
| GET | `base_url/animals/` | Gets a list of animals in the database | N/a | Jwt token that was provided on registration or log in|
| GET | `base_url/animals/:filter_name/:filtervalue` | Gets a list of animals based on a particular attribute value | N/a | Jwt token that was provided on registration or log in|
| GET | `base_url/animals/:key` | Gets a list of attributes based on the key passed in the url| N/a | Jwt token that was provided on registration or log in|
| PUT | `base_url/animals/:animal_id` | Edits an animal as long as the user has admin status |  Any changes wanting to be made to the animal | Jwt token that was provided on registration or log in|
| POST | `base_url/animals/` | Adds an animal to the database | pic, description, array of dispositions, type, array of breeds, availability, date_created and news_item | Jwt token that was provided on registration or log in|
| DEL | `base_url/animals/:animal_id` | Deletes an animal in the database | N/a | Jwt token that was provided on registration or log in|
| DEL | `base_url/animals/:animal_id/:key/:key_id` | Deletes an attribute from an array (breeds, dispositions) | N/a | Jwt token that was provided on registration or log in|

## To Run Locally 