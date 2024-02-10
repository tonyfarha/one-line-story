#!/bin/bash

echo "Installing frontend dependencies..."
cd /app/frontend
npm install

echo "Installing backend dependencies..."
cd /app/backend
npm install

cd /app/

if [ "$1" == 'DEV' ]; then
  echo "Running DEV..."
  npm run dev --prefix backend & npm run dev --prefix frontend
elif [ "$1" == 'PROD' ]; then
  echo "Running PROD..."
  npm run build --prefix frontend
  npm start --prefix backend
else
  echo "Invalid input. Please specify a valid environment: 'DEV' for development or 'PROD' for production."
fi
