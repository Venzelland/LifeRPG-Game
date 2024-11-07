const inventoryContainer = document.getElementById('inventory');

export function addItemToInventory(itemName) {
  const item = document.createElement('div');
  item.classList.add('item');
  item.textContent = itemName;
  inventoryContainer.appendChild(item);
}
