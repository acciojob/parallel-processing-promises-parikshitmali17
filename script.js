//your JS code here. If required.
// const output = document.getElementById("output");
// const btn = document.getElementById("download-images-button");
// const loading= document.getElementById("loading");
// const error = document.getElementById("error");

// const images = [
//   { url: "https://picsum.photos/id/237/200/300" },
//   { url: "https://picsum.photos/id/238/200/300" },
//   { url: "https://picsum.photos/id/239/200/300" },
// ];

// let downloadedImg=[];
// let errorPara="";
// let i=0;
// let downloadStart=false;
// function downloadImage(images) {
// 	btn.addEventListner('click',()=>{
// 		downloadStart=true
// 		if(downloadStart){
// 	loading.innerText="Loading"
// }
// 		images.map((image)=>{
// 			fetch(image.url).then((DI)=>{
// 				downloadedImg.push(DI)
// 			}).catch((error)=>{
// 				errorPara=error;
// 				error.appendChild(errorPara)
// 			})
// 			downloadedImg.map((image)=>{
// 				document.output.innerHTML+=`<img src=${image}>`
// 			})
			
// 			downloadStart=false;
			
// 		})
// 	})
// }

const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);  // Resolve when image loads successfully
    img.onerror = () => reject(`Failed to load image: ${url}`); // Reject if image fails to load
  });
}

// Function to download all images
function downloadImages() {
  loading.innerText = "Loading..."; // Show loading message
  errorDiv.innerText = ""; // Clear any previous errors
  output.innerHTML = ""; // Clear previously loaded images

  const imagePromises = images.map(imgObj => downloadImage(imgObj.url));

  Promise.all(imagePromises)
    .then(downloadedImages => {
      loading.innerText = ""; // Hide loading message

      downloadedImages.forEach(img => output.appendChild(img)); // Append images to output div
    })
    .catch(err => {
      loading.innerText = ""; // Hide loading message
      errorDiv.innerText = err; // Display error message
    });
}

// Add event listener to the button
btn.addEventListener("click", downloadImages);



