const modalOverlay = document.querySelector('.modal-overlay');
const courses = document.querySelectorAll('.course');


for (let course of courses) {
    course.querySelector('.course__button').addEventListener("click",() => {
        let courseID = course.getAttribute("id");
        modalOverlay.classList.add('active');
        modalOverlay.querySelector('.modal-content iframe').src = `https://rocketseat.com.br/${courseID}`;
    });
};


modalOverlay.querySelector('.icon-close').addEventListener("click", () => {
    modalOverlay.classList.remove('active');
    modalOverlay.querySelector('.modal-content iframe').src = '';
    modalOverlay.querySelector('.modal').classList.remove('fullscreen');
    modalOverlay.querySelector('.icon-fullscreen').innerHTML = 'fullscreen';
});



modalOverlay.querySelector('.icon-fullscreen').addEventListener("click", () => {
    if (modalOverlay.querySelector('.icon-fullscreen').innerHTML == 'fullscreen'){
        modalOverlay.querySelector('.icon-fullscreen').innerHTML= 'fullscreen_exit';
        modalOverlay.querySelector('.modal').classList.add('fullscreen');
    } else {
        modalOverlay.querySelector('.icon-fullscreen').innerHTML = 'fullscreen';
        modalOverlay.querySelector('.modal').classList.remove('fullscreen');
    }
});

