# Webpack Build

I decided to build this project in vanilla JS and decided to use WebPack in order to learn it.

I'm also a heavy user of the Angular cli which abstracts webpack's functionality, so it is also useful to learn a bit about the tool which is running behind the curtains.

I soon realized that the build process escalated quite quickly. The angular cli provides many convenient functionalities such as creating a js and css bundle which are later inserted into the index.html file, and each of these functionalities translated into an extra plugin.

In this guide i will be explaining both my thought process as well as some of webpack's features.

## Table of Contents

1. Setting up Webpack 
    1. Basic Configuration
    2. Node Scripts

### Setting up Webpack

#### Basic Configuration

You can install webpack with the command  `npm install webpack --save-dev`.

The next step is to create the `webpack.config.js` file, so i could start configuring my build process.

Initial webpack.config.js

```javascript
var path = require('path'); // allows the resolve to be relative to the current path

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: ['./main.js']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
    ]
  },
  plugins: [
  ]
};

```
`entry` is where you define your bundle entry points. My config is telling webpack _read the module in the file main.js_.

`app` is the name of the bundle, resolving `[name].bundle.js` into `app.bundle.js`.

`output` is the result of webpack's compilation. Here i tell webpack to create a file `app.bundle.js` which will include all the content located in `main.js` including the files that `main.js` is importing, this file will be created in the `dist` directory.

Ok! let's see this in action. You can call webpack by running it from the node_modules, just type in the console:

```
node_modules\.bin\webpack -p
```
You should see something like this:

<img src="basic_compilation.png" width="350" alt="first compilation success">

And if you check your folder, webpack has now created a `dist` folder with the bundle contents inside. Further compilations will replace previous ones.

#### Node Scripts

Now that i have webpack running, i decided to add some node scripts to automate webpack's build process. In the package.json file i added the scripts object:

```json
"scripts": {
    "build": "webpack -p",
    "watch": "webpack --watch"
  }
```
The first one we already know