'use strict';
import HeaderModule from './components/header/header.js';
// require('normalize.css');

console.log('main.js');

// debugger;
document.getElementById('header').appendChild(HeaderModule.template); 
/*eslint no-unused-vars: 0*/
function menuNavigate(event) {
    console.log(`main ${event}`);
}