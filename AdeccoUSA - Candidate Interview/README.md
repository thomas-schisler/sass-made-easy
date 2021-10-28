## Build Environment

### VS Code 
**Plugins**
* Watch SASS <https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass>

### Terminal in VS Code
**Steps**
1. Open terminal 
2. Type `corsproxy` then `ctrl+c` to start **corsproxy**
3. Open new terminal instance `ctrl+shift+5`
4. Type `json-server --watch "C:\_repos\azure\AdeccoUSA - Candidate Interview App\data\interviewConfig.json" --port 8000`
5. Open new terminal instance `ctrl+shift+5`
⋅⋅1. Type `yarn install` to install dependancies
⋅⋅2. Type `yarn start` to start `localhost`

**corsproxy** <https://www.npmjs.com/package/corsproxy>
```
npm install -g corsproxy 
corsproxy
```

**json-server** <https://www.npmjs.com/package/json-server>
```
json-server --watch "C:\_repos\azure\AdeccoUSA - Candidate Interview App\data\interviewConfig.json" --port 8000
json-server --watch "LOCAL_PATH_TO_JSON_FOR_TESTING"  --port 8000 (example)
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

