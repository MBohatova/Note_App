import { BASE_URL, refs } from './refs.js';
import { onCreateButtonClickHandler, createNote } from './noteCreate.js';
import { generateNote } from './generateNotes.js';
import { addEventListenToDeleteAndCancelBtns, 
         addEventListenersToDeleteButtonsOnNotes,
         addeventListenersToNotes
       } from './eventListeners.js';

export const onSaveButtonHandler = () => {
  if(refs.formContainer.noteTitle.value.trim() && refs.formContainer.noteText.value.trim() !== '') {
    createNote();
    saveNotesOnServer(refs.objectAndArray.noteObj);
  } else {
    formInputsArr.forEach(function(input) {
      if(input.value.trim() === '') {
        input.classList.add('emptyInput');
      }
    });
  }
}

export const saveNotesOnServer = (note) => {
  fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  })
    .then((response) => {
      if(!response.ok) {
        throw Error('Something went wrong!')
      }
      return response.json();
    })
    .then((data) => {
      refs.formContainer.noteTitle.value = '';
      refs.formContainer.noteText.value = '';
      refs.formContainer.formContainer.style.display = 'none';
      note.id = data.id;
      generateNote();
      addeventListenersToNotes();
    })
    .catch((error) => {
      console.log(error);
    })
}