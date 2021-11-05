//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
    dragText = dropArea.querySelector("header"),
    button = dropArea.querySelector("button"),
    input = dropArea.querySelector("input");
let file; //this is a global variable and we'll use it inside multiple functions

button.onclick = () => {
    input.click(); //if user click on the button then the input also clicked
}

input.addEventListener("change", function () {
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = this.files[0];
    dropArea.classList.add("active");
    showFile(); //calling function
});


//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault(); //preventing from default behaviour
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event) => {
    event.preventDefault(); //preventing from default behaviour
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = event.dataTransfer.files[0];
    showFile(); //calling function
});

function showFile() {
    let fileType = file.type; //getting selected file type
    //if user selected file is an image file
    let fileReader = new FileReader(); //creating new FileReader object
    fileReader.onload = () => {
        let fileURL = fileReader.result; //passing user file source in fileURL variable
        document.getElementById("modelblock").src = fileURL
    }
    fileReader.readAsDataURL(file);
    document.getElementById("drag-area").style.display = "none"
    document.getElementById("modelblock").style.display = "block"

}

const modelViewer = document.querySelector('model-viewer');
const progress = document.querySelector('#progress');
const bar = progress.querySelector('.bar');

modelViewer.addEventListener('progress', (event) => {
    const { totalProgress } = event.detail;
    progress.classList.toggle('show', totalProgress < 1);
    bar.style.transform = `scaleX(${totalProgress})`;
});

function selected(MouseEvent) {
    if (event.target.nodeName != "BUTTON") {
        if (document.getElementsByClassName("selected")[0]) {
            if (document.getElementsByClassName("fa")[0]) {
                document.getElementsByClassName("fa")[0].remove();
            }
            document.getElementsByClassName("selected")[0].classList.remove("selected");
        }
        document.getElementById("formblock").style.visibility = "collapse"
    }

    // Add active class to the current button (highlight it)
    var header = document.getElementById("modelblock");
    var hotspots = header.getElementsByClassName("hotspot");
    for (var i = 0; i < hotspots.length; i++) {

        hotspots[i].addEventListener("click", function () {
            var current = document.getElementsByClassName("selected");
            if (current.length > 0) {
                if (current[0].children) {
                    if (current[0].children.length > 0) {
                        current[0].children[0].remove();
                    }
                }

                current[0].className = current[0].className.replace(" selected", "");
            }
            document.getElementById("formblock").style.visibility = "visible"
            this.className += " selected";
            var icon = document.createElement("i");
            icon.addEventListener('click', function (event) {
                icon.parentNode.remove();
            })
            icon.classList.add("fa");
            icon.classList.add("fa-trash")
            if (document.getElementsByClassName("selected")[0]) {

                document.getElementsByClassName("selected")[0].prepend(icon)
            }

        });
    }




}

var hotspotCounter = 0;
function addHotspot(MouseEvent) {
    var header = document.getElementById("modelblock");
    var hotspots = header.getElementsByClassName("hotspot");
    for (var i = 0; i < hotspots.length; i++) {
        var current = document.getElementsByClassName("selected");
        if (current.length > 0) {
            current[0].children[0].remove();
            current[0].className = current[0].className.replace(" selected", "");
        }
    }
    document.getElementById("formblock").style.visibility = "visible"

    const viewer = document.querySelector('#modelblock');
    const rect = viewer.getBoundingClientRect();

    const x = event.clientX
    const y = event.clientY
    const positionAndNormal = viewer.positionAndNormalFromPoint(x, y);

    // if the model is not clicked return the position in the console
    if (positionAndNormal == null) {
        console.log('no hit result: mouse = ', x, ', ', y);
        return;
    }
    const { position, normal } = positionAndNormal;

    // create the hotspot
    const hotspot = document.createElement('button');
    hotspot.slot = `hotspot-${hotspotCounter++}`;
    hotspot.classList.add('hotspot');
    hotspot.classList.add('selected');
    hotspot.id = `hotspot-${hotspotCounter}`;
    var icon = document.createElement("i");
    icon.addEventListener('click', function (event) {
        document.getElementsByClassName("selected")[0].remove();
    })
    document.getElementById("formblock").style.visibility = "visible"
    icon.classList.add("fa");
    icon.classList.add("fa-trash")
    hotspot.appendChild(icon)
    hotspot.dataset.position = position.toString();
    if (normal != null) {
        hotspot.dataset.normal = normal.toString();
    }
    viewer.appendChild(hotspot);
    console.log('mouse = ', x, ', ', y, positionAndNormal);


}

function addDescription() {
    var inputtext = document.getElementById('hotspottext').value;
    // adds the text to last hotspot
    if (document.getElementsByClassName(`selected`)[0].children[1]) {
        document.getElementsByClassName(`selected`)[0].children[1].innerHTML = inputtext
    }

    else {
        var element = document.createElement("div");
        element.classList.add('annotation');
        element.appendChild(document.createTextNode(inputtext));
        document.getElementsByClassName(`selected`)[0].appendChild(element);
    }


}



