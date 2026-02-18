const USER = "Darkrat1";
const REPO = "Darkrat1.github.io";
const BASE_FOLDER = "storage";

const sidebar = document.getElementById("sidebar");
const fileList = document.getElementById("fileList");
const preview = document.getElementById("preview");
const previewImage = document.getElementById("previewImage");
const downloadBtn = document.getElementById("downloadBtn");

let currentFolder = BASE_FOLDER;

async function fetchFolder(path) {
    const res = await fetch(`https://api.github.com/repos/${USER}/${REPO}/contents/${path}`);
    return await res.json();
}

async function loadSidebar() {
    const data = await fetchFolder(BASE_FOLDER);
    sidebar.innerHTML = "";

    data.filter(item => item.type === "dir")
        .forEach(folder => {
            const div = document.createElement("div");
            div.textContent = folder.name;
            div.onclick = () => loadFiles(folder.path);
            sidebar.appendChild(div);
        });
}

async function loadFiles(path) {
    currentFolder = path;
    const data = await fetchFolder(path);
    fileList.innerHTML = "";
    preview.classList.add("hidden");

    data.forEach(item => {
        const div = document.createElement("div");
        div.textContent = item.name;
        div.style.cursor = "pointer";

        if (item.type === "dir") {
            div.onclick = () => loadFiles(item.path);
            div.oncontextmenu = (e) => {
                e.preventDefault();
                downloadFolder(item.path);
            };
        } else {
            div.onclick = () => handleFile(item);
        }

        fileList.appendChild(div);
    });
}

function handleFile(file) {
    const imageTypes = ["png", "jpg", "jpeg", "gif", "webp"];
    const ext = file.name.split(".").pop().toLowerCase();

    if (imageTypes.includes(ext)) {
        preview.classList.remove("hidden");
        previewImage.src = file.download_url;

        downloadBtn.onclick = () => {
            const a = document.createElement("a");
            a.href = file.download_url;
            a.download = file.name;
            a.click();
        };
    } else {
        const a = document.createElement("a");
        a.href = file.download_url;
        a.download = file.name;
        a.click();
    }
}


async function downloadFolder(path) {
    const zip = new JSZip();
    await addFolderToZip(zip, path);
    zip.generateAsync({ type: "blob" }).then(content => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(content);
        a.download = path.split("/").pop() + ".zip";
        a.click();
    });
}

async function addFolderToZip(zip, path) {
    const data = await fetchFolder(path);

    for (const item of data) {
        if (item.type === "dir") {
            await addFolderToZip(zip.folder(item.name), item.path);
        } else {
            const res = await fetch(item.download_url);
            const blob = await res.blob();
            zip.file(item.name, blob);
        }
    }
}

loadSidebar();
loadFiles(BASE_FOLDER);


