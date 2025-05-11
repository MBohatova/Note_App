import { refs } from './refs.js';
import { generateNote } from './generateNotes.js';

export const openApp =() => {
  const notesFromStorage = localStorage.getItem('notesArr');
  if(notesFromStorage) {
    generateNote();
  } else {
    refs.main.startPageContent.style.display = 'flex';
  }
}

openApp();