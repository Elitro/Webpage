require('./header.scss');
import ContentModule from '../content/content';

const HeaderModule = (function() {
    
    const template = require('./header.html');
    const templateDOM = new DOMParser().parseFromString(template, 'text/html');
    
    const options  = [
        {
            label: 'Home',
            href: 'home'
        },
        {
            label: 'Blog',
            href: 'webpack'
        }
    ];

    function init (domHeader) {    
        
        const header = templateDOM.getElementById('main-nav');
        const navMenu = templateDOM.getElementById('nav-menu');
        navMenu.parentNode.replaceChild(createMenu(options), navMenu);

        // Moves the node from the template dom to the document dom
        domHeader.appendChild(header); 
    }

    function createMenu(options) {
        const menu = templateDOM.getElementById('nav-menu');

        options.map((elem) => {
            const li = templateDOM.createElement('li');
            li.addEventListener('click', (event) => {menuNavigate(event, elem.href), true});
            li.appendChild(document.createTextNode(elem.label));
            li.setAttribute('class', 'menu-button');
            menu.appendChild(li);
        });

        return menu;
    }

    function menuNavigate(event, href) {
        event.stopPropagation();
        ContentModule.updateContent(href);
    }

    return {
        init: init
    }

}());

export default HeaderModule;