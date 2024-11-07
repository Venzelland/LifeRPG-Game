// // Получение элементов и настройка Canvas
// const canvas = document.getElementById('gameCanvas');
// const ctx = canvas.getContext('2d');

// // Инициализация инвентаря
// const inventoryItems = document.getElementById('inventory');
// let isSearching = false; // Флаг процесса поиска
// let searchStartTime = 0; // Время начала поиска
// const searchDuration = 3000; // Длительность поиска (в миллисекундах)

// // Кнопка для начала поиска артефакта
// const searchButton = document.createElement('button');
// searchButton.textContent = 'Начать поиски';
// searchButton.style.position = 'absolute';
// searchButton.style.display = 'none';
// document.body.appendChild(searchButton);

// // Параметры героя
// const hero = {
//   x: 250, // Позиция героя по X
//   y: 250, // Позиция героя по Y
//   radius: 20, // Радиус героя
//   color: 'blue', // Цвет героя
//   speed: 3, // Скорость героя
//   health: 5, // Текущее здоровье героя
//   maxHealth: 5, // Максимальное здоровье героя
//   attackRadius: 150, // Радиус атаки героя
//   target: { x: 250, y: 250 }, // Цель передвижения героя
//   lastShotTime: 0 // Время последнего выстрела
// };

// // база артефактов
// const artifactsDatabase = [
//   { name: 'Артефакт 1', description: 'Описание артефакта 1' },
//   { name: 'Артефакт 2', description: 'Описание артефакта 2' },
//   { name: 'Артефакт 3', description: 'Описание артефакта 3' },
// ];

// // сдучайность для артефактов
// function getRandomArtifact() {
//   const randomIndex = Math.floor(Math.random() * artifactsDatabase.length);
//   return artifactsDatabase[randomIndex];
// }

// // Массивы для хранения врагов и пуль
// const enemies = [];
// const heroBullets = [];
// const enemyBullets = [];
// const bulletCooldown = 500; // Время перезарядки между выстрелами
// const crosses = []; // Хранит позиции врагов, убитых героем (помечены крестиками)

// // Область восстановления здоровья
// const recoveryArea = {
//   x: 100,
//   y: 100,
//   radius: 80,
//   color: 'green',
//   active: true
// };

// // Область артефакта
// const artifactArea = {
//   x: 300,
//   y: 300,
//   radius: 50,
//   color: 'purple',
//   active: true,
//   resource: 3 // Количество доступных артефактов для добычи
// };

// // Область лаборатории
// const labArea = {
//   x: 400,
//   y: 100,
//   radius: 80,
//   color: 'red',
//   active: true
// };

// // Функция создания врагов
// function createEnemies(numEnemies) {
//   for (let i = 0; i < numEnemies; i++) {
//     const enemy = {
//       x: Math.random() * canvas.width,
//       y: Math.random() * canvas.height,
//       radius: 20,
//       color: 'red',
//       speed: 1.5,
//       health: 3,
//       attackRadius: 150,
//       lastShotTime: 0
//     };
//     enemies.push(enemy);
//   }
// }

// // Передвижение героя
// function updateHeroPosition() {
//   const dx = hero.target.x - hero.x;
//   const dy = hero.target.y - hero.y;
//   const distance = Math.sqrt(dx * dx + dy * dy);

//   if (distance > 1) {
//     hero.x += (dx / distance) * hero.speed;
//     hero.y += (dy / distance) * hero.speed;
//   }
// }

// // Отрисовка героя
// function drawHero() {
//   if (hero.health > 0) {
//     ctx.beginPath();
//     ctx.arc(hero.x, hero.y, hero.radius, 0, Math.PI * 2);
//     ctx.fillStyle = hero.color;
//     ctx.fill();
//     ctx.closePath();
//   }
// }

// // Отрисовка врагов
// function drawEnemies() {
//   enemies.forEach(enemy => {
//     ctx.beginPath();
//     ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
//     ctx.fillStyle = enemy.color;
//     ctx.fill();
//     ctx.closePath();
//   });
// }

// // Области и их отрисовка
// function drawRecoveryArea() {
//   if (recoveryArea.active) {
//     ctx.beginPath();
//     ctx.arc(recoveryArea.x, recoveryArea.y, recoveryArea.radius, 0, Math.PI * 2);
//     ctx.fillStyle = 'rgba(0, 255, 0, 0.5)'; // Полупрозрачный зеленый цвет
//     ctx.fill();
//     ctx.closePath();
//   }
// }

