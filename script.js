const prism = document.querySelector('.prism');
const images = document.querySelectorAll('.prism img');

const count = images.length
const angle = 360/count;
const radius = 400;

images.forEach((img, i) =>{
	img.style.transform = `rotateY(${i*angle}deg) translateZ(${radius}px)`;
	img.style.pointerEvents = "none";
});

let isDragging = false;
let lastX = 0;
let rotation = 0;
let velocity = 0;

document.addEventListener('mousedown', e => {
	isDragging = true;
	lastX = e.clientX;
	prism.style.cursor = "grabbing";
});

document.addEventListener('mouseup', () => {
	isDragging = false;
	prism.style.cursor = "grab";
});

document.addEventListener('mousemove', e => {
	if(!isDragging) return;
	
	const delta = e.clientX - lastX;
	velocity = delta*0.3;
	rotation += velocity;
	lastX = e.clientX;
});

document.addEventListener('touchstart', e =>{
	isDragging = true;
	lastX = e.touches[0].clientX;
	prism.style.cursor = "grabbing";
	
}, {passive: true});

document.addEventListener('touchend', () =>{
	isDragging = false;
	prism.style.cursor = "grab";
}, {passive: true});

document.addEventListener('touchmove', e=>{
	if(!isDragging) return;
	
	const delta = e.touches[0].clientX - lastX;
	velocity = delta*0.3;
	rotation += velocity;
	lastX = e.touches[0].clientX;
}, {passive: true});

function updateOpacity(){
	images.forEach((img, i) =>{
		const imgAngle = i * (360/images.length) + rotation;
		const rad = (imgAngle * Math.PI) / 180;
		
		const z = Math.cos(rad) * radius;
		
		const fade = 0.3 + 0.7 *((z+radius)/(2*radius));
		img.style.opacity = fade;
	});
}

function animate(){
	if(!isDragging){
		velocity*=0.92
		rotation += velocity;
	}
	
	prism.style.transform = `
	rotateX(-6deg)
	rotateY(${rotation}deg)`;
	
	updateOpacity();
	requestAnimationFrame(animate);
}

animate();

