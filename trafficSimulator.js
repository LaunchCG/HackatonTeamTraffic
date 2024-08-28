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
    }

    update(trafficLights) {
        // Check for traffic lights
        for (let light of trafficLights) {
            if (this.lane === 'horizontal' && light.y - 10 < this.y && this.y < light.y + 60 && light.state === 'red') {
                if (this.x + 20 > light.x && this.x < light.x + 20) {
                    return; // Stop the car if the light is red
                }
            } else if (this.lane === 'vertical' && light.x - 10 < this.x && this.x < light.x + 60 && light.state === 'red') {
                if (this.y + 10 > light.y && this.y < light.y + 20) {
                    return; // Stop the car if the light is red
                }
            }
        }
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

// TrafficLight class definition
class TrafficLight {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.state = 'red'; // Initial state
        this.timer = 0;
    }

    update() {
        this.timer++;
        if (this.timer > 100) {
            this.timer = 0;
            if (this.state === 'red') {
                this.state = 'green';
            } else if (this.state === 'green') {
                this.state = 'yellow';
            } else if (this.state === 'yellow') {
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
    // faster cars (original)
    new Car(100, 75, 2, 0, 'horizontal'), // Car on the first horizontal road
    new Car(200, 225, 2, 0, 'horizontal'), // Car on the second horizontal road
    new Car(300, 375, 2, 0, 'horizontal'), // Car on the third horizontal road
    new Car(175, 100, 2, Math.PI / 2, 'vertical'), // Car on the first vertical road
    new Car(375, 100, 2, Math.PI / 2, 'vertical'), // Car on the second vertical road
    new Car(575, 100, 2, Math.PI / 2, 'vertical'),  // Car on the third vertical road

    // slower cars
    new Car(100, 75, 1, 0, 'horizontal'), // Car on the first horizontal road
    new Car(200, 225, 1, 0, 'horizontal'), // Car on the second horizontal road
    new Car(300, 375, 1, 0, 'horizontal'), // Car on the third horizontal road
    new Car(175, 100, 1, Math.PI / 2, 'vertical'), // Car on the first vertical road
    new Car(375, 100, 1, Math.PI / 2, 'vertical'), // Car on the second vertical road
    new Car(575, 100, 1, Math.PI / 2, 'vertical')  // Car on the third vertical road
];

// Create an array to hold traffic lights
const trafficLights = [
    new TrafficLight(150, 50),
    new TrafficLight(350, 50),
    new TrafficLight(550, 50),
    new TrafficLight(150, 200),
    new TrafficLight(350, 200),
    new TrafficLight(550, 200),
    new TrafficLight(150, 350),
    new TrafficLight(350, 350),
    new TrafficLight(550, 350)
];

// Update car positions
function updateCars() {
    cars.forEach(car => car.update(trafficLights));
}

// Update traffic lights
function updateTrafficLights() {
    trafficLights.forEach(light => light.update());
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
    trafficLights.forEach(light => light.draw());
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