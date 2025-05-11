import { refs } from './refs.js';
import { onCreateButtonClickHandler, createNote } from './noteCreate.js';
import { generateNote } from './generateNotes.js';
import { addEventListenToDeleteAndCancelBtns, 
         addEventListenersToDeleteButtonsOnNotes,
         addeventListenersToNotes
       } from './eventListeners.js';

export const onSaveButtonHandler = () => {
  if(refs.formContainer.noteTitle.value.trim() && refs.formContainer.noteText.value.trim() !== '') {
    createNote();
    saveNotesInLocalStorage();
    generateNote();
    addeventListenersToNotes();
    refs.formContainer.noteTitle.value = '';
    refs.formContainer.noteText.value = '';
    refs.formContainer.formContainer.style.display = 'none';
  } else {
    formInputsArr.forEach(function(input) {
      if(input.value.trim() === '') {
        input.classList.add('emptyInput');
      }
    });
  }
}

export const saveNotesInLocalStorage = () => {
  let notesFromStorage = localStorage.getItem('notesArr');
  if(notesFromStorage) {
    let notes = JSON.parse(notesFromStorage);
    notes.push(refs.objectAndArray.noteObj);
    localStorage.setItem('notesArr', JSON.stringify(notes));
  } else {
    refs.objectAndArray.notesArr.push(refs.objectAndArray.noteObj);
    localStorage.setItem('notesArr', JSON.stringify(refs.objectAndArray.notesArr));
  }
}