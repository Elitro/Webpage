# Webpack Build

I decided to build this project in vanilla JS and decided to use WebPack in order to learn it.

I'm also a heavy user of the Angular cli which abstracts webpack's functionality, so it is also useful to learn a bit about the tool which is running behind the curtains.

I soon realized that the build process escalated quite quickly. The angular cli provides many convenient functionalities such as creating a js and css bundle which are later inserted into the index.html file, and each of these functionalities translated into an extra plugin.

In this guide i will be explaining both my thought process as well as some of webpack's features.

## Table of Contents

1. Setting up Webpack 
    1. Basic Configuration
    2. Node Scripts
2. Plugins
    1. Sass
    2. Html (index)
    3. Dev Server
    4. ESLint


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
We can see the addition of a new command `--watch`. This command automatically recompiles our build everytime it detects the files has been changed.

### Plugins

After having the basic build process set up and working i started adding optimization steps to add more functionalities to the project.

Webpack is very flexible when it comes to extra functionalities, and these come in the form of plugins. These allow you to automatically com

#### Sass

There are many ways you can bundle css, i decided to both use a preprocessor and bundle it in a separate file. In order to do this, you will need to run the following line:

```
npm install css-loader node-sass sass-loader extract-text-webpack-plugin --save-dev --save-dev
```

We need `css-loader` to process CSS files. `sass-loader` and its dependency ` node-sass` allows us to compile .scss files to css. Lastly, `extract-text-webpack-plugin` extracts text from a bundle into a file, allowing us to have a file for the bundled js and another for the bundled css.

In the `webpack.config.js` file:

```javascript
...
const ExtractTextPlugin = require("extract-text-webpack-plugin");
...
module.exports = {
  ...
  module: {
    rules: [      
      { // rule for standard css files
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader',
          options: { importLoaders: 1 }
        }),
      },
      { // loader used to compile sass files
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      }
    ],
    plugins: [
      new ExtractTextPlugin({
        filename: '[name].bundle.css',
        allChunks: true,
      })
    ]
  }
  ...
}
```

#### Html (index)

Today we might be using Sass, but tomorrow, who knows?</br>
Our bundles will need to be included in the index.html file:
```HTML
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    ...

    <link href="app.bundle.css" rel="stylesheet">
</head>

<body>
    <script type="text/javascript" src="app.bundle.js"></script>
</body>

</html>
```

But having to manually include the bundles is a boring and error prone procedure. In order to keep our build process scalable and automatic i decided to use the following package:

```
npm install html-webpack-plugin --save-dev
```
This plugin creates and inserts the bundle files into the index.html file. It also supports templates, what this means is that you can have an index.html file created by you with all the metadata you want to add and the plugin will insert the scripts after running webpack compilation.

In the webpack.config.js

```javascript
...
module: {
  ...
  plugins: [
    ...
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}

```

#### Web Server

Another very useful feature is having webpack automatically compile and show it to you immediately! this is called `live reloading` and we can achieve this with the dev-server plugin:

```
npm install webpack-dev-server --save-dev
```

In the webpack.config.js file you can just add the following line:

```javascript
...
module.exports = {
  ...
  plugins: [
    ...
    devServer: {
      contentBase: path.resolve(__dirname, './dist')
    }
  ]
}
```
And in the package.json file you can add the command:
```json
...
"scripts": {
  ...
  "serve": "node_modules/.bin/webpack-dev-server"
}
```
If you run `npm run serve` webpack will host a server instance in the address `http://localhost:8080/` and if you change any file it will automatically recompile it and reflect the changes in the browser.

### ESLint

Linting is a powerful tool to avoid errors or simply to maintain a similar coding style between multiple developers in a project. 

TODO: A more compreensive explanation on linting

ESLint is a very popular plugin, which includes big name companies coding styles such as Google or AirBnB.

You will first need to install eslint:
```
npm install eslint --save-dev
```
Then you can install the loader for webpack:
```
npm install --save-dev eslint-loader
```
This will allow webpack to include linting when compiling your code, with immediate feedback in the console whenever something does not comply to the linting rules.

Initialize the linting file:
```
$ ./node_modules/.bin/eslint --init
```

Basic setup to get you started:
```javascript
module.exports = {
    "extends": "eslint:recommended",
    "env": {
        "browser": true,
        "es6": true
    },
    "parserOptions": {
        "sourceType": "module"
    },
    rules: {
        "no-console": 0
    }
};
```

You can check the documentation [here](http://eslint.org/docs/user-guide/configuring "ESLint Configuration")




// TODO eslint in the ide

## Sources

https://www.npmjs.com/package/eslint-webpack
https://github.com/MoOx/eslint-loader
https://webpack.github.io/docs/tutorials/getting-started/