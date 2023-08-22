#!/bin/bash

# Front
echo "Installing front dependencies..."
cd frontend
npm install
cd ..

# Back
echo "Installing back dependencies..."
cd backend
npm install
./createDatabase.sh
cd ..

echo "All installations completed."
