# MOF (My Only Friend)

- **Name:** Daniel Ji
- **App Name:** MOF
- **Description:** This app allows you to login and chat with an AI bot
- **Github URL:** 
- **Deployed Website:** 


## Route Map
| Route Name | Endpoint | Method | Description |
| -----------| ---------| -------| ------------|
| Index | /welcome | GET | Renders a welcome page |
| Login | /user/login | GET | Shows a login form for the user access their friend |
| Signup | /user/signup | POST | Creates a user |
| Logout | /user/logout | GET | Logs the user out |
| History | /mof/logs | GET | Shows the all the inputs the user has made |


## Design Mockup (Desktop & Mobile)

#### Mobile Design
![Mobile Design Mokcup](https://i.imgur.com/E2L9TWH.png)

#### Desktop Design
![Desktop Design Mokcup](https://i.imgur.com/FR4hThu.png)


## ERD (Entity Relationship Diagram)
![Entity Relationship Diagram](https://i.imgur.com/SpXm7H6.png)


## Technologies Used
- Bcryptjs
- Body-parser
- Cors
- Dotenv
- Express
- Express-session
- jsonwebtoken
- method-override
- Mongoose
- Morgan