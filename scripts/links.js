

const container = document.getElementById("base");
const links = Array.from(document.getElementById("linksbox").getElementsByClassName("linkcell"));
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

    


    if (iframe.src != button.dataset.link) {
        iframe.src = dataset.link;
        iframe.title = dataset.link;

        if ("source" in dataset) {
            pulseanimation(sourceLink, "flash-inner");
            sourceLink.href = dataset.source;
            sourceLink.text = sourceLink.href;
        } else {
            sourceLink.text = "";
        }
        
        links.forEach(  (b) => {
            if (b !== button) {
                b.classList.remove("selected");
            } else {
                b.classList.add("selected")
            }
        }
        );

        console.log("selected source: ", button);
    }

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