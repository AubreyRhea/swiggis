require([
    "dojo/on",
    "esri/map",
    "esri/symbols/PictureMarkerSymbol",
    "esri/graphic", 
	"esri/geometry/Point",
    "esri/InfoTemplate",
    "dojo/domReady!"
], function (
    on,
    Map,
    PictureMarkerSymbol,
    Graphic, 
	Point,
    InfoTemplate
    ) {
        
    var images = {
        0: {
            title: "#13 SB I-35 Upper Deck",
            path: "Images/Capitol 009.JPG",
            location: [-97.727314, 30.283061]
        },
        1: {
            title: "#18 Zilker Clubhouse",
            path: "Images/Capitol 070.JPG",
            location: [-97.779239, 30.270478]
        },
        2: {
            title: "#28 N Congress @ MLK Blvd",
            path: "Images/Capitol 104.JPG",
            location: [-97.737999, 30.280725]
        },
        3: {
            title: "#10 Pleasant Valley @ S Lakeshore",
            path: "Images/Lakeshore 009.JPG",
            location: [-97.717332, 30.243198],
        },
        4: {
            title: "#6 Congress @ 6th St",
            path: "Images/Lemon 006.JPG",
            location: [-97.742814, 30.268052]
        },
        5: {
            title: "#16 E 7th Street Bridge over Texas-New Orleans RR",
            path: "Images/MLK 021.JPG",
            location: [-97.707052, 30.258991]
        },
        6: {
            title: "#23 Robert Mueller Airport",
            path: "Images/Mueller 008.JPG",
            location: [-97.699774, 30.292478],
        },
        7: {
            title: "#22 38th St @ Red River",
            path: "Images/Noodle 016.JPG",
            location: [-97.723506, 30.295442]
        },
        8: {
            title: "#27 LBJ Library",
            path: "Images/Noodle 025.JPG",
            location: [-97.727969, 30.283250]
        }
    }
    

    function PageLoad() {
        var box = document.getElementById("PhotoSelectBox");
        for (var i in images) {
            box[box.length] = new Option(images[i].title, i);
        }
        MoveSelectedPhoto(0);
    }

    function MoveSelectedPhoto(newPhotoIndex) {
        UpdateSelectedPhoto(newPhotoIndex);
		zoomToGraphic(new Point(images[newPhotoIndex].location));
    }
	
	function UpdateSelectedPhoto(PhotoIndex) {
		var photo = document.getElementById("Photo");
        photo.src = images[PhotoIndex].path;

        if (PhotoIndex == 8) {
            photo.width = "510";
            photo.height = "737";
        } else {
            photo.width = "737";
            photo.height = "510";
        }

        var box = document.getElementById("PhotoSelectBox");
        box.selectedIndex = PhotoIndex;

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
        //Object.keys().length might not be intuitive for beginners, but I don't know how else to do it
        MoveSelectedPhoto(Object.keys(images).length - 1);
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
        } else if (photoIndex == Object.keys(images).length - 1) {
            nextButton.disabled = true;
            lastButton.disabled = true;
        }
    }

    var slideIndex = 0
    function PlaySlideshow() {
        MoveSelectedPhoto(slideIndex);
        slideIndex++

        if (slideIndex >= Object.keys(images).length) {
        slideIndex = 0;
        return;
        }

        setTimeout(function () { PlaySlideshow(); }, 2000)
    }

    //Lotsa event handlers
    document.getElementById("NextButton").onclick = function () { MoveNext(); }
    document.getElementById("PreviousButton").onclick = function () { MovePrevious(); }
    document.getElementById("FirstButton").onclick = function () { MoveFirst(); }
    document.getElementById("LastButton").onclick = function () { MoveLast(); }
    document.getElementById("SlideshowButton").onclick = function () { PlaySlideshow(); }
    document.getElementById("PhotoSelectBox").onchange = function () { MoveSelectedPhoto(this.value); }
	
	var options = {
		center: [-97.742581, 30.2837352],
		zoom: 12,
		basemap: "topo"
		};	

    var map = new Map("mapDiv", options);
	
    on(map, "load", function () { loadGraphics(); PageLoad(); });

    var symbol = new PictureMarkerSymbol("Images/camera-icon.png", 20, 20);

    function loadGraphics() {
        for (var i in images) {
            var geometry = new Point(images[i].location);
            var attr = { "index": i,"Image": images[i].title };
            var infoTemplate = new InfoTemplate("Photos", "${Image}");
            var graphic = new Graphic(geometry, symbol, attr, infoTemplate);
            map.graphics.add(graphic);
        }
		
        on(map.graphics, "click", function (e) {
            UpdateSelectedPhoto(e.graphic.attributes.index);
        });
    }

    function zoomToGraphic(point) {
        map.centerAndZoom(point, 16);
    }
});