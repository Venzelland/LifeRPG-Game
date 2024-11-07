canvas.addEventListener('click', (event) => {
    hero.target.x = event.clientX - canvas.getBoundingClientRect().left;
    hero.target.y = event.clientY - canvas.getBoundingClientRect().top;
  });
  
  document.getElementById('inventoryButton').addEventListener('click', () => {
    const inventory = document.getElementById('inventory');
    inventory.style.display = (inventory.style.display === 'none' || inventory.style.display === '') ? 'block' : 'none';
  });
  
  document.getElementById('closeInventory').addEventListener('click', () => {
    document.getElementById('inventory').style.display = 'none';
  });
  
  document.getElementById('medkit').addEventListener('contextmenu', (event) => {
    event.preventDefault(); // предотвращаем стандартное меню контекстного клика
    if (hero.health < hero.maxHealth) {
      hero.health = hero.maxHealth; // восстанавливаем здоровье героя
      alert('Здоровье полностью восстановлено!');
      // Убираем аптечку из инвентаря
      document.getElementById('medkit').style.display = 'none';
    }
  });
  
  function showGameOver() {
    const overlay = document.getElementById('gameOverOverlay');
    overlay.style.display = 'flex';
    hero.health = 0; // Устанавливаем здоровье героя на 0
    // Останавливаем все пули
    heroBullets.length = 0;
    enemyBullets.length = 0;
  }
  