require('./content.scss');
import WebpackBlog from '../../blog/webpack/webpack-build.md';

const ContentModule = (function () {

    let template = require('./content.html');
    const templateDOM = new DOMParser().parseFromString(template, 'text/html');
    const content = templateDOM.getElementById('main-content');    
    
    function init (domContent) {
        domContent.appendChild(content);
    }

    function updateContent(option) {        
        
        switch (option) {
            case 'webpack':
            {
                content.innerHTML = WebpackBlog;
            }
            break;
            case 'home':
            {
                content.innerHTML = '';
            }
            break;

            default:
                break;
        }
    }

    return {
        init: init,
        template: templateDOM.getElementById('main-content'),
        updateContent: updateContent
    }

})();

export default ContentModule;