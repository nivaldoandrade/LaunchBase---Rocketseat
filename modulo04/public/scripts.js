// ANIMAÇÃO LINKS HEADER
const currentPage = location.pathname;
const menuHead = document.querySelectorAll("header .links a");

for(item of menuHead) {
    if( currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active");
    };
};

// CONFIRMAÇÃO DE DELETE INSTRUTOR/MEMBER

const formDelete = document.querySelector("#form-delete");

formDelete.addEventListener("submit", (e) => {
    const confirmation = confirm("Deseja Deletar?");
    if(!confirmation) {
        e.preventDefault();
    }
});

