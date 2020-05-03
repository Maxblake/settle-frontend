function setErrorClass(query = "input, select, textarea") {
    const inputs = document.querySelectorAll(query);

    inputs.forEach(input => {
        input.addEventListener(
            "invalid",
            event => {
                input.classList.add("error");
            },
            false
        );
    });
}

let propertyTypes = {
    "generic": "properties",
    "room": "rooms",
    "house": "houses",
    "apartment": "apartments",
    "hostel": "hostels",
    "office": "offices",
    "hall": "halls",
    "land": "lands",
    "frame": "frames"
}

function getPropertyRoute(propertyType){
    return propertyTypes[propertyType]
}

function getPropertyType(propertyRoute){
    let propertyRoutes = {}
    for(let route in propertyTypes){
        let key = propertyTypes[route]
        propertyRoutes[key] = route
    }
    return propertyRoutes[propertyRoute]
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function onScrollToBottom(handleScrollToBottom, y = 1) {
    let scrollToBottomEventHandler = () => {
        let scrollTop = (
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop || 0
        );

        let distanceFromBottom = (
            document.documentElement.offsetHeight -
            (window.innerHeight + scrollTop)
        )

        if (distanceFromBottom < y && distanceFromBottom > -1) {
            handleScrollToBottom();
        }
    };

    return scrollToBottomEventHandler
}

/**
 * @param {HTMLImageElement} image - Image File Object
 * @param {Object} crop - crop Object
 * @param {String} fileName - Name of the returned file in Promise
 */
function cropImage(image, crop, saveImage) {
    image.onload = function () {
        const canvas = document.createElement('canvas');

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = crop.width * scaleX;
        canvas.height = crop.height * scaleY;

        const sx = crop.x * scaleX;
        const sy = crop.y * scaleY;
        const sw = crop.width * scaleX;
        const sh = crop.height * scaleY;
        const dx = 0;
        const dy = 0;
        const dw = crop.width * scaleX;
        const dh = crop.height * scaleY;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(
            image,
            sx, sy, sw, sh,  // Source dimensions
            dx, dy, dw, dh  // Destination dimensions
        );

        //const base64Image = canvas.toDataURL('image/jpeg');
        //return base64Image

        // As a blob
        canvas.toBlob(saveImage, 'image/jpeg', 1);
    }
}


export {
    setErrorClass, getCookie, onScrollToBottom, propertyTypes,
    getPropertyRoute, getPropertyType, cropImage
}
