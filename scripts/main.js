// taken from https://stackoverflow.com/a/40384602
const interleave = ([x, ...xs], ...rest) =>
    x === undefined
        ? rest.length === 0
            ? []                                // base: no x, no rest
            : interleave(...rest)              // inductive: no x, some rest
        : [x, ...interleave(...rest, xs)];  // inductive: some x, some rest

class TableHandler {
    constructor(tables, box) {
        this.tables = tables;
        this.selected;

        // Create buttons to operate the tables
        let listdiv = document.createElement('div');
        listdiv.id = "buttonbox";
        listdiv.className = "row";

        this.buttons = this.createTableButtons();
        console.log("created buttons", this.buttons);
        Array.from(this.interleaveDots(this.buttons)).forEach(element => {
            listdiv.appendChild(element)
        });
        box.insertBefore(listdiv, box.firstChild);
    }

    createTableButtons() {
        let newdivs = [];
        var table;
        for (let i = 0; i < this.tables.length; i++) {
            table = this.tables[i];
            console.assert(true, 'name' in table.dataset);
            if ('name' in table.dataset) {
                var newdiv = document.createElement('button');
                newdiv.type = "button";
                newdiv.textContent = table.dataset.name;
                newdiv.onclick = () => handler.open(i);
                newdivs.push(newdiv);
            }
        }
        return newdivs;
    }

    interleaveDots(divs) {
        let dots = [];
        var dot;
        for (let i = 1; i < divs.length; i++) {
            dot = document.createElement("div");
            dot.className = "dot";
            dots.push(dot);
        }
        return interleave(divs, dots);
    }

    open(sel) {
        if (this.tables[sel] === this.selected) {
            console.log("table already selected");
            return;
        }
        for (let i = 0; i < this.tables.length; i++) {
            if (i == sel) {
                this.tables[i].style.width = "100%";
                this.tables[i].style.opacity = "1";
                this.tables[i].classList.add("flash-inner");

                this.buttons[i].style.letterSpacing = "2px";
                this.buttons[i].style.color = "white";
                this.buttons[i].classList.add("bolder");

                this.selected = this.tables[i];
                console.log("selected ", this.selected);
            } else {
                this.tables[i].style.width = "0px";
                this.tables[i].style.opacity = "0";
                this.tables[i].classList.remove("flash-inner");
                this.buttons[i].classList.add("bolder");

                this.buttons[i].style.letterSpacing = "";
                this.buttons[i].style.color = "";
                this.buttons[i].classList.remove("bolder");
            }
        }
    }
}
const handler = new TableHandler(
    document.getElementById("tablesdiv").getElementsByClassName("tables"),
    document.getElementById("tablebox"),
);
handler.open(0);

console.log(handler);