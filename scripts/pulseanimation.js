
function pulseanimation(element, classname) {
    element.classList.add(classname);
    let originalend = element.onanimationend;
    element.onanimationend = () => {
        element.classList.remove(classname);
        element.onanimationend = originalend;
    }
}