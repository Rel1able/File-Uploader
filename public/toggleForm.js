

let uploadFileBtn = document.querySelector(".upload-btn");
let uploadFileForm = document.querySelector(".upload-file-form");



if (uploadFileBtn && uploadFileForm) {
    uploadFileBtn.addEventListener("click", () => {
        
        let createFolderForm = document.querySelector(".create-folder-form");
        if (createFolderForm) {
             createFolderForm.classList.remove("visible")
        }
       
        uploadFileForm.classList.toggle("visible");

    
    })
}

let createFolderBtn = document.querySelector(".create-folder-btn");
let createFolderForm = document.querySelector(".create-folder-form");

if (createFolderBtn && createFolderForm) {
    createFolderBtn.addEventListener("click", () => {
        uploadFileForm.classList.remove("visible");
        createFolderForm.classList.toggle("visible");
    })
}





