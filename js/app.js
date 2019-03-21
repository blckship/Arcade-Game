// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.speed = 200 * (Math.random() * 5);
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-pink-girl.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    if (this.x > 505) {
        this.x = 0;
        this.speed = 150 * (Math.random() * 10)
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

//Lives in game
var heart = document.querySelector(".hearts");

//Temp Array for lives as they are lost.
var livesUsed = [];

Player.prototype.update = function() {
    allEnemies.forEach(enemy => {
        if (this.y === enemy.y &&
            this.x < enemy.x + 83 &&
            this.x + 83 > enemy.x &&
            this.y < enemy.y + 101 &&
            101 + this.y > enemy.y) {
        	//When collision occurs, remove a life.
            heart.removeChild(heart.lastElementChild);
            //Push a heart into the array.
            livesUsed.push(heart);
            //Reset player to try again.
            this.x = 200;
            this.y = 405;
        }
        //If there are 3 lives in the array, Game is over.
        if (livesUsed.length == 3) {
            alert("You got Friendzone!!!");
            location.reload();
        }
    });
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//define  modal
var modal = document.getElementById(".simpleModal")

var buttonClose = document.getElementsByClassName("closeBtn",closeModal)[0];


buttonClose.addEventListener("click", closeModal);
// close modal and reload
function closeModal() {
    simpleModal.style.display= "none";
    location.reload();
}

// handle input for each keystroke
Player.prototype.handleInput = function(input) {

    if (input == 'left' && this.x > 0) {
        this.x -= 101;
    }

    if (input == 'up' && this.y > 0) {
        this.y -= 83;
    }

    if (input == 'right' && this.x < 400) {
        this.x += 101;
    }

    if (input == 'down' && this.y < 405) {
        this.y += 83;
    }
    if (this.y < 0) {
// open modal
        document.getElementById(".simpleModal");
        simpleModal.setAttribute("style", "display : block");




    }

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(101, 73);
var enemy2 = new Enemy(101, 156);
var enemy3 = new Enemy(101, 239);
var allEnemies = [enemy1, enemy2, enemy3];



// Place the player object in a variable called player
var player = new Player(200, 405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
