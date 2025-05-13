import { BASE_URL, refs } from './refs.js';
import { addEventListenToDeleteAndCancelBtns } from './eventListeners.js';

export const onDeleteButtonHandler = (noteElement) => {
  let notesFromStorage = localStorage.getItem('notesArr');
  let storageArr = JSON.parse(notesFromStorage);
  let noteI = storageArr.findIndex(storedNote => storedNote.id === noteElement.id);

  if (noteI !== -1) {
    storageArr.splice(noteI, 1);
    localStorage.setItem('notesArr', JSON.stringify(storageArr));
  }
  deleteNoteOnServer(noteElement.id);
  noteElement.remove();
  // refs.deleteMessageWrapper.deleteMessageWrapper.style.display = 'none';

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

export const deleteNoteOnServer = (noteElementId) => {
  fetch(`${BASE_URL}/${noteElementId}`, {
      method: 'DELETE'
    })
    .then((response) => {
      if(!response.ok) {
        throw Error('Something went wrong!')
      }
      return response.json();
    })
    .then((data) => {
        refs.deleteMessageWrapper.deleteMessageWrapper.style.display = 'none';
    })
    .catch((error) => {
      console.log(error);
    })
}