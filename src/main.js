'use strict';

console.log('main.js');


import HeaderModule from './components/header/header';
HeaderModule.init(document.getElementById('header'));

import ContentModule from './components/content/content';
ContentModule.init(document.getElementById('content'));

