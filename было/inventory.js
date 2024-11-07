document.getElementById('inventoryButton').addEventListener('click', () => {
  const inventory = document.getElementById('inventory');
  inventory.style.display = (inventory.style.display === 'none' || inventory.style.display === '') ? 'block' : 'none';
});

document.getElementById('closeInventory').addEventListener('click', () => {
  document.getElementById('inventory').style.display = 'none';
});

document.getElementById('medkit').addEventListener('contextmenu', (event) => {
  event.preventDefault();
  if (hero.health < hero.maxHealth) {
    hero.health = hero.maxHealth;
    alert('Здоровье полностью восстановлено!');
    document.getElementById('medkit').style.display = 'none';
  }
});
