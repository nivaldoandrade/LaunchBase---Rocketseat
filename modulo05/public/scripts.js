// ANIMAÇÃO LINKS HEADER
const currentPage = location.pathname;
const menuHead = document.querySelectorAll("header .links a");

for(item of menuHead) {
    if( currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active");
    };
};

// CONFIRMAÇÃO DE DELETE INSTRUTOR/MEMBER
function confirmationDelete(formDelete){
    formDelete.addEventListener("submit", (e) => {
            const confirmation = confirm("Deseja Deletar?");
            if(!confirmation) {
                e.preventDefault();
            }
        });
}

 const formDelete = document.querySelector("#form-delete");

if(formDelete){
    confirmationDelete(formDelete);
}

// PAGINATE
function paginate(selectedPage, totalPages){
   let pages = [],
       oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++){
        const firstAndLastPage = currentPage == 1 || currentPage == totalPages;
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2;
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2;
        
        if(firstAndLastPage || pagesAfterSelectedPage && pagesBeforeSelectedPage){
            if(oldPage && currentPage - oldPage > 2){
                pages.push("...")
            }

            if(oldPage && currentPage - oldPage == 2){
                pages.push(currentPage - 1);
            }

            pages.push(currentPage);
            oldPage = currentPage
        }; 

    };

    return pages;
};

function createPagination(pagination){
    const filter = pagination.dataset.filter;
    const page = +pagination.dataset.page;
    const total = +pagination.dataset.total;
    const pages = paginate(page, total);
    
    let elements = '';
    
    for(let page of pages){
    
        if(String(page).includes("...")) {
            elements+=`<span>${page}</span>`
        } else {
            if(filter){
                elements+=`<a href="?page=${page}&filter=${filter}">${page}</a>`
            } else { 
                elements+=`<a href="?page=${page}">${page}</a>`
            }
        }
    }
    
    pagination.innerHTML = elements;
};

const pagination = document.querySelector(".pagination");

if(pagination){
    createPagination(pagination);
};

// VALIDATOR

const Validator = {
    allFields(e) {
        const fields = document.querySelectorAll('.item input');
        const radioFields = document.querySelector('.item.radio');
        const errorMessage = document.querySelectorAll('.item .error');
        let radio = false;

        if(errorMessage.length > 0) {
            for(error of errorMessage) {
                error.remove();
            }
        }
    
        for(field of fields) {
            if(field.value == '') {
                const message = document.createElement('div');
                message.classList.add('error');
                message.innerHTML = 'Obrigatório*';
                field.parentNode.append(message);
                e.preventDefault();
            }

            if(field.checked) {
                radio = true;
            }
        }

        if(!radio) {
            const message = document.createElement('div');
            message.classList.add('error');
            message.innerHTML = 'Obrigatório*';
            radioFields.append(message);
            e.preventDefault();
        }

        
    }
}






