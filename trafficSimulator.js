// Initialize the canvas and context
const canvas = document.getElementById('trafficCanvas');
const ctx = canvas.getContext('2d');

// Car class definition
class Car {
    constructor(x, y, speed, direction) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.direction = direction;
    }

    update() {
        this.x += this.speed * Math.cos(this.direction);
        this.y += this.speed * Math.sin(this.direction);
    }

    draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, 20, 10);
    }
}

// Create an array to hold cars
const cars = [
    new Car(100, 100, 2, 0),
    new Car(200, 200, 2, Math.PI / 4),
    new Car(300, 300, 2, Math.PI / 2)
];

// Update car positions
function updateCars() {
    cars.forEach(car => car.update());
}

// Draw cars on the canvas
function drawCars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cars.forEach(car => car.draw());
}

// Animation loop
function animate() {
    updateCars();
    drawCars();
    requestAnimationFrame(animate);
}

// Start the animation
animate();