const heroBullets = [];
const bulletCooldown = 500;

function shootBullet(shooter, targetX, targetY, bulletArray) {
  const angle = Math.atan2(targetY - shooter.y, targetX - shooter.x);
  const bullet = {
    x: shooter.x,
    y: shooter.y,
    radius: 5,
    color: 'yellow',
    dx: Math.cos(angle) * 4,
    dy: Math.sin(angle) * 4
  };
  bulletArray.push(bullet);
}

function updateBullets(bullets, targetArray) {
  bullets.forEach((bullet, bulletIndex) => {
    bullet.x += bullet.dx;
    bullet.y += bullet.dy;

    if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height) {
      bullets.splice(bulletIndex, 1);
    } else {
      targetArray.forEach((target, targetIndex) => {
        const distance = Math.hypot(bullet.x - target.x, bullet.y - target.y);

        if (distance < bullet.radius + target.radius) {
          target.health -= 1;
          bullets.splice(bulletIndex, 1);

          if (target.health <= 0) {
            targetArray.splice(targetIndex, 1);
            if (target === hero) {
              showGameOver();
            }
          }
        }
      });
    }
  });
}

function drawBullets(bullets) {
  bullets.forEach(bullet => {
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
    ctx.fillStyle = bullet.color;
    ctx.fill();
    ctx.closePath();
  });
}
