EDirectInsure TODO app

## Description

This package contains both front and back-end parts of the todo exercise.

Back-end is made with node.js with express framework using mongodb as database

Front-end was made with react with create-react-app boilerplate

## Back-end concerns

this package comes with an .env.example to configure the server

DB_URI= connection string to the mongodb database
HOST= host ip of the connection (0.0.0.0) to serve on the network
PORT= host port
TOKEN_SECRET= secret string combination to encrypt the authentication tokens

this application is prepared to get the static content of the react-app on a folder named 'build'

## Front-end concerns

On the package.json is configured a proxy with the express server to access the apis directly without any network configuration during developemnt

There is no network configuration, the purpose is to build this app and then place the production static content on the express server

## Additional info

Each package comes with instructions placed on the README.md file about the avaliable scripts to run