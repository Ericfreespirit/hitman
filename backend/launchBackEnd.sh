#!/bin/bash

read -p "Enter your PostgreSQL username: " USERNAME

DBNAME="hitman_db"

psql -U $USERNAME -c "CREATE DATABASE $DBNAME;"

echo "Database '$DBNAME' has been created."

npm run start:dev

