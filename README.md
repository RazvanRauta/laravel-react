# Amazing Real Estates

[![Deploy to DO](https://github.com/RazvanRauta/laravel-react/workflows/Deploy%20to%20DO/badge.svg)](https://ama.rrazvan.dev/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/ccd5fc54-511b-4d4d-813a-3c4ff7877e47/deploy-status)](https://amazing.rrazvan.dev/)
[![Heroku](https://heroku-badges.herokuapp.com/?app=laravel--api)](https://laravel--api.herokuapp.com/)

## Description

App's backend is made with Laravel and the frontend React, Redux, Material-UI, Typscript  

## Live view

#### [https://ama.rrazvan.dev](https://ama.rrazvan.dev)

<p align="center">
  <img src="git/screen.png" width="860" height="430"/>
</p>

## Requierments
* php 7.4
* node-js
* yarn
* composer
* docker
* docker-compose
* mysql
* optional - Mailgun Api

## Install

### ./backend

* Create .env file in ./backend with your variables
* `composer install`
* `php artisan rr:parse-web-page` to fetch all posts

### ./frontend

* Create .env file in ./frontend with backends url
* `yarn install`

## Run Project

In ./backend
`php artisan serve`
In ./frontend
`yarn start`

## Build project with docker

* Create .env file in repo's root with your variables 
* `docker-compose up --build -d`



