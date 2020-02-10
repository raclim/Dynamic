window.onload = function() {
    console.log("LOADED");
}

function headerClick(element) {
    console.log("clicked", element);
    const head = document.getElementById(element);
    head.style.color = 'blue';
}