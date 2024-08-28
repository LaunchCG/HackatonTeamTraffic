// Initialize the canvas and context
const canvas = document.getElementById('trafficCanvas');
const ctx = canvas.getContext('2d');

// Car class definition
class Car {
    constructor(x, y, speed, direction, lane) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.direction = direction;
        this.lane = lane;
        this.stopped = false;
    }

    update(horizontalLights, verticalLights, cars) {
        // Check for traffic lights
        const lights = this.lane === 'horizontal' ? horizontalLights : verticalLights;
        for (let light of lights) {
            if (this.lane === 'horizontal' && light.y - 10 < this.y && this.y < light.y + 60) {
                if (this.x + 20 > light.x && this.x < light.x + 20) {
                    if (light.state === 'red') {
                        this.stopped = true;
                        return; // Stop the car if the light is red
                    } else {
                        this.stopped = false;
                    }
                }
            } else if (this.lane === 'vertical' && light.x - 10 < this.x && this.x < light.x + 60) {
                if (this.y + 10 > light.y && this.y < light.y + 20) {
                    if (light.state === 'red') {
                        this.stopped = true;
                        return; // Stop the car if the light is red
                    } else {
                        this.stopped = false;
                    }
                }
            }
        }

        // Check for collisions with other cars
        for (let otherCar of cars) {
            if (otherCar !== this && this.isCollidingWith(otherCar)) {
                this.stopped = true;
                return; // Stop the car if a collision is detected
            }
        }

        this.stopped = false;
        this.x += this.speed * Math.cos(this.direction);
        this.y += this.speed * Math.sin(this.direction);
    }

    isCollidingWith(otherCar) {
        return !(this.x + 20 < otherCar.x || this.x > otherCar.x + 20 || this.y + 10 < otherCar.y || this.y > otherCar.y + 10);
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

// TrafficLight class definition
class TrafficLight {
    constructor(x, y, orientation) {
        this.x = x;
        this.y = y;
        this.orientation = orientation;
        this.state = orientation === 'horizontal' ? 'green' : 'red'; // Initial state
        this.timer = 0;
    }

    update() {
        this.timer++;
        if (this.timer > 100) {
            this.timer = 0;
            if (this.state === 'red') {
                this.state = 'green';
            } else if (this.state === 'green') {
                this.state = 'red';
            }
        }
    }

    draw() {
        ctx.fillStyle = this.state;
        ctx.fillRect(this.x, this.y, 20, 20);
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
    // Horizontal cars
    new Car(100, 75, 2, 0, 'horizontal'),
    new Car(200, 75, 2, 0, 'horizontal'),
    new Car(300, 75, 2, 0, 'horizontal'),
    new Car(400, 75, 2, 0, 'horizontal'),
    new Car(500, 75, 2, 0, 'horizontal'),
    new Car(600, 75, 2, 0, 'horizontal'),
    new Car(100, 225, 2, 0, 'horizontal'),
    new Car(200, 225, 2, 0, 'horizontal'),
    new Car(300, 225, 2, 0, 'horizontal'),
    new Car(400, 225, 2, 0, 'horizontal'),
    new Car(500, 225, 2, 0, 'horizontal'),
    new Car(600, 225, 2, 0, 'horizontal'),
    new Car(100, 375, 2, 0, 'horizontal'),
    new Car(200, 375, 2, 0, 'horizontal'),
    new Car(300, 375, 2, 0, 'horizontal'),
    new Car(400, 375, 2, 0, 'horizontal'),
    new Car(500, 375, 2, 0, 'horizontal'),
    new Car(600, 375, 2, 0, 'horizontal'),
    // Vertical cars
    new Car(175, 100, 2, Math.PI / 2, 'vertical'),
    new Car(175, 200, 2, Math.PI / 2, 'vertical'),
    new Car(175, 300, 2, Math.PI / 2, 'vertical'),
    new Car(175, 400, 2, Math.PI / 2, 'vertical'),
    new Car(175, 500, 2, Math.PI / 2, 'vertical'),
    new Car(175, 600, 2, Math.PI / 2, 'vertical'),
    new Car(375, 100, 2, Math.PI / 2, 'vertical'),
    new Car(375, 200, 2, Math.PI / 2, 'vertical'),
    new Car(375, 300, 2, Math.PI / 2, 'vertical'),
    new Car(375, 400, 2, Math.PI / 2, 'vertical'),
    new Car(375, 500, 2, Math.PI / 2, 'vertical'),
    new Car(375, 600, 2, Math.PI / 2, 'vertical'),
    new Car(575, 100, 2, Math.PI / 2, 'vertical'),
    new Car(575, 200, 2, Math.PI / 2, 'vertical'),
    new Car(575, 300, 2, Math.PI / 2, 'vertical'),
    new Car(575, 400, 2, Math.PI / 2, 'vertical'),
    new Car(575, 500, 2, Math.PI / 2, 'vertical'),
    new Car(575, 600, 2, Math.PI / 2, 'vertical')
];

// Create arrays to hold traffic lights
const horizontalLights = [
    new TrafficLight(140, 40, 'horizontal'), // Top-left corner of the intersection
    new TrafficLight(340, 40, 'horizontal'),
    new TrafficLight(540, 40, 'horizontal'),
    new TrafficLight(140, 190, 'horizontal'),
    new TrafficLight(340, 190, 'horizontal'),
    new TrafficLight(540, 190, 'horizontal'),
    new TrafficLight(140, 340, 'horizontal'),
    new TrafficLight(340, 340, 'horizontal'),
    new TrafficLight(540, 340, 'horizontal')
];

const verticalLights = [
    new TrafficLight(160, 70, 'vertical'), // Bottom-right corner of the intersection
    new TrafficLight(360, 70, 'vertical'),
    new TrafficLight(560, 70, 'vertical'),
    new TrafficLight(160, 220, 'vertical'),
    new TrafficLight(360, 220, 'vertical'),
    new TrafficLight(560, 220, 'vertical'),
    new TrafficLight(160, 370, 'vertical'),
    new TrafficLight(360, 370, 'vertical'),
    new TrafficLight(560, 370, 'vertical')
];

// Update car positions
function updateCars() {
    cars.forEach(car => car.update(horizontalLights, verticalLights, cars));
}

// Update traffic lights
function updateTrafficLights() {
    horizontalLights.forEach(light => light.update());
    verticalLights.forEach(light => light.update());
}

// Draw roads on the canvas
function drawRoads() {
    roads.forEach(road => road.draw());
}

// Draw cars on the canvas
function drawCars() {
    cars.forEach(car => car.draw());
}

// Draw traffic lights on the canvas
function drawTrafficLights() {
    horizontalLights.forEach(light => light.draw());
    verticalLights.forEach(light => light.draw());
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRoads();
    updateTrafficLights();
    updateCars();
    drawCars();
    drawTrafficLights();
    requestAnimationFrame(animate);
}

// Start the animation
animate();