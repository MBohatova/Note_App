import { refs, elemArrays } from './refs.js';
import { formValidation } from './validation.js';
import { generateNote } from './generateNotes.js';
import { addEventListenToDeleteAndCancelBtns, 
         addEventListenersToDeleteButtonsOnNotes,
         addeventListenersToNotes
       } from './eventListeners.js';

export const openEditForm = (noteObject, notesFromLocalSt) => {
  scrollTo(0, 0);
  refs.editFormContainer.editFormContainer.style.display = 'flex';
  refs.editFormContainer.editTitle.value = noteObject.title;
  editText.value = noteObject.description;

  let editForm = document.getElementById('editForm');
  formValidation(editForm, elemArrays.editFormInputs);

  if(refs.eventHandlers.currentEditBackHandler) refs.editFormContainer.editBackButton.removeEventListener('click', refs.eventHandlers.currentEditBackHandler);
  if(refs.eventHandlers.currentEditSaveHandler) refs.editFormContainer.editSaveButton.removeEventListener('click', refs.eventHandlers.currentEditSaveHandler);

  refs.eventHandlers.currentEditBackHandler = () => closeEditForm();
  refs.eventHandlers.currentEditSaveHandler = () => saveEditedNote(noteObject, notesFromLocalSt);

  refs.editFormContainer.editBackButton.addEventListener('click', refs.eventHandlers.currentEditBackHandler);
  refs.editFormContainer.editSaveButton.addEventListener('click', refs.eventHandlers.currentEditSaveHandler);
}

export const saveEditedNote = (noteObject, notesFromLocalSt) => {
  let currentNotes = JSON.parse(localStorage.getItem('notesArr')) || [];

  if(refs.editFormContainer.editTitle.value.trim() && editText.value.trim() !== '') {
    noteObject.title = refs.editFormContainer.editTitle.value.trim();
    noteObject.description = editText.value.trim();
    noteObject.time = new Date().toLocaleTimeString('uk-UA');
    noteObject.date = new Date().toLocaleDateString('uk-UA');

    let noteIndex = currentNotes.findIndex(item => item.id === noteObject.id);
    if (noteIndex !== -1) {
      currentNotes[noteIndex] = noteObject;
    }
    localStorage.setItem('notesArr', JSON.stringify(currentNotes));

    generateNote();
    addeventListenersToNotes()
    closeEditForm();
  } else {
    editFormInputs.forEach(function(input) {
      if(input.value.trim() === '') {
        input.classList.add('emptyInput');
      }
    });
  }
}

export const closeEditForm = () => {
  refs.editFormContainer.editFormContainer.style.display = 'none';
  refs.editFormContainer.editBackButton.removeEventListener('click', refs.eventHandlers.currentEditBackHandler);
  refs.editFormContainer.editSaveButton.removeEventListener('click', refs.eventHandlers.currentEditSaveHandler);
}