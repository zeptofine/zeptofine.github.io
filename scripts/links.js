

const container = document.getElementById("base");
const links = document.getElementById("linksbox").getElementsByClassName("linkcell");
const iframe = document.getElementById("embedframe");
const div = document.getElementById("embedbox");

const sourceLink = document.getElementById("source");
const linkParagraph = document.getElementById("link");


function selectSrc(idx) {

    if (iframe.style.opacity != 1) {
        iframe.style.opacity = "1";
    }


    let button = links[idx];
    let dataset = button.dataset;

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

    
    console.log("selected source: ", links[idx]);

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
iframe.style.opacity = "0";