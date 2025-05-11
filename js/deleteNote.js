import { refs } from './refs.js';
import { addEventListenToDeleteAndCancelBtns } from './eventListeners.js';

export const onDeleteButtonHandler = (noteElement) => {
  let notesFromStorage = localStorage.getItem('notesArr');
  let storageArr = JSON.parse(notesFromStorage);
  let noteI = storageArr.findIndex(storedNote => storedNote.id === parseInt(noteElement.id));

  if (noteI !== -1) {
    storageArr.splice(noteI, 1);
    localStorage.setItem('notesArr', JSON.stringify(storageArr));
  }
  noteElement.remove();
  refs.deleteMessageWrapper.deleteMessageWrapper.style.display = 'none';

  if(storageArr.length === 0) {
    refs.main.startPageContent.style.display = 'flex';
  }
}

export const onCancelButtonHandler = () => {
  refs.deleteMessageWrapper.deleteMessageWrapper.style.display = 'none';
}

export const deleteFoundNotes = (foundNotes) => {
  foundNotes.forEach(note => {
    document
      .getElementById(note.id)
      .querySelector('.main__deleteButton')
      .addEventListener('click', event => addEventListenToDeleteAndCancelBtns(event));
  });
}