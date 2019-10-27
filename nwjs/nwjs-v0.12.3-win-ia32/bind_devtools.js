
document.addEventListener('keydown', function(event) {
    if (!event.ctrlKey && !event.altKey) {
        if(event.keyCode === 119) {
            if(typeof require === 'function' && typeof process === 'object') {
                require('nw.gui').Window.get().showDevTools();
                event.preventDefault();
            }
        }
    }
}, false);