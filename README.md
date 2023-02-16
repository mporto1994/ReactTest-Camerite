# ReactTest

ReactTest is a sample project based on Camerite Mobile App.
The main objective of ReactTest is to implement a CRUD for cameras.

## About the project

On the image bellow, you can see a design made for these features:

![App Layout Sample](./sample.png)

### About the frontend

On the frontend project, we're using [Expo](https://expo.dev) which uses react native for development.

There's already an initial structure of folders and files placed inside the folder [./src](./src).
Use it at will.

There's already an routing defined as an example for the CameraList page.
You can use the same strategy when defining the CameraForm route.

You can add any dependencies on the project, although it's not required.

### About the backend

All the backend routes are already implemented, you won't need to change any of it.
If you wan't to see it's implementation (not required) you can access the file [./backend/app](./backend/app.ts)

The backend implements a REST API for cameras.

_If you use [Postman](https://www.postman.com) you can import the backend collection using the file [ReactTest.postman_collection.json](./ReactTest.postman_collection.json)._

The routes that you'll be using are:

- Listing Cameras
  - method: GET
  - URI: <http://localhost:5000/cameras>
  - returns: a list of camera json object
    - id: integer
    - title: string
    - plan: "1dia" | "3dias" | "7dias"
    - external: boolean
    - image_url: string
- Deleting Camera
  - method: DELETE
  - URI: <http://localhost:5000/cameras/:cameraId>
  - path param: `cameraId` must be the `id` property for a camera.
  - returns:
    - status 200 when successfully deleted the camera.
    - status 404 when didn't find a camera for the sent `cameraId`.
- Creating Camera
  - method: POST
  - URI: <http://localhost:5000/cameras>
  - body's content-type: application/json
  - body parameters:
    - title: string
    - external: boolean
    - plan: "1dia" | "3dias" | "7dias" (will only accept this values)
  - body sample: `{"title":"Titulo Câmera", "external": true, "plan": "3dias"}`
  - returns:
    - status 200 when successfully created the camera.
    - status 400 when there's some problem on the body content.
- Updating Camera
  - method: PUT
  - URI: <http://localhost:5000/cameras/:cameraId>
  - path param: `cameraId` must be the `id` property for a camera.
  - body's content-type: application/json
  - body parameters:
    - title: string
    - external: boolean
    - plan: "1dia" | "3dias" | "7dias" (will only accept this values)
  - body sample: `{"title":"Titulo Câmera", "external": true, "plan": "3dias"}`
  - returns:
    - status 200 when successfully updated the camera.
    - status 400 when there's some problem on the body content.
    - status 404 when didn't find a camera for the sent `cameraId`.

### Responsive Design

You'll need to focus your development for mobile devices.
But keep in your mind the idea of responsive web design so any mobile device can see "almost" the same thing.

### Icons - Font Awesome

We'll be using font awesome for icons in our application.
Here's a sample that should be enough for you to make the app:

```typescript
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

// on tsx use:
function App() {
    return (
        <FontAwesomeIcon icon={faTrashCan} color="red" size='2x' />
    )
}
```

For this test, you'll be using the icons `faPencil`, `faTrashCan`, `faArrowLeft`, `faPlay` and `faPlusCircle`.

If you want to know more... Feel free to see the [official documentation](https://fontawesome.com/v6/docs/web/use-with/react/).

### Colors

The suggest header color is `#0071BC`.
For the pages, you can use `white` color.

## How to Install? 🤘

### NVM - Node.js and NPM

#### Linux

We recommend you to use `nvm` to download the version of `node.js` used on the project.

To download the `nvm` run the follow command:

_You can look for more information on the [nvm repository](https://github.com/nvm-sh/nvm)_

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Once you have installed `nvm` and it's working, you can run the follow to install the correct version of `node.js`:

_Make sure you are on the current path of the project, where the `.nvmrc` file is located_

```bash
nvm install
```

#### Windows

Download the last version of nvm-windows:
- https://github.com/coreybutler/nvm-windows/releases

You'll need to run nvm on PowerShell executing as an administrator (as well as all the folling commands).
Then execute:

```powershell
nvm install 16.13.0
```

Expo will need a permission a windows permission to build the webpackage. To get this permission execute the follow:
```powershell
Set-ExecutionPolicy RemoteSigned
```

### Project Dependencies

```bash
nvm use
npm install
```

#### Expo-Cli

If it the first time that you are running the application, you need to install expo-cli globally. You can see more [Here](https://docs.expo.dev).

```bash
nvm use
npm install --global expo-cli@6.0.1
```

## How to run?

### Backend

First thing you need to run is the backend application.
To do so, execute:

```bash
nvm use
npm run backend
```

By default, there'll be already one created camera that you can use for listing or deleting.
Every time that you re-run the backend it resets all the stored information.
Use it at will.

### Frontend

Execute:

```bash
nvm use
npm run web
```

### Known Issues

If you get the error `ENOSPC: System limit for number of file watchers reached` on running ReactTest application and you're running Linux, get a look on:

<https://stackoverflow.com/questions/55763428/react-native-error-enospc-system-limit-for-number-of-file-watchers-reached>
