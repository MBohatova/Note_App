import { refs } from './refs.js';
import { onDeleteButtonHandler, onCancelButtonHandler } from './deleteNote.js';
import { openEditForm } from './editNote.js';
import { checkIfNotesExist } from './generateNotes.js';

export const addEventListenersToDeleteButtonsOnNotes = () => {
  refs.main__deleteButton = document.querySelectorAll('.main__deleteButton');
  refs.main__deleteButton.forEach(button => {
    button.removeEventListener('click', addEventListenToDeleteAndCancelBtns);
    button.addEventListener('click', addEventListenToDeleteAndCancelBtns);
  });
}

export const addEventListenToDeleteAndCancelBtns = (event) => {
  event.stopPropagation();
  refs.deleteMessageWrapper.deleteMessageWrapper.style.display = 'flex';

  let noteId = event.target.closest('.main__note').id;
  let noteElement = document.getElementById(noteId);

  if(refs.eventHandlers.currentDeleteHandler) refs.deleteMessageWrapper.deleteButton.removeEventListener('click', refs.eventHandlers.currentDeleteHandler);
  if(refs.eventHandlers.currentCancelHandler) refs.deleteMessageWrapper.cancelButton.removeEventListener('click', refs.eventHandlers.currentCancelHandler);

  refs.eventHandlers.currentDeleteHandler = () => onDeleteButtonHandler(noteElement);
  refs.eventHandlers.currentCancelHandler = () => onCancelButtonHandler();

  refs.deleteMessageWrapper.deleteButton.addEventListener('click', refs.eventHandlers.currentDeleteHandler);
  refs.deleteMessageWrapper.cancelButton.addEventListener('click', refs.eventHandlers.currentCancelHandler);
}

export const addeventListenersToNotes = () => {
  let notesFromHTML = document.querySelectorAll('.main__note');

  checkIfNotesExist().then((notesFromServer) => {
    if(notesFromServer) {
      notesFromHTML.forEach((note) => {
      const noteObject = notesFromServer.find(item => item.id.toString() === note.id);

        const openFormToEdit = () => openEditForm(noteObject, notesFromServer);
        if (noteObject) {
          note.removeEventListener('click', openFormToEdit);
          note.addEventListener('click', openFormToEdit);
        }
      })
    }
  })
}