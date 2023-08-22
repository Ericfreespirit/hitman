#!/bin/bash

# Create a User
curl -X POST "http://localhost:5000/auth/register?username=Agent_47&first_name=Hit&last_name=Man&mail=kill@you.com&pwd=secret&phone=0601390876"
