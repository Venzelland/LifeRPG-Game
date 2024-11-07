export const canvas = document.getElementById('gameCanvas');
export const ctx = canvas.getContext('2d');

export const searchButton = document.createElement('button');
searchButton.textContent = 'Начать поиски';
searchButton.style.position = 'absolute';
searchButton.style.display = 'none';
document.body.appendChild(searchButton);
