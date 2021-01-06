# Flight Reservation System

Web application built using React + Bootstrap + Spring Boot + PostgreSQL. 

A flight reservation system for the fictional airline, 'Foobar Airways', that allows customers to reserve seats for the airline's flights, as well as allowing the airline to manage new/existing flights on offer.

## Deployed Version
Deployed with Heroku at: https://flight-reservation-system.herokuapp.com/

## Development
##### Requirements:
* Maven
* Java JDK 8+
* Node.js 
* Eclipse IDE for Java Developers

#### Frontend:
Use the following commands to run locally.
```
cd client-app/
npm start
```
Edit the frontend code with your favourite editor to see live updates at http://localhost:3000/

#### Backend:
Import /server-api folder as a Maven project into Eclipse.

Run the file 'src/main/java/server_api/Application.java' with Eclipse to start the Spring server locally.

Consuming backend endpoint URL's must begin with http://localhost:8080/ when running locally.

#### Backend tests:
After importing project into Eclipse, right click the folder 'src/test/java' and Run as JUnit Test. 

Alternatively run the following commands from the root directory.
```
cd server-api/
mvn test
```
