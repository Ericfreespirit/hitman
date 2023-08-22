<p align="center">
  <img src="./hitman_logo.png" width="200" alt="Nest Logo" />
</p>
  <p align="center">An app RESTful Api made in 3 days.</p>
    <p align="center">
<a target="_blank"><img src="https://img.shields.io/badge/Frontend-REACT-yellow?style=flat&logo=chrome" alt="Front" /></a>
<a target="_blank"><img src="https://img.shields.io/badge/Backend-Nest-yellow?style=flat&logo=chrome" alt="Back" /></a>
<a target="_blank"><img src="https://img.shields.io/badge/Database-PostgreSQL-yellow?style=flat&logo=chrome" alt="Database" /></a>

<a target="_blank"><img src="https://img.shields.io/badge/Npm%20Version-8.19.2-red?style=flat&logo=chrome" alt="Chrome version" /></a>
<a target="_blank"><img src="https://img.shields.io/badge/Chrome%20Version-115.0.5790.170-blue?style=flat&logo=chrome" alt="Chrome version" /></a>
<a target="_blank"><img src="https://img.shields.io/badge/Safari%20Version-16.5-blue?style=flat&logo=chrome" alt="Safari version" /></a>
<a target="_blank"><img src="https://img.shields.io/badge/Firefox%20Version-109.0.1-blue?style=flat&logo=chrome" alt="Firefox version" /></a>
<a target="_blank"><img src="https://img.shields.io/badge/Swagger%20Version-1.0-green?style=flat&logo=chrome" alt="Firefox version" /></a>
</p>

## Description
Julien and Corentin.
Welcome to my discreet platform, fellow assassins ! 😎

As your host, I'm here to explain to you how your mission will unfold.

Follow the steps strictly, please.
Should you need assistance, I'm at your service, shrouded in secrecy. 🕵️‍♂️

Ready ? Let's goooo ! 🎯🔪

## Installation && Data migration
⚠️ Before the installation make sure you PostgreSQL server is launch at port 5432

```bash
# Installation: node_modules front/back
# Data migration: create database "hitman_db" http://localhost:5432
# your PostgreSQL username will be ask
$ ./install.sh
```

## Running the app

```bash
# development frontend http://localhost:3000
$ cd ./frontend
$ npm run start

# development backend http://localhost:5000
$ cd ./backend
$ npm run start:dev

# create a user {Login:Agent_47;Pass:secret}
$ cd ./backend
$ ./createUser.sh
```
<p> Now enjoy 😉</p>
## Bonus

- Swagger : http://localhost:5000/api
- Bonus contract features:
	- Display contract(s)
	- Delete contract
	- Accept contract (5 max)


## Contact

- Author - Eric Ling
- Email - ericlingfr@gmail.com


<p align=center>make with ❤️ </p>