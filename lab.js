// Функции и элементы для управления лабораторией
export function setupLab() {
    const labButton = document.getElementById('labButton');
    const labInterface = document.getElementById('labInterface');
    const closeLabButton = document.getElementById('closeLab');
    let selectedArtifact1 = null;
    let selectedArtifact2 = null;
  
    // Добавляем обработчики событий для кнопок лаборатории
    labButton.addEventListener('click', () => {
      labInterface.style.display = 'flex';
    });
  
    closeLabButton.addEventListener('click', () => {
      labInterface.style.display = 'none';
    });
  
    document.getElementById('artifactSlot1').addEventListener('click', () => {
      selectedArtifact1 = 'Выбран артефакт 1';
      document.getElementById('artifactSlot1').textContent = selectedArtifact1;
    });
  
    document.getElementById('artifactSlot2').addEventListener('click', () => {
      selectedArtifact2 = 'Выбран артефакт 2';
      document.getElementById('artifactSlot2').textContent = selectedArtifact2;
    });
  
    document.getElementById('combineButton').addEventListener('click', () => {
      if (selectedArtifact1 && selectedArtifact2) {
        alert('Артефакты соединены!');
        selectedArtifact1 = null;
        selectedArtifact2 = null;
        document.getElementById('artifactSlot1').textContent = 'Выберите артефакт';
        document.getElementById('artifactSlot2').textContent = 'Выберите артефакт';
      } else {
        alert('Выберите два артефакта для соединения.');
      }
    });
  }
  