let playerName;
let playerHealth = 100;
let playerHasFlashlight = false;
let playerInventory = [];
let currentLocation = "forest"; // Initially set to "forest"
let exploredLocations = 0;

// Function to update game text
function updateGameText(text) {
    document.getElementById('game-text').innerText = text;
}

// Function to update choices
function updateChoices(choicesHTML) {
    document.getElementById('choices').innerHTML = choicesHTML;
}

// Function to update inventory display
function updateInventoryDisplay() {
    document.getElementById('inventory').innerText = "Inventory: " + playerInventory.join(", ");
}

// Function to change background image based on current location
function changeBackgroundImage() {
    const gameContainer = document.querySelector('.game-bg');
    if (currentLocation === "forest") {
        gameContainer.style.backgroundImage = "url('images/forest.jpg')";
    } else if (currentLocation === "house") {
        gameContainer.style.backgroundImage = "url('images/house.jpg')";
    }
}

// Function to explore the forest
function exploreForest(direction) {
    if (direction === "left") {
        updateGameText("You hear strange noises coming from the left path. You decide to go right.");
        updateChoices(`
            <button onclick="exploreForest('right')">Go right</button>
        `);
    } else if (direction === "right") {
        updateGameText("You continue down the right path.");
        findFlashlight();
    }
    // Change background image if location has changed
    changeBackgroundImage();
}

// Function to find a flashlight
function findFlashlight() {
    updateGameText("You stumble upon an old abandoned house. Do you want to explore it?");
    updateChoices(`
        <button onclick="exploreHouse(true)">Yes</button>
        <button onclick="exploreHouse(false)">No</button>
    `);
}

// Function to explore the house
function exploreHouse(explore) {
    if (explore) {
        updateGameText("You enter the house and find a flashlight lying on a table.");
        playerHasFlashlight = true;
        playerInventory.push("flashlight");
        updateInventoryDisplay();
        updateChoices(`
            <button onclick="continueGame('forward')">Continue forward</button>
            <button onclick="continueGame('back')">Turn back</button>
        `);
        currentLocation = "house"; // Update current location after exploring the house
    } else {
        updateGameText("You decide to avoid the house and continue deeper into the forest.");
        continueGame('forward');
    }
    changeBackgroundImage(); // Change background image after exploring
}

// Function to continue the game
function continueGame(direction) {
    if (currentLocation === "forest") {
        if (direction === "forward") {
            updateGameText("You push forward, determined to find your way out.");
            exploredLocations++;
            
            if (exploredLocations >= 3) {
                handleEndings();
            } else {
                updateChoices(`
                    <button onclick="exploreForest('left')">Go left</button>
                    <button onclick="exploreForest('right')">Go right</button>
                `);
            }
        } else if (direction === "back") {
            updateGameText("You decide to turn back and try to find another way out.");
            updateChoices(`
                <button onclick="exploreForest('left')">Go left</button>
                <button onclick="exploreForest('right')">Go right</button>
            `);
        }
    } else if (currentLocation === "house") {
        if (direction === "forward") {
            updateGameText("You push forward from the house.");
            updateChoices(`
                <button onclick="exploreForest('left')">Go left</button>
                <button onclick="exploreForest('right')">Go right</button>
            `);
            currentLocation = "forest"; // Assume player goes back to forest
        } else if (direction === "back") {
            updateGameText("You leave the house and find yourself back in the forest.");
            currentLocation = "forest"; // Update current location to the forest
            changeBackgroundImage(); // Change background image to forest
            updateChoices(`
                <button onclick="exploreForest('left')">Go left</button>
                <button onclick="exploreForest('right')">Go right</button>
            `);
        }
    }
}

// Function to handle game endings
function handleEndings() {
    let endingMessage = "";
    if (playerHealth <= 0) {
        endingMessage = "You died alone in the haunted forest.";
    } else if (playerHasFlashlight && currentLocation === "forest") {
        endingMessage = "You successfully escaped the haunted forest with the help of your flashlight!";
    } else {
        endingMessage = "You couldn't escape the haunted forest.";
    }

    // Display the ending message and restart button
    document.getElementById('game-text').innerText = endingMessage;
    document.getElementById('choices').innerHTML = `<button onclick="restartGame()">RESTART</button>`;
}

// Function to restart the game
function restartGame() {
    playerHealth = 100;
    playerHasFlashlight = false;
    playerInventory = [];
    currentLocation = "forest";
    exploredLocations = 0;

    updateGameText("You find yourself in a dark forest. You have to find your way out before it's too late.");
    changeBackgroundImage();
    updateInventoryDisplay();
    updateChoices(`
        <button onclick="exploreForest('left')">Go left</button>
        <button onclick="exploreForest('right')">Go right</button>
    `);
}

// Start the game
updateGameText("You find yourself in a dark forest. You have to find your way out before it's too late.");
changeBackgroundImage(); // Set initial background image based on current location
updateInventoryDisplay(); // Display initial inventory
updateChoices(`
    <button onclick="exploreForest('left')">Go left</button>
    <button onclick="exploreForest('right')">Go right</button>
`);
