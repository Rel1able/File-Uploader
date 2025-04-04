

let uploadFileBtn = document.querySelector(".upload-btn");
let uploadFileForm = document.querySelector(".upload-file-form");

let createFolderBtn = document.querySelector(".create-folder-btn");
let createFolderForm = document.querySelector(".create-folder-form");

uploadFileBtn.addEventListener("click", () => {
    createFolderForm.classList.remove("visible")
    uploadFileForm.classList.toggle("visible");

    
})


createFolderBtn.addEventListener("click", () => {
    uploadFileForm.classList.remove("visible");
    createFolderForm.classList.toggle("visible");
})



