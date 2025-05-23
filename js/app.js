import { refs } from './refs.js';
import { openApp } from './openApp.js';
import { formValidation } from './validation.js';
import { setTheme } from './theme.js';
import { onCreateButtonClickHandler } from './noteCreate.js';
import { onSaveButtonHandler, saveNotesOnServer } from './saveNote.js';
import { generateNote, checkIfNotesExist } from './generateNotes.js';
import { addEventListenToDeleteAndCancelBtns, 
         addEventListenersToDeleteButtonsOnNotes,
         addeventListenersToNotes
       } from './eventListeners.js';
import { onDeleteButtonHandler, onCancelButtonHandler } from './deleteNote.js';
import { openEditForm, saveEditedNote, closeEditForm } from './editNote.js';
import { searchingByBar, onSearchCloseButtonHandler, showSearchingTools } from './searchNote.js';

// all code!
// const notesFromStorage = localStorage.getItem('notesArr');
// if(notesFromStorage) {
//   generateNote();
// } else {
//   refs.main.startPageContent.style.display = 'flex';
// }

// const clearCategoryButtonsColorStyle = () => {
//   refs.formContainer.tagButton.forEach(tag_button => tag_button.style.color = 'black')
// }

// function chooseTagColors (e) {
//   if(refs.formContainer.prevClickedTagButton) refs.formContainer.prevClickedTagButton.style.color = 'black';

//   e.target.style.color = 'white';
//   refs.formContainer.prevClickedTagButton = e.target;
//   noteObj.tag = e.target.textContent;
// }

// refs.main.createBtn.addEventListener('click', onCreateButtonClickHandler);

// function onCreateButtonClickHandler() {
//   refs.formContainer.formContainer.style.display = 'flex';
//   refs.main.notFoundContent.style.display = 'none';
//   refs.header.searchText.value = '';
//   scrollTo(0, 0);

//   refs.formContainer.tagsBox.removeEventListener('click', chooseTagColors);
//   refs.formContainer.tagsBox.addEventListener('click', chooseTagColors);

//   noteObj.tag = 'Without tag';

//   clearCategoryButtonsColorStyle();

//   refs.formContainer.saveButton.addEventListener('click', onSaveButtonHandler);
//   refs.formContainer.backButton.addEventListener('click', onBackButtonHandler);
// }

// function onBackButtonHandler() {
//   refs.formContainer.formContainer.style.display = 'none';
//   refs.formContainer.noteTitle.classList.remove('emptyInput');
//   refs.formContainer.noteText.classList.remove('emptyInput');
//   refs.header.searchText.value = '';
//   refs.formContainer.saveButton.removeEventListener('click', onBackButtonHandler);
// }

// formValidation(refs.formContainer.noteForm, formInputsArr);

// function onSaveButtonHandler() {
//   if(refs.formContainer.noteTitle.value.trim() && refs.formContainer.noteText.value.trim() !== '') {
//     createNote();
//     saveNotesInLocalStorage();
//     generateNote();
//     addeventListenersToNotes();
//     refs.formContainer.noteTitle.value = '';
//     refs.formContainer.noteText.value = '';
//     refs.formContainer.formContainer.style.display = 'none';
//   } else {
//     formInputsArr.forEach(function(input) {
//       if(input.value.trim() === '') {
//         input.classList.add('emptyInput');
//       }
//     });
//   }
// }

// function createNote() {
//   refs.objectAndArray.noteObj.title = refs.formContainer.noteTitle.value.trim();
//   refs.objectAndArray.noteObj.description = refs.formContainer.noteText.value.trim();
//   refs.objectAndArray.noteObj.id = new Date().getTime();
//   refs.objectAndArray.noteObj.time = new Date().toLocaleTimeString('uk-UA');
//   refs.objectAndArray.noteObj.date = new Date().toLocaleDateString('uk-UA');
// }

// function saveNotesInLocalStorage() {
//   let notesFromStorage = localStorage.getItem('notesArr');
//   if(notesFromStorage) {
//     let notes = JSON.parse(notesFromStorage);
//     notes.push(refs.objectAndArray.noteObj);
//     localStorage.setItem('notesArr', JSON.stringify(notes));
//   } else {
//     refs.objectAndArray.notesArr.push(refs.objectAndArray.noteObj);
//     localStorage.setItem('notesArr', JSON.stringify(refs.objectAndArray.notesArr));
//   }
// }

// function generateNote() {
//   refs.main.startPageContent.style.display = 'none';
//   refs.main.notesWrapper.style.display = 'flex';

//   refs.main.notesWrapper.innerHTML = '';

//   let notesList = JSON.parse(localStorage.getItem('notesArr'));

//   if (!notesList || notesList.length === 0) {
//     refs.main.startPageContent.style.display = 'flex';
//     return;
//   }

//   notesList.forEach(note => {
//     let colorTag = note.tag.toLowerCase();

