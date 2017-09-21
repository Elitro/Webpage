import WebpackBlog from '../../blog/webpack/webpack-build.md';
const ContentModule = (function() {

    function updateContent(option) {
        const content = document.getElementById('content');
        console.log('Change Content');
        switch (option) {
            case 'webpack':
                {
                    content.innerHTML = WebpackBlog;
                    // console.log(String(require('../../blog/webpack/webpack-build.md')));
                    // console.log(WebpackBlog);
                }
                break;
        
            default:
                break;
        }
    }

    return {
        updateContent: updateContent
    }

})();

export default ContentModule;