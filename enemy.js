import { canvas } from './canvas.js';

export const enemies = [];
export const heroBullets = [];
export const enemyBullets = [];
export const bulletCooldown = 500;

export function createEnemies(numEnemies) {
  for (let i = 0; i < numEnemies; i++) {
    const enemy = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 20,
      color: 'red',
      speed: 1.5,
      health: 3,
      attackRadius: 150,
      lastShotTime: 0
    };
    enemies.push(enemy);
  }
}

export function drawEnemies(ctx) {
  enemies.forEach(enemy => {
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
    ctx.fillStyle = enemy.color;
    ctx.fill();
    ctx.closePath();
  });
}
