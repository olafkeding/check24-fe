export function documentReady(callback) {
    if (document.readyState === "complete") {
        callback();
    } else {
        document.addEventListener("DOMContentLoaded", callback);
    }
};

export function removeAllChildren(node) {
    while(node.firstChild) {
        node.removeChild(node.firstChild);
    }
};

export function hide(element) {
  element.style.display = "none";
};

export function createOption(text, value) {
    const opt = document.createElement("option");
    opt.value = value || text;
    opt.innerText = text;
    return opt;
};