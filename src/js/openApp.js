import { refs } from './refs.js';
import { generateNote, checkIfNotesExist } from './generateNotes.js';

export const openApp = () => {
  checkIfNotesExist().then(notes => {
    if(notes) {
      generateNote();
    } else {
      refs.main.startPageContent.style.display = 'flex';
    }
    scrollTo(0, 0);
  })
}

openApp();