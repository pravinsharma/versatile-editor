const canvas = document.getElementById('mainCanvas');
const context = canvas.getContext('2d');

// Initialize lastX, lastY for starting a new stroke
let isDrawing = false;
let lastX, lastY;

// Default color can be set to 'black' or any other initial value
let currentStrokeColor = 'black';

// Add event listeners for buttons to change the stroke color
document.getElementById('toggleColor').addEventListener('click', function () {
  currentStrokeColor = 'red';
});

document.getElementById('toggleColorBlack').addEventListener('click', function () {
  currentStrokeColor = 'black';
});

// Start drawing when mouse is pressed or touch starts
canvas.addEventListener('mousedown', function (e) {
  e.preventDefault();
  // Get the current position relative to the canvas
  const rect = canvas.getBoundingClientRect();
  lastX = e.clientX - rect.left;
  lastY = e.clientY - rect.top;
  isDrawing = true;

  // Set stroke style for the current color
  context.strokeStyle = currentStrokeColor;
});

// Start drawing when touch starts
canvas.addEventListener('touchstart', function (e) {
  e.preventDefault();
  // Get the current position relative to the canvas for touch devices
  const rect = canvas.getBoundingClientRect();
  lastX = e.touches[0].clientX - rect.left;
  lastY = e.touches[0].clientY - rect.top;
  isDrawing = true;

  // Set stroke style for the current color
  context.strokeStyle = currentStrokeColor;
});

// Move and draw during dragging or touching
canvas.addEventListener('mousemove', function (e) {
  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();
  context.beginPath();
  context.moveTo(lastX, lastY);
  context.lineTo(e.clientX - rect.left, e.clientY - rect.top);
  context.stroke();

  // Update the last position to the current mouse or touch position
  lastX = e.clientX - rect.left;
  lastY = e.clientY - rect.top;

  // Ensure stroke style is set for each stroke
  context.strokeStyle = currentStrokeColor;
});

// Stop drawing when mouse is released or touch ends
canvas.addEventListener('mouseup', function () {
  isDrawing = false;
});

canvas.addEventListener('touchend', function (e) {
  e.preventDefault();
  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();
  context.beginPath();
  context.moveTo(lastX, lastY);
  context.lineTo(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
  context.stroke();

  // Reset the last position for a new stroke
  isDrawing = false;
});