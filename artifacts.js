export const artifactsDatabase = [
    { name: 'Артефакт 1', description: 'Описание артефакта 1' },
    { name: 'Артефакт 2', description: 'Описание артефакта 2' },
    { name: 'Артефакт 3', description: 'Описание артефакта 3' },
  ];
  
  export function getRandomArtifact() {
    const randomIndex = Math.floor(Math.random() * artifactsDatabase.length);
    return artifactsDatabase[randomIndex];
  }
  