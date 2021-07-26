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

### Animals Router
| TYPE | URL | What it does | Required in Body | Required in Headers |
|-----| -----|------------ | ---------------- | ------------------- |


## To Run Locally 