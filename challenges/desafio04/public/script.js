const contentPage = window.location.pathname;
const button = document.querySelector("button");
const headerLinks = document.querySelectorAll("header .links a");

for(item of headerLinks) {
    if(contentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active");
    }
}

if(contentPage.includes("create")){
    console.log("ok");
    button.style.width = "100%";
}