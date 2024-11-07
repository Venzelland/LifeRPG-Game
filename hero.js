import { canvas } from './canvas.js';
import { enemies } from './enemy.js';

export const hero = {
  x: 250,
  y: 250,
  radius: 20,
  color: 'blue',
  speed: 3,
  health: 5,
  maxHealth: 5,
  attackRadius: 150,
  target: { x: 250, y: 250 },
  lastShotTime: 0,
  shootInterval: 500 // Интервал выстрелов (0,5 секунды)
};

export const heroBullets = [];

export function updateHeroPosition() {
  const dx = hero.target.x - hero.x;
  const dy = hero.target.y - hero.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > 1) {
    hero.x += (dx / distance) * hero.speed;
    hero.y += (dy / distance) * hero.speed;
  }
}

export function drawHero(ctx) {
  if (hero.health > 0) {
    ctx.beginPath();
    ctx.arc(hero.x, hero.y, hero.radius, 0, Math.PI * 2);
    ctx.fillStyle = hero.color;
    ctx.fill();
    ctx.closePath();
  }
}

export function shootBullet(targetX, targetY) {
  const angle = Math.atan2(targetY - hero.y, targetX - hero.x);
  const bullet = {
    x: hero.x,
    y: hero.y,
    radius: 5,
    color: 'yellow',
    dx: Math.cos(angle) * 4,
    dy: Math.sin(angle) * 4
  };
  heroBullets.push(bullet);
}

export function drawBullets(ctx) {
  heroBullets.forEach((bullet, index) => {
    bullet.x += bullet.dx;
    bullet.y += bullet.dy;

    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
    ctx.fillStyle = bullet.color;
    ctx.fill();
    ctx.closePath();

    if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height) {
      heroBullets.splice(index, 1); // Удаляем пулю, если выходит за границы
    }
  });
}

// Проверка на нахождение врага в радиусе атаки и стрельба
export function checkAndShootEnemies() {
  const currentTime = Date.now();
  for (const enemy of enemies) {
    const distanceToEnemy = Math.hypot(hero.x - enemy.x, hero.y - enemy.y);
    if (distanceToEnemy <= hero.attackRadius && currentTime - hero.lastShotTime > hero.shootInterval) {
      shootBullet(enemy.x, enemy.y); // Стреляем в ближайшего врага
      hero.lastShotTime = currentTime;
      break; // Стреляем только один раз за цикл по ближайшему врагу
    }
  }
}
