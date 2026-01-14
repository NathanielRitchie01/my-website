// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Camera position
camera.position.z = 50;

// Create shapes with different geometries
const geometries = [
new THREE.SphereGeometry(0.5, 32, 32),
new THREE.BoxGeometry(0.8, 0.8, 0.8),
new THREE.TetrahedronGeometry(0.6),
new THREE.OctahedronGeometry(0.6),
new THREE.TorusGeometry(0.5, 0.2, 16, 100),
new THREE.ConeGeometry(0.5, 1, 32),
];

// Chaos particles array
const particles = [];
const particleCount = 50;

// Lorenz attractor parameters
const sigma = 10;
const rho = 28;
const beta = 8/3;
const dt = 0.01;

// Create particles
for (let i = 0; i < particleCount; i++) {
const geometry = geometries[Math.floor(Math.random() * geometries.length)];
const material = new THREE.MeshPhongMaterial({
color: 0xffffff,
emissive: 0xffffff,
emissiveIntensity: 0.5,
shininess: 100,
transparent: true,
opacity: 0.8
});


const mesh = new THREE.Mesh(geometry, material);

// Initialize position with some randomness around the attractor
const particle = {
    mesh: mesh,
    x: Math.random() * 2 - 1,
    y: Math.random() * 2 - 1,
    z: Math.random() * 2 - 1,
    hue: Math.random() * 360,
    hueSpeed: Math.random() * 0.5 + 0.2,
    scale: Math.random() * 0.5 + 0.5
};

mesh.scale.set(particle.scale, particle.scale, particle.scale);
scene.add(mesh);
particles.push(particle);


}

// Add multiple lights for better illumination
const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0xff00ff, 1, 100);
pointLight1.position.set(10, 10, 10);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0x00ffff, 1, 100);
pointLight2.position.set(-10, -10, 10);
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0xffff00, 1, 100);
pointLight3.position.set(0, 10, -10);
scene.add(pointLight3);

// Animation variables
let time = 0;

// Animation loop
function animate() {
requestAnimationFrame(animate);

time += 0.01;

// Update each particle using Lorenz attractor equations
particles.forEach((particle, index) => {
    // Lorenz attractor differential equations
    const dx = sigma * (particle.y - particle.x);
    const dy = particle.x * (rho - particle.z) - particle.y;
    const dz = particle.x * particle.y - beta * particle.z;
    
    // Update position
    particle.x += dx * dt;
    particle.y += dy * dt;
    particle.z += dz * dt;
    
    // Scale down the coordinates for better visualization
    particle.mesh.position.x = particle.x * 0.5;
    particle.mesh.position.y = particle.y * 0.5;
    particle.mesh.position.z = particle.z * 0.5;
    
    // Update color with rainbow effect
    particle.hue += particle.hueSpeed;
    if (particle.hue > 360) particle.hue -= 360;
    
    const color = new THREE.Color();
    color.setHSL(particle.hue / 360, 1.0, 0.5);
    particle.mesh.material.color = color;
    particle.mesh.material.emissive = color;
    
    // Rotate the shapes
    particle.mesh.rotation.x += 0.01;
    particle.mesh.rotation.y += 0.01;
});

// Slowly rotate camera around the scene
camera.position.x = Math.sin(time * 0.1) * 50;
camera.position.z = Math.cos(time * 0.1) * 50;
camera.position.y = Math.sin(time * 0.05) * 20;
camera.lookAt(scene.position);

// Animate lights
pointLight1.position.x = Math.sin(time * 0.5) * 20;
pointLight1.position.y = Math.cos(time * 0.3) * 20;

pointLight2.position.x = Math.cos(time * 0.4) * 20;
pointLight2.position.z = Math.sin(time * 0.6) * 20;

renderer.render(scene, camera);


}

// Handle window resize
window.addEventListener('resize', () => {
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animate();