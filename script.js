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

document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");
  const btn = document.getElementById("download-images-button");
  const loading = document.getElementById("loading");
  const errorDiv = document.getElementById("error");

  const images = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/id/238/200/300",
    "https://picsum.photos/id/239/200/300"
  ];

  function downloadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = () => reject(`Failed to load image: ${url}`);
    });
  }

  function downloadImages() {
    // Clear output to ensure Cypress test starts correctly
    output.innerHTML = "";
    errorDiv.innerText = "";
    loading.innerText = "Loading...";

    // Download images in parallel
    const imagePromises = images.map(url => downloadImage(url));

    Promise.all(imagePromises)
      .then(downloadedImages => {
        loading.innerText = "";
        downloadedImages.forEach(img => output.appendChild(img));
      })
      .catch(err => {
        loading.innerText = "";
        errorDiv.innerText = err;
      });
  }

  btn.addEventListener("click", downloadImages);
});