// function drawArtifactArea() {
//   if (artifactArea.active) {
//     ctx.beginPath();
//     ctx.arc(artifactArea.x, artifactArea.y, artifactArea.radius, 0, Math.PI * 2);
//     ctx.fillStyle = 'rgba(128, 0, 128, 0.5)'; // Полупрозрачный фиолетовый цвет
//     ctx.fill();
//     ctx.closePath();
//   }
// }


// // Отображение здоровья героя
// function drawHealth() {
//   ctx.font = '16px Arial';
//   ctx.fillStyle = 'black';
//   ctx.textAlign = 'left';
//   ctx.fillText(`Health: ${Math.floor(hero.health)}/${hero.maxHealth}`, 10, canvas.height - 10);
// }

// // Функции выстрелов и пуль
// function shootBullet(shooter, targetX, targetY, bulletArray) {
//   const angle = Math.atan2(targetY - shooter.y, targetX - shooter.x);
//   const bullet = {
//     x: shooter.x,
//     y: shooter.y,
//     radius: 5,
//     color: 'yellow',
//     dx: Math.cos(angle) * 4,
//     dy: Math.sin(angle) * 4
//   };
//   bulletArray.push(bullet);
// }

// // Логика пуль и их взаимодействия с целями
// function updateBullets(bullets, targetArray) {
//   bullets.forEach((bullet, bulletIndex) => {
//     bullet.x += bullet.dx;
//     bullet.y += bullet.dy;

//     if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height) {
//       bullets.splice(bulletIndex, 1);
//     } else {
//       targetArray.forEach((target, targetIndex) => {
//         const distance = Math.hypot(bullet.x - target.x, bullet.y - target.y);

//         if (distance < bullet.radius + target.radius) {
//           target.health -= 1;
//           bullets.splice(bulletIndex, 1);

//           if (target.health <= 0) {
//             targetArray.splice(targetIndex, 1);
//             crosses.push({ x: target.x, y: target.y, radius: 10 });
//             if (target === hero) {
//               showGameOver();
//             }
//           }
//         }
//       });
//     }
//   });
// }

// function drawBullets(bullets) {
//   bullets.forEach(bullet => {
//     ctx.beginPath();
//     ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
//     ctx.fillStyle = bullet.color;
//     ctx.fill();
//     ctx.closePath();
//   });
// }

// function drawCrosses() {
//   crosses.forEach(cross => {
//     ctx.beginPath();
//     ctx.moveTo(cross.x - cross.radius, cross.y - cross.radius);
//     ctx.lineTo(cross.x + cross.radius, cross.y + cross.radius);
//     ctx.moveTo(cross.x + cross.radius, cross.y - cross.radius);
//     ctx.lineTo(cross.x - cross.radius, cross.y + cross.radius);
//     ctx.strokeStyle = 'black';
//     ctx.lineWidth = 2;
//     ctx.stroke();
//   });
// }

// // Проверка радиуса атаки: если враг или герой в пределах радиуса атаки, выполняется выстрел
// function checkAttackRadius() {
//   const currentTime = Date.now();

//   enemies.forEach(enemy => {
//     const distanceToHero = Math.hypot(hero.x - enemy.x, hero.y - enemy.y);

//     if (distanceToHero <= hero.attackRadius && currentTime - hero.lastShotTime > bulletCooldown) {
//       if (hero.health > 0) {
//         shootBullet(hero, enemy.x, enemy.y, heroBullets);
//         hero.lastShotTime = currentTime;
//       }
//     }

//     if (distanceToHero <= enemy.attackRadius && currentTime - enemy.lastShotTime > bulletCooldown) {
//       if (enemy.health > 0) {
//         shootBullet(enemy, hero.x, hero.y, enemyBullets);
//         enemy.lastShotTime = currentTime;
//       }
//     }
//   });
// }

// // Проверка нахождения героя в области восстановления
// function checkRecoveryArea() {
//   const distanceToRecovery = Math.hypot(hero.x - recoveryArea.x, hero.y - recoveryArea.y);
//   if (distanceToRecovery < recoveryArea.radius && hero.health < hero.maxHealth) {
//     hero.health += 0.03; // Восстановление здоровья
//     if (hero.health > hero.maxHealth) {
//       hero.health = hero.maxHealth;
//     }
//   }
// }

// function checkArtifactArea() {
//   const distanceToArtifactArea = Math.hypot(hero.x - artifactArea.x, hero.y - artifactArea.y);

