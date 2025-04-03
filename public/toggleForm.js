let uploadBtn = document.querySelector(".upload-btn");
let form = document.querySelector(".upload-file-form");
uploadBtn.addEventListener("click", () => {
    form.classList.toggle("visible");
})