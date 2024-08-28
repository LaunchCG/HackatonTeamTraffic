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

// Road class definition
class Road {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw() {
        ctx.fillStyle = 'gray';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Create an array to hold roads
const roads = [
    // Horizontal roads
    new Road(50, 50, 700, 50),
    new Road(50, 200, 700, 50),
    new Road(50, 350, 700, 50),
    // Vertical roads
    new Road(150, 0, 50, 600),
    new Road(350, 0, 50, 600),
    new Road(550, 0, 50, 600)
];

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

// Draw roads on the canvas
function drawRoads() {
    roads.forEach(road => road.draw());
}

// Draw cars on the canvas
function drawCars() {
    cars.forEach(car => car.draw());
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRoads();
    updateCars();
    drawCars();
    requestAnimationFrame(animate);
}

// Start the animation
animate();