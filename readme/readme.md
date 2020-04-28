
# SPROUT # 

## What is Sprout ##
It's buildpack for React app on top of combined NodeJS and WS servers.
It's full-stack javascript application. Web interface build
with React, connects to server interface build on combined express and
web socket servers. Mongo database (handled by mongoose) is used. 

## What it contains ##
Main directories are: sprout-backend and sprout-frontend.
There is also applicationParameters directory, both in root
and in sprout-backend directiories.

1. sprout-backend directory
Sprout-backend is server app that can be used separatedly 
from rest of application. In sprout-backend directory, server can 
be started in watch-mode with presets from sprout-backend/applicationParameters. 
Or it can be bundled into single file emited to build folder, without parameters.
If started here, server handle request to "/api" path - mainly to interact with 
database.

2. root directory:
In root directory, bundled server file from sprout-backend/build can be started 
with root presets from root applicationParameters folder. Those parameters 
allow to handle not only "/api" paths, but also static files and folders 
from sprout-frontend directory.

3. sprout-frontend directory:
Sprout-frontend is web application that can be used separatedly
from rest of application. In sprout-frontend directory, project
can be started in watch-mode (served by webpack to browser) or
it can be builded into single file emited do build directory.
Builded application (among with its static assets) can be served
by sprout-backend server, if process runs from root directory.  

## Set things up ##
More detailed informations will be there soon.
1. Root directory: npm install
2. Root directory: cp readme/.env.example .env
3. Above should copy and paste .env.example content into .env file.
4. sprout-backend directory: build server according to its instructions.
5. sprout-frontend directory: build front app according to its instructions.
6. Root directory: npm run start 
