

const container = document.getElementById("base");
const links = document.getElementById("linksbox").getElementsByClassName("linkcell");
const resetbutton = document.getElementById("resetLayoutButton");
const iframe = document.getElementById("embedframe");
const div = document.getElementById("embedbox");

const sourceLink = document.getElementById("source");
const linkParagraph = document.getElementById("link");


function selectSrc(idx) {


    let button = links[idx];
    let dataset = button.dataset;

    div.style.width = "var(--width-controller)";
    div.style.opacity = "1";
    div.style.marginLeft = "var(--gap)";
    if (iframe.src != links[idx].dataset.link) {
        iframe.src = dataset.link;
    }

    if ("source" in dataset) {
        pulseanimation(sourceLink, "flash-inner");
        sourceLink.href = dataset.source;

        sourceLink.text = sourceLink.href;
        sourceLink.style.height = "";
    } else {
        sourceLink.style.height = "0%";
    }
    iframe.style.opacity = "1";

    
    console.log("selected source: ", links[idx]);

}

function revert() {
    div.style.width = "0%";
    div.style.opacity = "0";
    div.style.marginLeft = "";
}
// get button links and bind onclick
var button;
for (let i = 0; i < links.length; i++) {
    button = links[i];
    if ("link" in button.dataset) {
        console.log(button.dataset.link);
        button.onclick = () => selectSrc(i);
    }
}
resetbutton.onclick = () => revert();


revert();