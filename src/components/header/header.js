require('./header.scss');
import ContentModule from '../content/content';

const HeaderModule = (function() {
    
    let template = require('./header.html');

    // let parser = 
    const templateDOM = new DOMParser().parseFromString(template, 'text/html');

    const options  = [
        {
            label: 'Home',
            href: '1'
        },
        {
            label: 'Blog',
            href: 'webpack'
        }
    ];

    const navMenu = templateDOM.getElementById('nav-menu');
    navMenu.parentNode.replaceChild(createMenu(options), navMenu);

    function createMenu(options) {
        const menu = templateDOM.getElementById('nav-menu');

        options.map((elem) => {
            const li = templateDOM.createElement('li');
            li.addEventListener('click', (event) => {menuNavigate(event, elem.href), true});
            // li.setAttribute('href', elem.href);
            li.appendChild(document.createTextNode(elem.label));
            li.setAttribute('class', 'menu-button');
            menu.appendChild(li);
        });

        return menu;
    }

    function menuNavigate(event, href) {
        event.stopPropagation();
        // console.log(`header ${href}`);
        ContentModule.updateContent(href);
    }

    return {
        template: templateDOM.getElementById('main-nav')
    }

}());

export default HeaderModule;