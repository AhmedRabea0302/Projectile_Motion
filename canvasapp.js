// Get the canvas from the DOM
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Get Dom elementes
const cannonImage = document.getElementById('cannon');
const resultBox = document.querySelector('.results');
const starter = document.getElementById('starter');
const reseter = document.getElementById('reseter');

// Get The Sound 
const sound = new Audio("sound.wav"); 

// Cannon Image Object
const cannonObject = {
    width: 80,
    height: 90,
    x: 0, 
    y: 410,
    speed: 5,
    dx: 0,
    dy: 0
}

// Projectile Ball Object
var projectile = {
    x:60,
    y:425,
    r:15,
    v:80,
    theta: 45
};

var frameCount = 0;
// Velocity X 
var velocityX = projectile.v * Math.cos(projectile.theta * Math.PI/180);
// Velocity Y
var velocityY = projectile.v * Math.sin(projectile.theta * Math.PI/180);

var startX = projectile.x;
var startY = projectile.y;

// Gravity Accelaration
var g = 9.8;

function start() {

    setInterval(function() {

        // clear The Canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        // Hide Results Box
        resultBox.style.display = 'none';
        // Run Sound
        sound.play();

        context.save();
        context.fillStyle = '#f5aa00';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.restore();

        // Draw te canon Image.
        context.drawImage(cannonImage, cannonObject.x, cannonObject.y, cannonObject.width, cannonObject.height);

        if(projectile.y<canvas.height - projectile.r && projectile.x < canvas.width - projectile.r)
        {
            projectile.y = startY - ( velocityY * frameCount - (1/2 * g * Math.pow(frameCount,2)) );
            projectile.x = startX + velocityX * frameCount;
        } else {
            // Paus Sound and reset it's time
            sound.pause();
            sound.currentTime = 0;

            // Update Results Box
            updateResult();
        }

        
        // Drawing the projectile Ball Objet
        context.save();
        context.beginPath();
        context.strokeStyle = '#026bb0';
        context.lineWidth = 2;
        context.fillStyle = "#78b517";
        context.arc(projectile.x,projectile.y,projectile.r,0,Math.PI*2,true);
        context.fill();
        context.stroke();
        context.closePath();
        context.restore();
        frameCount+=.1;
        
    }, 1000 / 40);	

    projectile.x = 50;
    projectile.y = 380;
    projectile.v = document.getElementById('velocity').value;
    projectile.theta = document.getElementById('angle').value;
    frameCount = 0;
    velocityX = projectile.v * Math.cos(projectile.theta * Math.PI/180);
    velocityY = projectile.v * Math.sin(projectile.theta * Math.PI/180);
    console.log(velocityX, velocityY);
}

// Shows the distance in X and Y.
function updateResult() {
    resultBox.querySelector('.distanceX').innerText = velocityX.toFixed(2) + ' M';
    resultBox.querySelector('.distanceY').innerText = velocityY.toFixed(2) + ' M';
    resultBox.style.display = 'block';
}

// Resets Velocity and Angle Values.
function resetInputs() {
    document.querySelector('#angle').value = '';;
    document.querySelector('#velocity').value = '';;
}

// Reset Button Action.
reseter.addEventListener('click', function() {
    resetInputs()
});

// Start Button Action.
starter.addEventListener('click', function() {
    start();
});








