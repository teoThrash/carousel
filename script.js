const prism = document.querySelector('.prism');
const images = document.querySelector('.prism img');

const count = images.length
const angle = 360/count;
const radius = 400;

images.forEach((img, i) =>{
	img.style.transform = `rotateY(${i*angle}deg) translateZ(${radius}px)`;
});

let isDown = false;
let startX = 0;
let rotation = 0;

document.addEventListener('mouseup', () => isDown = false);

document.addEventListener('mousemove', e => {
	if(!isDown) return;
	
	const delta = e.clientX - startX;
	rotation += delta*0.3;
	prism.style.transform = `rotateY(${rotation}deg)`;
	startX = e.clientX;
})