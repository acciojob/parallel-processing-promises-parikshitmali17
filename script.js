//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading= document.getElementById("loading");
const error = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

let downloadedImg=[];
let errorPara="";
let i=0;
let downloadStart=false;
function downloadImage(images) {
	btn.addEventListner('click',()=>{
		downloadStart=true
		images.map((image)=>{
			fetch(image.url).then((DI)=>{
				downloadedImg.push(DI)
			}).catch((error)=>{
				errorPara=error;
				error.appendChild(errorPara)
			})
			downloadedImg.map((image)=>{
				document.output.innerHTML+=`<img src=${image}>`
			})
			
			downloadStart=false;
		})
	})
}


if(downloadStart){
	loading.innerText="Loading"
}