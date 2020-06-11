const modelOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card');


for (let card of cards) {
    card.addEventListener("click", () => {
        const videoID = card.getAttribute("id");
        modelOverlay.classList.add('active');
        modelOverlay.querySelector('iframe').src = `https://www.youtube.com.br/embed/${videoID}`;
    });
}

document.querySelector('.modal-close').addEventListener("click", () => {
    modelOverlay.classList.remove('active');
    modelOverlay.querySelector('iframe').src = '';
});

