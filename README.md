## Demo
https://infallible-snyder-3ab24c.netlify.app/

## Installations
### Local Development Mode
- You’ll need to have Node >= 8.10 on your local development machine
- clone the project 
```
git clone https://github.com/hanyaismail/efishery_task.git
```
- move to project directory
```
cd efishery_task
```
- install dependencies
```
npm install
```
- run development mode, development mode will served on port 3000
```
npm start
```
- open browser and go to http:localhost:3000
- build app
```
npm run build
```

### Run production mode locally with docker
- you need Docker 17.05 or higher on the daemon and client on your machine
- clone the project 
```
git clone https://github.com/hanyaismail/efishery_task.git
```
- move to project directory
```
cd efishery_task
```
- build docker image
```
docker build -t efishery-task
```
- run docker image as a container, it will served on localhost:80
```
docker run -it -p 80:80 --rm efishery-task
```
- open browser and go to http:localhost