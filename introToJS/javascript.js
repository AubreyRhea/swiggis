var imagePaths = ["Images/Capitol 009.JPG", "Images/Capitol 070.JPG", "Images/Capitol 104.JPG",
                  "Images/Lakeshore 009.JPG", "Images/Lemon 006.JPG", "Images/MLK 021.JPG", "Images/Mueller 008.JPG", "Images/Noodle 016.JPG",
                  "Images/Noodle 025.JPG"];

var imageTitles = ["#13 SB I-35 Upper Deck", "#18 Zilker Clubhouse", "#28 N Congress @ MLK Blvd",
                   "#10 Pleasant Valley @ S Lakeshore", "#6 Congress @ 6th St", "#16 E 7th Street Bridge over Texas-New Orleans RR",
                   "#23 Robert Mueller Airport", "#22 38th St @ Red River", "#27 LBJ Library"];

var imageLocations = [[-97.727314, 30.283061], [-97.779239, 30.270478], [-97.737999, 30.280725], [-97.717332, 30.243198],
    [-97.742814, 30.268052], [-97.707052, 30.258991], [-97.699774, 30.292478], [-97.723506, 30.295442], [-97.727969, 30.283250]];


//on(map, "load", PageLoad());
//PageLoad();
function PageLoad() {
    var box = document.getElementById("PhotoSelectBox");
    for (var i = 0; i < imageTitles.length; ++i) {
        box[box.length] = new Option(imageTitles[i], i);
    }
    MoveSelectedPhoto(0);
}

function MoveSelectedPhoto(newPhotoIndex) {
    var title = document.getElementById("PhotoTitle");
    title.innerText = imageTitles[newPhotoIndex];

    var photo = document.getElementById("Photo");
    photo.src = imagePaths[newPhotoIndex];

    if (newPhotoIndex == 8) {
        photo.width = "510";
        photo.height = "737";
    } else {
        photo.width = "737";
        photo.height = "510";
    }

    var box = document.getElementById("PhotoSelectBox");
    box.selectedIndex = newPhotoIndex;

    EnableNavigationButtons();
}

function MoveFirst() {
    MoveSelectedPhoto(0);
}

function MovePrevious() {
    var box = document.getElementById("PhotoSelectBox");
    var oldPhotoIndex = box.selectedIndex;
    MoveSelectedPhoto(oldPhotoIndex - 1);
}

function MoveNext() {
    var box = document.getElementById("PhotoSelectBox");
    var oldPhotoIndex = box.selectedIndex;
    MoveSelectedPhoto(oldPhotoIndex + 1);
}

function MoveLast() {
    MoveSelectedPhoto(imageTitles.length - 1);
}

function EnableNavigationButtons() {
    var firstButton = document.getElementById("FirstButton");
    var previousButton = document.getElementById("PreviousButton");
    var nextButton = document.getElementById("NextButton");
    var lastButton = document.getElementById("LastButton");

    firstButton.disabled = false;
    previousButton.disabled = false;
    nextButton.disabled = false;
    lastButton.disabled = false;

    var box = document.getElementById("PhotoSelectBox");
    var photoIndex = box.selectedIndex;

    if (photoIndex == 0) {
        firstButton.disabled = true;
        previousButton.disabled = true;
    } else if (photoIndex == imageTitles.length - 1) {
        nextButton.disabled = true;
        lastButton.disabled = true;
    }
}

require(["esri/map", "dojo/domReady!"], function (Map) {
    var map = new Map("mapDiv", {
        center: [-98.5795, 39.8282],
        zoom: 3,
        basemap: "streets"
    });
});