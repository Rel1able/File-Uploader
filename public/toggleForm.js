let uploadBtn = document.querySelector(".upload-btn");
let form = document.querySelector(".upload-file-form");

let createFolderBtn = document.querySelector(".create-folder-btn");
let createFolderForm = document.querySelector(".create-folder-form");

uploadBtn.addEventListener("click", () => {
    form.classList.toggle("visible");
})


createFolderBtn.addEventListener("click", () => {
    createFolderForm.classList.toggle("visible");
})



