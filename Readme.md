# Microfrontends

> Simulate a agnostic view render micro frontend using containers running a static http-server inside. 

This approach fits on projects where there are several teams working on separated modules and they don't need to compose fragmented views like [this](https://micro-frontends.org/).

This project doesn't aim explain the entire CI/CD cicle because the frontend build is part of Docker container build.

Feel free to ask and make PR's 👍

## Prerequisites
* Docker
* Docker compose 1.2 +

> P.S Tested only on a Windows 10 machine

## Services
* app-a: A pure ES6 with babel WebComponent;
* app-b: A pure ES6 with babel WebComponent (yes, again);
* app-c: A Angular 6 made WebComponent;
* app-d: A React 17 made WebComponent;
* registry: Rest API where these above apps can register and unregister;
* root-app: The index. This app instantiates the root-menu and makes requests to the registry server;
* root-menu: Receive the routes list, render and dispach events when the User click some link.

## Running
```
$ docker-compose up
```
> It will take a long time on first run depending on your internet connection and procesing power

If all goes well you should have this on your terminal:

![terminal result](./readme-assets/compose-result.png "Terminal result")


## So?
After You get all containers up You shall be able to access the url http://127.0.0.1:18080 in your browser and:
1. root-app will initialize;
2. root-app asks registry service to the list of apps (You can check the list here http://127.0.0.1:18081);
3. root-app will instantiate the root-menu and pass the apps list through the 'routes' attribute;
4. root-menu will render the menu;
5. If You click some link root-app will download the app and append it to the body.

## Try this
1. On a separeted terminal stop a app container ``docker stop app-d``
   ![terminal result](./readme-assets/stop-container-d-result.png "Terminal result")
2. After this reopen your browser on the url http://127.0.0.1:18080 (or just press F5 if it's already open);
   1. You shall see that the "App D" link is gone;
3. Start the container again ``docker start app-d``
   ![terminal result](./readme-assets/start-container-d-result.png "Terminal result")
4. Press F5 on your browser and now you can see the "App D" link back.

## Caveats
* It's intended to be just a POC so there is just one javascript file per container. It's can be easily changed setting a list of files (js and css) on the app package.json and read this in the root-app through the registry service;
* It's a monorepo but don't have to be. So the static-server code is replicated on every app because each team should be able to build theyr own static http-server. It's useful for SSR server. Eventualy they can share some http-servers as a npm package.