//     refs.main.notesWrapper.insertAdjacentHTML('afterbegin', 
//       `<div id="${note.id}" class="main__note ${colorTag}">
//         <div class="main__headlineAndButtonWrapper">
//           <h2 class="main__noteHeadline">${note.title}</h2>
//           <button class="main__deleteButton"></button>
//         </div>
//         <div class="main__dateCategory--wrapper">
//           <p class="main__noteDate">${note.date}</p>
//           <p class="main__noteCategory">${note.tag}</p>
//         </div>
//       </div>`);

//       addEventListenersToDeleteButtonsOnNotes();
//   });
// }

// function addEventListenersToDeleteButtonsOnNotes() {
//   main__deleteButton = document.querySelectorAll('.main__deleteButton');
//   main__deleteButton.forEach(button => {
//     button.removeEventListener('click', addEventListenToDeleteAndCancelBtns);
//     button.addEventListener('click', addEventListenToDeleteAndCancelBtns);
//   });
// }

// function addEventListenToDeleteAndCancelBtns(event) {
//   event.stopPropagation();
//   refs.deleteMessageWrapper.deleteMessageWrapper.style.display = 'flex';

//   let noteId = event.target.closest('.main__note').id;
//   let noteElement = document.getElementById(noteId);

//   if(refs.eventHandlers.currentDeleteHandler) refs.deleteMessageWrapper.deleteButton.removeEventListener('click', refs.eventHandlers.currentDeleteHandler);
//   if(refs.eventHandlers.currentCancelHandler) refs.deleteMessageWrapper.cancelButton.removeEventListener('click', refs.eventHandlers.currentCancelHandler);

//   refs.eventHandlers.currentDeleteHandler = () => onDeleteButtonHandler(noteElement);
//   refs.eventHandlers.currentCancelHandler = () => onCancelButtonHandler();

//   refs.deleteMessageWrapper.deleteButton.addEventListener('click', refs.eventHandlers.currentDeleteHandler);
//   refs.deleteMessageWrapper.cancelButton.addEventListener('click', refs.eventHandlers.currentCancelHandler);
// }

// function onDeleteButtonHandler(noteElement) {
//   let notesFromStorage = localStorage.getItem('notesArr');
//   let storageArr = JSON.parse(notesFromStorage);
//   let noteI = storageArr.findIndex(storedNote => storedNote.id === parseInt(noteElement.id));

//   if (noteI !== -1) {
//     storageArr.splice(noteI, 1);
//     localStorage.setItem('notesArr', JSON.stringify(storageArr));
//   }
//   noteElement.remove();
//   refs.deleteMessageWrapper.deleteMessageWrapper.style.display = 'none';

//   if(storageArr.length === 0) {
//     refs.main.startPageContent.style.display = 'flex';
//   }
// }

// function onCancelButtonHandler() {
//   refs.deleteMessageWrapper.deleteMessageWrapper.style.display = 'none';
// }

// addeventListenersToNotes();

// function addeventListenersToNotes() {
//   let notesFromLocalSt = JSON.parse(localStorage.getItem('notesArr'));
//   let notesFromHTML = document.querySelectorAll('.main__note');

//   notesFromHTML.forEach(note => {
//     let noteObject = notesFromLocalSt.find(item => item.id.toString() === note.id);

//     let openFormToEdit = () => openEditForm(noteObject, notesFromLocalSt);
//     if (noteObject) {
//       note.removeEventListener('click', openFormToEdit);
//       note.addEventListener('click', openFormToEdit);
//     }
//   });
// }

// function openEditForm(noteObject, notesFromLocalSt) {
//   scrollTo(0, 0);
//   refs.editFormContainer.editFormContainer.style.display = 'flex';
//   refs.editFormContainer.editTitle.value = noteObject.title;
//   editText.value = noteObject.description;

//   let editForm = document.getElementById('editForm');
//   formValidation(editForm, editFormInputs);

//   if(refs.eventHandlers.currentEditBackHandler) refs.editFormContainer.editBackButton.removeEventListener('click', refs.eventHandlers.currentEditBackHandler);
//   if(refs.eventHandlers.currentEditSaveHandler) refs.editFormContainer.editSaveButton.removeEventListener('click', refs.eventHandlers.currentEditSaveHandler);

//   refs.eventHandlers.currentEditBackHandler = () => closeEditForm();
//   refs.eventHandlers.currentEditSaveHandler = () => saveEditedNote(noteObject, notesFromLocalSt);

//   refs.editFormContainer.editBackButton.addEventListener('click', refs.eventHandlers.currentEditBackHandler);
//   refs.editFormContainer.editSaveButton.addEventListener('click', refs.eventHandlers.currentEditSaveHandler);
// }

// function saveEditedNote(noteObject, notesFromLocalSt) {
//   let currentNotes = JSON.parse(localStorage.getItem('notesArr')) || [];

