import { BASE_URL, refs } from './refs.js';
import { addEventListenToDeleteAndCancelBtns } from './eventListeners.js';
import { checkIfNotesExist } from './generateNotes.js';

export const onDeleteButtonHandler = async (noteElement) => {
  deleteNoteOnServer(noteElement.id);
  noteElement.remove();

 const notes = await checkIfNotesExist();
  if (!notes || notes.length === 0) {
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

export const deleteNoteOnServer = async (noteElementId) => {
  try {
    const response = await fetch(`${BASE_URL}/${noteElementId}`, {
      method: `DELETE`
    });
    if(!response.ok) {
      throw Error('Something went wrong!');
    }
    const data = await response.json();
    refs.deleteMessageWrapper.deleteMessageWrapper.style.display = 'none';

  } catch (error) {
    console.log(error);
  }
}