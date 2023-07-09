
class LinksHandler {
    constructor(container, links, iframe, embedDiv, resetter) {
        this.container = container;
        this.links = links;
        this.iframe = iframe;
        this.div = embedDiv;
        this.resetter = resetter;
        this.sourceLink = document.getElementById("source");
        this.linkParagraph = document.getElementById("link");
        this.gap = getComputedStyle(document.querySelector(':root')).getPropertyValue('--gap');


        // get button links and bind onclick
        var button;
        for (let i = 0; i < this.links.length; i++) {
            button = this.links[i];
            if ("link" in button.dataset) {
                console.log(button.dataset.link);
                button.onclick = () => this.selectSrc(i);
            }
        }
        this.resetter.onclick = () => this.revert();
    }

    selectSrc(idx) {
        console.log("selected source: ", this.links[idx]);
        let button = this.links[idx];
        let dataset = button.dataset;

        this.div.style.width = "100%";
        this.div.style.opacity = "1";
        
        this.iframe.src = dataset.link;

        if ("source" in dataset) {
            this.sourceLink.href = dataset.source;
            this.sourceLink.text = this.sourceLink.href;
            this.sourceLink.style.height = "";
        } else {
            this.sourceLink.style.height = "0%";
        }

        this.iframe.style.width = "calc(100% - " + this.gap + ")"; // gross
        this.iframe.style.opacity = "1";
        this.iframe.style.marginLeft = this.gap;

        this.container.style.width = "calc(min(100%, 1350px))";

    }

    revert() {
        this.iframe.style.width = "";
        this.iframe.style.opacity = "0";
        this.iframe.style.marginLeft = "";

        this.container.style.width = "";
        this.div.style.width = "0%";
        this.div.style.opacity = "0";

    }
}

let resetbutton = document.getElementById("resetLayoutButton");
let container = document.getElementById("base");
const links = document.getElementById("linksbox").getElementsByClassName("linkcell");
const iframe = document.getElementById("embedframe");
const embedDiv = document.getElementById("embedDiv");

const linkhandler = new LinksHandler(container, links, iframe, embedDiv, resetbutton);
linkhandler.revert();