//   if(refs.editFormContainer.editTitle.value.trim() && editText.value.trim() !== '') {
//     noteObject.title = refs.editFormContainer.editTitle.value.trim();
//     noteObject.description = editText.value.trim();
//     noteObject.time = new Date().toLocaleTimeString('uk-UA');
//     noteObject.date = new Date().toLocaleDateString('uk-UA');

//     let noteIndex = currentNotes.findIndex(item => item.id === noteObject.id);
//     if (noteIndex !== -1) {
//       currentNotes[noteIndex] = noteObject;
//     }
//     localStorage.setItem('notesArr', JSON.stringify(currentNotes));

//     generateNote();
//     addeventListenersToNotes()
//     closeEditForm();
//   } else {
//     editFormInputs.forEach(function(input) {
//       if(input.value.trim() === '') {
//         input.classList.add('emptyInput');
//       }
//     });
//   }
// }

// function closeEditForm() {
//   refs.editFormContainer.editFormContainer.style.display = 'none';
//   refs.editFormContainer.editBackButton.removeEventListener('click', refs.eventHandlers.currentEditBackHandler);
//   refs.editFormContainer.editSaveButton.removeEventListener('click', refs.eventHandlers.currentEditSaveHandler);
// }

// refs.header.searchBtn.addEventListener('click', showSearchingTools);

// function showSearchingTools() {
//   refs.header.searchBtn.style.display = 'none';
//   refs.header.searchBarWrapper.style.display = 'flex';
// }

// refs.header.searchCloseButton.addEventListener('click', function() {
//   refs.header.searchBarWrapper.style.display = 'none';
//   refs.main.notFoundContent.style.display = 'none';
//   refs.header.searchBtn.style.display = 'block';
//   refs.header.searchText.value = '';
//   refs.main.notesWrapper.innerHTML = '';
//   generateNote();
//   addeventListenersToNotes();
// })

// refs.header.searchText.addEventListener('input', searchingByBar);

// function searchingByBar() {
//   let searchWord = refs.header.searchText.value.toLowerCase();
//   let noteList = JSON.parse(localStorage.getItem('notesArr')) || [];

//   refs.main.notesWrapper.innerHTML = '';

//   let foundNotes = noteList.filter(note => 
//     note.title.toLowerCase().includes(searchWord)
//   );

//   if (searchWord === '') {
//     refs.main.notFoundContent.style.display = 'none';
//     refs.main.notesWrapper.innerHTML = '';
//     generateNote();
//     addeventListenersToNotes();
//     return;
//   }

//   if (noteList.length === 0) {
//     refs.main.startPageContent.style.display = 'flex';
//     refs.main.notFoundContent.style.display = 'none';
//     return;
//   }

//   if (foundNotes.length === 0) {
//     refs.main.notFoundContent.style.display = 'flex';
//     refs.main.startPageContent.style.display = 'none';
//     refs.header.searchBtn.style.display = 'block';
//     return;
//   }

//   refs.main.notFoundContent.style.display = 'none';
//   refs.main.startPageContent.style.display = 'none';
//   refs.main.notesWrapper.style.display = 'flex';

//   generateFoundNotes(foundNotes);
//   deleteFoundNotes(foundNotes);
// }

// function generateFoundNotes(foundNotes) {
//   foundNotes.forEach(note => {
//     let colorTag = note.tag.toLowerCase();
//     refs.main.notesWrapper.insertAdjacentHTML(
//       'beforeend',
//       `<div id="${note.id}" class="main__note ${colorTag}">
//         <div class="main__headlineAndButtonWrapper">
//           <h2 class="main__noteHeadline">${note.title}</h2>
//           <button class="main__deleteButton"></button>
//         </div>
//         <div class="main__dateCategory--wrapper">
//           <p class="main__noteDate">${note.date}</p>
//           <p class="main__noteCategory">${note.tag}</p>
//         </div>
//       </div>`
//     );
//   });

//   addeventListenersToNotes();
// }

// function deleteFoundNotes(foundNotes) {
//   foundNotes.forEach(note => {
//     document
//       .getElementById(note.id)
//       .querySelector('.main__deleteButton')
//       .addEventListener('click', event => addEventListenToDeleteAndCancelBtns(event));
//   });
// }

// document.addEventListener('DOMContentLoaded', function() {
//   let savedTheme = localStorage.getItem('theme');

//   if(!savedTheme) {
//     savedTheme = 'dark';
//   }

//   setTheme(savedTheme);
// });

// refs.header.themeButton.addEventListener('click', function() {
//   let currentTheme = document.body.getAttribute('data-theme');

//   let newTheme;

//   if(currentTheme === 'dark') {
//     newTheme = 'light';
//   } else {
//     newTheme = 'dark';
//   }

//   setTheme(newTheme);
// })