//   if (distanceToArtifactArea < artifactArea.radius && artifactArea.active && artifactArea.resource > 0 && !isSearching) {
//     searchButton.style.display = 'block';
//     searchButton.style.left = `${artifactArea.x + canvas.getBoundingClientRect().left - searchButton.offsetWidth / 2}px`;
//     searchButton.style.top = `${artifactArea.y + canvas.getBoundingClientRect().top - 50}px`;
//   } else {
//     searchButton.style.display = 'none';
//     // Проверка на отсутствие артефактов
//     if (artifactArea.active && artifactArea.resource === 0) {
//       displayMessage('Нечего искать'); // Функция для отображения сообщения
//     }

//     if (isSearching && distanceToArtifactArea >= artifactArea.radius) {
//       isSearching = false;
//     }
//   }
// }

// function displayMessage(message) {
//   ctx.font = '20px Arial';
//   ctx.fillStyle = 'black';
//   ctx.fillText(message, canvas.width / 2 - ctx.measureText(message).width / 2, canvas.height / 2); // Центрируем текст
// }

// // Начало процесса поиска
// searchButton.addEventListener('click', () => {
//   isSearching = true;
//   searchStartTime = Date.now();
//   searchButton.style.display = 'none'; // Скрываем кнопку во время поиска
// });

// // Проверка прогресса поиска и добавление артефакта в инвентарь
// function checkSearchProgress() {
//   if (isSearching) {
//     const elapsedTime = Date.now() - searchStartTime;

//     if (elapsedTime >= searchDuration) {
//       const foundArtifact = getRandomArtifact(); // Получаем случайный артефакт
//       addItemToInventory(foundArtifact.name); // Добавляем имя артефакта в инвентарь
//       console.log(foundArtifact.description); // Выводим описание артефакта в консоль (можно изменить на отображение в UI)
//       artifactArea.resource -= 1; // Уменьшаем количество доступных артефактов

//       if (artifactArea.resource > 0) {
//         searchStartTime = Date.now(); // Перезапуск таймера для следующего артефакта
//       } else {
//         artifactArea.active = false; // Деактивируем область, если ресурсы закончились
//         isSearching = false;
//       }
//     } else {
//       drawSearchAnimation(elapsedTime / searchDuration);
//     }
//   }
// }

// // Анимация процесса поиска (вращающийся круг вокруг героя)
// function drawSearchAnimation(progress) {
//   ctx.beginPath();
//   const angle = progress * Math.PI * 2;
//   const searchCircleRadius = hero.radius + 10; // Радиус круга вокруг героя
//   const x = hero.x + searchCircleRadius * Math.cos(angle);
//   const y = hero.y + searchCircleRadius * Math.sin(angle);
//   ctx.arc(x, y, 5, 0, Math.PI * 2);
//   ctx.fillStyle = 'rgba(255, 215, 0, 0.8)'; // Цвет круга (желтый)
//   ctx.fill();
//   ctx.closePath();
// }

// // Проверка нахождения героя в области лаборатории
// function checkLabArea() {
//   const distanceToLab = Math.hypot(hero.x - labArea.x, hero.y - labArea.y);
//   const labButton = document.getElementById('labButton');
  
//   if (distanceToLab < labArea.radius) {
//     labButton.style.display = 'block';
//   } else {
//     labButton.style.display = 'none';
//     document.getElementById('labInterface').style.display = 'none';
//   }
// }

// // Управление интерфейсом лаборатории
// document.getElementById('closeLab').addEventListener('click', () => {
//   document.getElementById('labInterface').style.display = 'none';
// });

// // // Управление инвентарем
// // document.getElementById('inventoryButton').addEventListener('click', () => {
// //   const inventory = document.getElementById('inventory');
// //   inventory.style.display = (inventory.style.display === 'none' || inventory.style.display === '') ? 'flex' : 'none';
// // });

// // document.getElementById('closeInventory').addEventListener('click', () => {
// //   document.getElementById('inventory').style.display = 'none';
// // });

// // Показать лабораторию при нажатии на кнопку
// document.getElementById('labButton').addEventListener('click', () => {
//   document.getElementById('labInterface').style.display = 'flex';
// });

// // Перемещение героя при клике на канвасе
// canvas.addEventListener('click', (event) => {
//   hero.target.x = event.clientX - canvas.getBoundingClientRect().left;
//   hero.target.y = event.clientY - canvas.getBoundingClientRect().top;
// });

// // Восстановление здоровья героя при использовании аптечки из инвентаря
// document.getElementById('medkit').addEventListener('contextmenu', (event) => {
//   event.preventDefault(); // Отключаем стандартное меню клика
//   if (hero.health < hero.maxHealth) {
//     hero.health = hero.maxHealth; // Восстанавливаем здоровье
//     document.getElementById('medkit').style.display = 'none'; // Убираем аптечку
//   }
// });

