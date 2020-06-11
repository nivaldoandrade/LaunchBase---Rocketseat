const courses = document.querySelectorAll('.course');


for (let course of courses) {
    course.querySelector('.course__button').addEventListener("click",() => {
        let courseID = course.getAttribute("id");       
        window.location.href = `/courses/${courseID}`;
    });
};

document.querySelector('.icon-fullscreen').addEventListener("click",() => {
    document.querySelector('.course-single').style.position = "static";
    document.querySelector('.icon-close').style.visibility = "visible";
});

document.querySelector('.icon-close').addEventListener("click", () => {
    document.querySelector('.course-single').style.position = "relative";
    document.querySelector('.icon-close').style.visibility = "hidden";
});




