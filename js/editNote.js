import { refs, elemArrays, BASE_URL } from './refs.js';
import { formValidation } from './validation.js';
import { generateNote } from './generateNotes.js';
import { addeventListenersToNotes } from './eventListeners.js';

export const openEditForm = (noteObject, notesFromServer) => {
  scrollTo(0, 0);

  refs.editFormContainer.editFormContainer.style.display = 'flex';
  refs.editFormContainer.editTitle.value = noteObject.title;
  editText.value = noteObject.description;

  let editForm = document.getElementById('editForm');
  formValidation(editForm, elemArrays.editFormInputs);

  if(refs.eventHandlers.currentEditBackHandler) refs.editFormContainer.editBackButton.removeEventListener('click', refs.eventHandlers.currentEditBackHandler);
  if(refs.eventHandlers.currentEditSaveHandler) refs.editFormContainer.editSaveButton.removeEventListener('click', refs.eventHandlers.currentEditSaveHandler);

  refs.eventHandlers.currentEditBackHandler = () => closeEditForm();
  refs.eventHandlers.currentEditSaveHandler = () => saveEditedNote(noteObject, notesFromServer);

  refs.editFormContainer.editBackButton.addEventListener('click', refs.eventHandlers.currentEditBackHandler);
  refs.editFormContainer.editSaveButton.addEventListener('click', refs.eventHandlers.currentEditSaveHandler);
}

export const saveEditedNote = (noteObject, notesFromServer) => {
  if(refs.editFormContainer.editTitle.value.trim() && editText.value.trim() !== '') {
    noteObject.title = refs.editFormContainer.editTitle.value.trim();
    noteObject.description = editText.value.trim();
    noteObject.time = new Date().toLocaleTimeString('uk-UA');
    noteObject.date = new Date().toLocaleDateString('uk-UA');

    editNoteOnServer(noteObject.id, noteObject);
  } else {
    editFormInputs.forEach((input) => {
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

export const editNoteOnServer = async (noteElementId, editedNote) => {
  try {
    const response = await fetch(`${BASE_URL}/${noteElementId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedNote)
    });
    if(!response.ok) {
      throw Error('Something went wrong!');
    }
    const data = await response.json();
      generateNote();
      addeventListenersToNotes();
      closeEditForm();
  } catch (error) {
    console.log(error);
  }
}