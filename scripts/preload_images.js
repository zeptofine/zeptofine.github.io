// Preload background images before showing it
var sheet = window.document.styleSheets[0];
var m = [
    ["background-image", "images/background.png", () => {
        document.getElementById("marginprovider").classList.add("marginextra");
    }],
    ["NQM", "images/projects/node-quick-maths.png"],
    ["BLV2", "images/projects/bl_logo.png"],
    ["DCREATOR", "images/projects/dc_empty.png"],
    ["PXSORTER", "images/projects/pixelsorter.png"],
];


m.forEach((v) => {
    var id = v[0];
    var url = v[1];
    var on_load = v[2];

    var element = document.getElementById(id);
    console.log(element);

    element.classList.add("image-transition")
    var image = new Image();
    image.addEventListener('load', () => {
        element.style.backgroundImage = `url("${url}")`;
        if (on_load !== undefined) {
            on_load()
        }
    })
    image.src = url;
    console.log(element);

})