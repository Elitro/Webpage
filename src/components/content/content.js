require('./content.scss');
import WebpackBlog from '../../blog/webpack/webpack-build.md';
import hljs from 'highlight.js';

const ContentModule = (function () {

    let template = require('./content.html');
    // hljs.initHighlightingOnLoad();
    // debugger;
    const templateDOM = new DOMParser().parseFromString(template, 'text/html');
    let content = templateDOM.getElementById('main-content');    
    
    function init (domContent) {
        domContent.appendChild(content);
    }
    
    function styleMD(mdContent) {
        let mdDiv = document.createElement('div');
        mdDiv.innerHTML = mdContent;
        mdDiv.querySelectorAll('pre code').forEach( (block) => {
            hljs.highlightBlock(block);
        });
        return mdDiv.innerHTML;
    }

    function updateContent(option) {        
        
        switch (option) {
            case 'webpack':
            {   
                // content = styleMD(WebpackBlog);
                content.innerHTML = styleMD(WebpackBlog);
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