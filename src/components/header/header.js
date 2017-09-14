require('./header.scss');

const HeaderModule = (function() {
    
    let template = require('./header.html');

    // let parser = 
    const templateDOM = new DOMParser().parseFromString(template, 'text/html');

    const options  = [
        {
            label: 'Home',
            href: ''
        },
        // {
        //     label: 'Second',
        //     href: ''
        // },
        {
            label: 'Blog',
            href: ''
        }
    ];

    templateDOM.getElementById('main-nav').appendChild(createMenu(options));

    function createMenu(options) {
        const menu = document.createElement('ul');

        options.map((elem) => {
            const li = templateDOM.createElement('li');
            // li.setAttribute('href', elem.href);
            li.appendChild(document.createTextNode(elem.label));
            menu.appendChild(li);
        });

        return menu;
    }

    return {
        template: templateDOM.getElementById('main-nav')
    }

}());
// export default greet;
export default HeaderModule;