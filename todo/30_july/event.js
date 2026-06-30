const grandparent = document.getElementById("grandparent");
const parent = document.getElementById("parent");
const child = document.getElementById("child");
const log = document.getElementById("log");

function showMessage(elementName) {
    log.innerHTML += `<p>${elementName} received the click event.</p>`;
}

grandparent.addEventListener("click", () => showMessage("Grandparent"));
parent.addEventListener("click", () => showMessage("Parent"));
child.addEventListener("click", () => showMessage("Child"));
