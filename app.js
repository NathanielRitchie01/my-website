// Simple JavaScript example
// This file adds interactivity to your webpage

// Wait for the page to load before running code
document.addEventListener('DOMContentLoaded', () => {
console.log('Page loaded!');


// Example: Add a greeting based on time of day
const greeting = getGreeting();
displayGreeting(greeting);

// Example: Add a button click counter
setupClickCounter();


});

function getGreeting() {
const hour = new Date().getHours();


if (hour < 12) {
    return 'Good morning!';
} else if (hour < 18) {
    return 'Good afternoon!';
} else {
    return 'Good evening!';
}


}

function displayGreeting(message) {
const greetingElement = document.getElementById('greeting');
if (greetingElement) {
greetingElement.textContent = message;
}
}

function setupClickCounter() {
const button = document.getElementById('counter-btn');
const display = document.getElementById('count');
let count = 0;


if (button && display) {
    button.addEventListener('click', () => {
        count++;
        display.textContent = count;
    });
}


}