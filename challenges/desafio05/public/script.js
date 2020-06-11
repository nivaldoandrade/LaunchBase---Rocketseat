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

// PAGINATE

function paginate(selectedPage, totalPages) {
    let pages = [],
        oldPage

    for(let currentPage = 1; currentPage <= totalPages; currentPage++) {

        const firstAndLastPage = currentPage <= 2 || currentPage >= totalPages - 1;
        const afterSelectedPage = currentPage <= selectedPage + 1; 
        const beforeSelectedPage = currentPage >= selectedPage - 1;

        if(totalPages <= 7){

            pages.push(currentPage);

        } else {
            if(firstAndLastPage || afterSelectedPage && beforeSelectedPage ) {

                if(oldPage && currentPage - oldPage > 2) {
                    pages.push("...");
                }

                if(oldPage && currentPage - oldPage == 2){
                    pages.push(currentPage - 1);
                }

                pages.push(currentPage);
                oldPage = currentPage;
            };
        };
    };
    return pages
}

const pagination = document.querySelector(".pagination");
const filter = pagination.dataset.filter;
const page = +pagination.dataset.page;
const total = +pagination.dataset.total;
const pages = paginate(page, total)

let elements = '';

for(let page of pages){

    if(String(page).includes('...')) {
         elements += `<span>...</span>`
    } else {
        if(filter) {
            elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
        } else {
        elements += `<a href="?page=${page}">${page}</a>`
        }
    }
}

pagination.innerHTML = elements;






