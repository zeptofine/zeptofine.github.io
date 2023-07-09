
icon = document.getElementById("profilepic");

icon.onclick = () => {
    if (icon.style.width == "512px") {
        icon.style.width = "";
        icon.style.height = "";
    } else {
        icon.style.width = "512px";
        icon.style.height = "512px";
    }
}