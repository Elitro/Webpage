const ContentModule = (function() {

    function updateContent(option) {
        const content = document.getElementById('content');
        console.log('Change Content');
        switch (option) {
            case 'webpack':
                {
                    // content.parentNode.replaceChild(, content);
                    console.log(content);
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