

const container = document.getElementById("base");
const links = Array.from(document.getElementById("linksbox").getElementsByClassName("linkcell"));
const div = document.getElementById("embedbox");

const sourceLink = document.getElementById("source");
const linkParagraph = document.getElementById("link");

function sendLink(idx) {
    let button = links[idx];
    let dataset = button.dataset;
}

// get button links and bind onclick
var button;
for (let i = 0; i < links.length; i++) {
    button = links[i];
    if ("link" in button.dataset) {
        console.log(button.dataset.link);
        button.onclick = () => window.open(button.dataset.link);
    }
}