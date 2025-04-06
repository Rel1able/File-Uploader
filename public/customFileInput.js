const file = document.querySelector("#file");
file.addEventListener("change", (e) => {
    const [file] = e.target.files;
    const { name: fileName, size } = file;
    const fileSize = (size / 1000).toFixed(2);
    const fileNameAndSize = `${fileName} - ${fileSize}KB`;
    document.querySelector(".file-name").textContent = fileNameAndSize;
})