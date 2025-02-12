// taken from https://stackoverflow.com/a/40384602
const interleave = ([x, ...xs], ...rest) =>
    x === undefined
        ? rest.length === 0
            ? []                             // base: no x, no rest
            : interleave(...rest)           // inductive: no x, some rest
        : [x, ...interleave(...rest, xs)]; // inductive: some x, some rest


function createTableButtons() {
    let newdivs = [];
    var table;
    for (let i = 0; i < tables.length; i++) {
        table = tables[i];
        console.assert(true, 'name' in table.dataset);
        if ('name' in table.dataset) {
            var newdiv = document.createElement('button');
            newdiv.classList = ["fonted"];
            newdiv.type = "button";
            newdiv.textContent = table.dataset.name;
            newdiv.onclick = () => open(i, true);
            newdivs.push(newdiv);
        }
    }
    return newdivs;
}


function interleaveSeparators(divs) {
    let dots = [];
    var dot;
    for (let i = 1; i < divs.length; i++) {
        dot = document.createElement("div");
        dot.className = "dot";
        dots.push(dot);
    }
    return interleave(divs, dots);
}

const tables = document.getElementById("tablesdiv").getElementsByClassName("tables");
const url = new URL(window.location.href);

let selected;
let listdiv = document.getElementById("buttonbox");
let buttons = createTableButtons();

Array.from(interleaveSeparators(buttons)).forEach(element => listdiv.appendChild(element));

// Preload the background image before showing it
var src = "images/background.png";
var image = new Image();
image.addEventListener('load', function () {
    document.getElementById("marginprovider").classList.add("marginextra");
    document.getElementById("background-image").classList.add("backgroundextra");
});
image.src = src;
console.log(image);

root = document.querySelector(":root");
function open(sel, clicked) {
    if (tables.length < sel || tables[sel] === selected)
        return false;

    var table;
    for (let i = 0; i < tables.length; i++) {
        table = tables[i];
        if (i == sel) {
            pulseanimation(table, "flash-inner");
            table.classList.remove("collapsed");

            buttons[i].style.letterSpacing = "2px";
            buttons[i].style.color = "white";
            buttons[i].classList.add("bolder");

            selected = table;

            root.style.setProperty("--height-multiplier", ("height" in table.dataset) ? table.dataset.height : "");
            root.style.setProperty("--width-multiplier", ("width" in table.dataset) ? table.dataset.width : "");

            url.searchParams.set("idx", sel);
            if (clicked)
                window.history.pushState({}, document.title, url.href);

            console.log(url.href)

        } else {
            buttons[i].classList.remove("bolder");
            table.classList.add("collapsed");

            buttons[i].style.letterSpacing = "";
            buttons[i].style.color = "";
        }
    }
    return true;
}


for (const button of buttons) {
    button.addEventListener("keydown", (event) => {
        console.log(event);
    })
}

document.addEventListener("keydown", (event) => {
    if (isFinite(event.key) && event.key <= buttons.length) { // is a number
        open(event.key - 1, true);
    }
})

// Search Parameter Handler 
function monitorSearchParams() {
    idx = new URLSearchParams(window.location.search).get("idx");
    if (idx === null) {
        open(0, false);
    } else {
        if (tables.length > idx)
            open(idx, false);
        else
            open(0, false);
    }
}


monitorSearchParams();
window.addEventListener('popstate', monitorSearchParams);