// // Отображение экрана окончания игры
// function showGameOver() {
//   const overlay = document.getElementById('gameOverOverlay');
//   overlay.style.display = 'flex';
//   hero.health = 0; // Обнуление здоровья героя
//   heroBullets.length = 0; // Остановка всех пуль
//   enemyBullets.length = 0;
// }

// // Выбор артефактов и их объединение в лаборатории
// let selectedArtifact1 = null;
// let selectedArtifact2 = null;

// document.getElementById('artifactSlot1').addEventListener('click', () => {
//   selectedArtifact1 = 'Выбран артефакт 1'; // Логика выбора артефакта 1
//   document.getElementById('artifactSlot1').textContent = selectedArtifact1;
// });
// document.getElementById('artifactSlot2').addEventListener('click', () => {
//   selectedArtifact2 = 'Выбран артефакт 2'; // Логика выбора артефакта 2
//   document.getElementById('artifactSlot2').textContent = selectedArtifact2;
// });
// document.getElementById('combineButton').addEventListener('click', () => {
//   if (selectedArtifact1 && selectedArtifact2) {
//     alert('Артефакты соединены!'); // Логика для объединения артефактов
//     selectedArtifact1 = null;
//     selectedArtifact2 = null;
//     document.getElementById('artifactSlot1').textContent = 'Выберите артефакт';
//     document.getElementById('artifactSlot2').textContent = 'Выберите артефакт';
//   } else {
//     alert('Выберите два артефакта для соединения.');
//   }
// });

// // Отрисовка области лаборатории
// function drawLabArea() {
//   ctx.beginPath();
//   ctx.arc(labArea.x, labArea.y, labArea.radius, 0, Math.PI * 2);
//   ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
//   ctx.fill();
//   ctx.closePath();
// }

// // Добавление предмета в инвентарь
// function addItemToInventory(itemName) {
//   const newItem = document.createElement('div');
//   newItem.classList.add('item');
//   newItem.textContent = itemName;
//   inventoryItems.appendChild(newItem);
// }

// // Проверка: если герой подбирает предметы у крестиков
// function checkCrossCollection() {
//   crosses.forEach((cross, index) => {
//     const distance = Math.hypot(hero.x - cross.x, hero.y - cross.y);
//     if (distance < hero.radius) {
//       crosses.splice(index, 1); // Удаляем крестик
//       addItemToInventory("Добыча"); // Добавляем добычу в инвентарь
//     }
//   });
// }

// function update() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   updateHeroPosition();
//   updateBullets(heroBullets, enemies);
//   updateBullets(enemyBullets, [hero]);
//   checkAttackRadius();
//   checkRecoveryArea();
//   checkLabArea();
//   checkCrossCollection(); // Проверяем взаимодействие с крестиками
//   checkArtifactArea(); // Проверка области артефакта для отображения кнопки
//   checkSearchProgress(); // Проверка прогресса поиска артефакта

//   drawArtifactArea();
//   drawHero();
//   drawEnemies();
//   drawRecoveryArea();
//   drawLabArea();
//   drawHealth();
//   drawBullets(heroBullets);
//   drawBullets(enemyBullets);
//   drawCrosses(); // Отображаем крестики

//   if (hero.health > 0) {
//     requestAnimationFrame(update);
//   }
// }

// createEnemies(3);
// update();

import { canvas, ctx } from './canvas.js';
import { hero, updateHeroPosition, drawHero, shootBullet, drawBullets } from './hero.js';
import { createEnemies, drawEnemies } from './enemy.js';
import { recoveryArea, artifactArea, labArea, drawArea } from './areas.js';
import { setupLab } from './lab.js';

// Добавляем обработчик клика для передвижения героя и стрельбы
canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  hero.target.x = event.clientX - rect.left;
  hero.target.y = event.clientY - rect.top;

  // Стреляем в направлении клика
  shootBullet(hero.target.x, hero.target.y);
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updateHeroPosition(); // Обновляем позицию героя
  drawHero(ctx);        // Отрисовываем героя
  drawEnemies(ctx);      // Отрисовываем врагов
  drawBullets(ctx);      // Отрисовываем пули героя
  drawBullets(ctx);      // Отрисовываем пули героя
  
  // Отрисовываем области
  drawArea(ctx, recoveryArea);
  drawArea(ctx, artifactArea);
  drawArea(ctx, labArea);
  setupLab(); // Инициализация лаборатории

  requestAnimationFrame(gameLoop);
}

function setupGame() {
  createEnemies(3); // Создаем врагов
}

setupGame();
gameLoop();
