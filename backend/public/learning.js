const imagesWrapper = document.querySelector(".imagesWrapper");

async function getFiles(){
    let response = await fetch("http://localhost:3000/files");
    let {data} = await response.json();
    console.log(data);
    renderImages(data);
}

function renderImages(data){
    data.forEach(image => {
        imagesWrapper.innerHTML += `
            <div class="col-md-3">
                <img src="${image.file}">Image</a>
            </div>
        `;
    })
}

document.addEventListener("DOMContentLoaded", getFiles);