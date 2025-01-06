// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {  //part 5: Added functionality to the slideshow in part of the SwapPhoto method
	if(mCurrentIndex >= mImages.length)
	{
		mCurrentIndex = 0;
	}

	if(mCurrentIndex < 0)
	{
		mCurrentIndex = mImages.length - 1;
	}
	
	document.getElementById('photo').src = mImages[mCurrentIndex].img;
	var loc = document.getElementsByClassName('location');
	loc[0].innerHTML = "Location:" + mImages[mCurrentIndex].location;
	var des = document.getElementsByClassName('description');
	des[0].innerHTML = "Description:" + mImages[mCurrentIndex].description;
	var dt = document.getElementsByClassName('date');
	dt[0].innerHTML = "Date:" + mImages[mCurrentIndex].date;

	mLastFrameTime = 0;
	mCurrentIndex += 1;
}

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'images.json';

//part 3-Get JSON File
function fetchJSON()
{
	mRequest.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			mJson = JSON.parse(mRequest.responseText) //part 4
		   document.getElementById("demo").innerHTML = mRequest.responseText;
		}
	};
	mRequest.open("GET", mUrl, true);
	mRequest.send();
}

//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

//part 2
function GalleryImage() {
	//implement me as an object to hold the following data about an image:
		var location
		var description
		var date
		var image
}

