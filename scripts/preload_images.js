// Preload background images before showing it
var sheet = window.document.styleSheets[0];
var m = [
    ["background-image", "images/background.png", () => {
        document.getElementById("marginprovider").classList.add("marginextra");
    }],
    ["NQM", "images/projects/node-quick-maths.png", undefined, true],
    ["BLV2", "images/projects/bl_logo.png", undefined, true],
    ["DCREATOR", "images/projects/dc_empty.png", undefined, true],
    ["PXSORTER", "images/projects/pixelsorter.png", undefined, true],
];


m.forEach((v) => {
    var id = v[0];
    var url = v[1];
    var on_load = v[2];
    var delete_after_transition = v[3];

    var element = document.getElementById(id);
    console.log(element);

    element.classList.add("image-transition-before")
    var image = new Image();
    image.addEventListener('load', () => {
        element.classList.remove("image-transition-before")
        element.style.backgroundImage = `url("${url}")`;
        if (on_load !== undefined) {
            on_load()
        }
        if (delete_after_transition === true ) {
            pulseanimation(element, "flash-inner")
            // pulseanimation(element, "image-transition")
        } else {
            element.classList.add("image-transition")
        }
    })
    image.src = url;
    console.log(element);

})




