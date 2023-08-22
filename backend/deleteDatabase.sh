#!/bin/bash

read -p "Enter your PostgreSQL username: " USERNAME

DBNAME="hitman_db"

read -p "Are you sure you want to delete the database '$DBNAME' (y/n)? " choice
if [[ $choice != "y" ]]; then
  echo "Aborted."
  exit 1
fi

psql -U $USERNAME -c "DROP DATABASE $DBNAME;"

echo "Database '$DBNAME' has been deleted."
