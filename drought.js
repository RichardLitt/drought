var fs = require('fs')
var url = chrome.extension.getURL('/images/field.jpg');

// Get rid of the sections you don't like
function clear_page() {
    var ariaLabels = document.querySelectorAll('[aria-label]');

    for (var i = 0; i < ariaLabels.length; i++) {
        if (ariaLabels[i].getAttribute("aria-label") == "Hide Sidebar") {
            ariaLabels[i].click()
            break;
        }
    }
    // I'm personally not a fan of the blue Status bar
    document.getElementsByClassName('_li')[0] = document.getElementsByClassName('_li')[0].removeChild(document.getElementById('pagelet_bluebar'));
    // Or the rest of the page, to be honest
    document.getElementsByClassName('_li')[0] = document.getElementsByClassName('_li')[0].removeChild(document.getElementById('globalContainer'));

    // If you want to get rid of the chatbar, uncomment the next line.
    // document.getElementsByClassName('_li')[0] = document.getElementsByClassName('_li')[0].removeChild(document.getElementById('pagelet_sidebar'));

    // I don't even like the translation globe. Who speaks in other languages?
    // This seems to break it. Needs to be fixed.
    // document.getElementsByClassName('clearfix nubContainer rNubContainer')[0] = document.getElementsByClassName('clearfix nubContainer rNubContainer')[0].removeChild(document.getElementById('fbTranslationsNub'));
}

function add_image() {
    var mydiv = document.getElementsByClassName('_li');
    var newcontent = document.createElement('div');
    var viewportHeight = window.innerHeight;
    var viewportWidth  = window.innerWidth;
    var concatCSS = document.createElement('style');

    concatCSS.innerHTML += fs.readFileSync(__dirname + '/main.css', 'utf8');
    // Edit the src to point to a wallpaper you, you know, like.
    newcontent.appendChild(concatCSS)
    newcontent.innerHTML += "<div class='drought' style='background-image:url(" + url + ");height:" + viewportHeight + 'px;width:' + viewportWidth + "px;'></div>";


    while (newcontent.firstChild) {
        mydiv[0].appendChild(newcontent.firstChild);
    }
}

// And we're done here, folks.
clear_page();
add_image();
