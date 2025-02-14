// Кнопки
let searchBtn = document.querySelector('.header__searchButton');
let themeButton = document.querySelector('.header__themeButton');
let createBtn = document.querySelector('.main__createButton');
let saveButton = document.querySelector('.header__saveButton');
let backButton = document.querySelector('.header__backButton');
let tagButton = document.querySelectorAll('.tagButton');
let editBackButton = document.querySelector('.header__rewriteBackButton');
let editSaveButton = document.querySelector('.header__rewriteSaveButton');
let deleteButton = document.querySelector('.deleteButton');
let cancelButton = document.querySelector('.cancelButton');
let main__deleteButton;
let searchCloseButton = document.querySelector('.header__closeButton');
let prevClickedTagButton = null;
// Контейнери
let body = document.querySelector('body');
let startPageContent = document.querySelector('.main__emptyContent');
let notFoundContent = document.querySelector('.main__notFoundContent');
let tagsBox = document.querySelector('.main__tagBox');
let noteForm = document.querySelector('.main__form');
let notesWrapper = document.querySelector('.main__notesWrapper');
let editForm = document.querySelector('.main__editForm');
let editHeader = document.querySelector('.header__rewriteEditor');
let deleteMessageWrapper = document.querySelector('.deleteMessageWrapper');
let deleteMessage = document.querySelector('.deleteMessage');
let searchBarWrapper = document.querySelector('.header__searchBarBox');
let formContainer = document.querySelector('.formContainer');
let editFormContainer = document.querySelector('.editFormContainer');
// Інпути та інші елементи сторінки
let noteTitle = document.querySelector('.main__formTitle');
let noteText = document.querySelector('.main__formText');
let searchText = document.querySelector('.header__searchBar');
let headerHeadline = document.querySelector('.header__headline');
let editTitle = document.querySelector('.main__editTitle');
let editTextArea = document.querySelector('.main__editText');
let emptyParagraph = document.querySelector('.main__paragraph');
let notFoundParagraph = document.querySelector('.main__paragraphNotFound');
// Масиви, об'єкти
let noteObj = {};
let notesArr = [];
let formInputsArr = [noteTitle, noteText];
let editFormInputs = [editTitle, editTextArea];
// Обробники подій
let currentDeleteHandler = null;
let currentCancelHandler = null;
let currentEditBackHandler = null;
let currentEditSaveHandler = null;

let notesFromStorage = localStorage.getItem('notesArr');
if(notesFromStorage) {
  generateNote();
} else {
  startPageContent.style.display = 'flex';
}

const clearCategoryButtonsColorStyle = () => {
  tagButton.forEach(tag_button => tag_button.style.color = 'black')
}

function chooseTagColors (e) {
  if(prevClickedTagButton) prevClickedTagButton.style.color = 'black';

  e.target.style.color = 'white';
  prevClickedTagButton = e.target;
  noteObj.tag = e.target.textContent;
}

createBtn.addEventListener('click', function() {
  formContainer.style.display = 'flex';
  notFoundContent.style.display = 'none';
  searchText.value = '';
  scrollTo(0, 0);

  tagsBox.removeEventListener('click', chooseTagColors);
  tagsBox.addEventListener('click', chooseTagColors);

  noteObj.tag = 'Without tag';

  clearCategoryButtonsColorStyle();

  saveButton.addEventListener('click', onSaveButtonHandler);
  backButton.addEventListener('click', onBackButtonHandler);
})

function onBackButtonHandler() {
  formContainer.style.display = 'none';
  noteTitle.classList.remove('emptyInput');
  noteText.classList.remove('emptyInput');
  searchText.value = '';
  saveButton.removeEventListener('click', onBackButtonHandler);
}

function formValidation(form, inputsArr) {
  form.addEventListener('input', function() {
    inputsArr.forEach((input) => input.classList.remove('emptyInput'))
  });
}

formValidation(noteForm, formInputsArr);

function onSaveButtonHandler() {
  if(noteTitle.value.trim() && noteText.value.trim() !== '') {
    createNote();
    saveNotesInLocalStorage();
    generateNote();
    addeventListenersToNotes();
    noteTitle.value = '';
    noteText.value = '';
    formContainer.style.display = 'none';
  } else {
    formInputsArr.forEach(function(input) {
      if(input.value.trim() === '') {
        input.classList.add('emptyInput');
      }
    });
  }
}

function createNote() {
  noteObj.title = noteTitle.value.trim();
  noteObj.description = noteText.value.trim();
  noteObj.id = new Date().getTime();
  noteObj.time = new Date().toLocaleTimeString('uk-UA');
  noteObj.date = new Date().toLocaleDateString('uk-UA');
}

function saveNotesInLocalStorage() {
  let notesFromStorage = localStorage.getItem('notesArr');
  if(notesFromStorage) {
    let notes = JSON.parse(notesFromStorage);
    notes.push(noteObj);
    localStorage.setItem('notesArr', JSON.stringify(notes));
  } else {
    notesArr.push(noteObj);
    localStorage.setItem('notesArr', JSON.stringify(notesArr));
  }
}

function generateNote() {
  startPageContent.style.display = 'none';
  notesWrapper.style.display = 'flex';

  notesWrapper.innerHTML = '';

  let notesList = JSON.parse(localStorage.getItem('notesArr'));

  if (!notesList || notesList.length === 0) {
    startPageContent.style.display = 'flex';
    return;
  }

  notesList.forEach(note => {
    let colorTag = note.tag.toLowerCase();

    notesWrapper.insertAdjacentHTML('afterbegin', 
      `<div id="${note.id}" class="main__note ${colorTag}">
        <div class="main__headlineAndButtonWrapper">
          <h2 class="main__noteHeadline">${note.title}</h2>
          <button class="main__deleteButton"></button>
        </div>
        <div class="main__dateCategory--wrapper">
          <p class="main__noteDate">${note.date}</p>
          <p class="main__noteCategory">${note.tag}</p>
        </div>
      </div>`);

      addEventListenersToDeleteButtonsOnNotes();
  });
}

function addEventListenersToDeleteButtonsOnNotes() {
  main__deleteButton = document.querySelectorAll('.main__deleteButton');
  main__deleteButton.forEach(button => {
    button.removeEventListener('click', addEventListenToDeleteAndCancelBtns);
    button.addEventListener('click', addEventListenToDeleteAndCancelBtns);
  });
}

function addEventListenToDeleteAndCancelBtns(event) {
  event.stopPropagation();
  deleteMessageWrapper.style.display = 'flex';
  centerDeleteMessage();

  let noteId = event.target.closest('.main__note').id;
  let noteElement = document.getElementById(noteId);

  if(currentDeleteHandler) deleteButton.removeEventListener('click', currentDeleteHandler);
  if(currentCancelHandler) cancelButton.removeEventListener('click', currentCancelHandler);

  currentDeleteHandler = () => onDeleteButtonHandler(noteElement);
  currentCancelHandler = () => onCancelButtonHandler();

  deleteButton.addEventListener('click', currentDeleteHandler);
  cancelButton.addEventListener('click', currentCancelHandler);
}

function onDeleteButtonHandler(noteElement) {
  let notesFromStorage = localStorage.getItem('notesArr');
  let storageArr = JSON.parse(notesFromStorage);
  let noteI = storageArr.findIndex(storedNote => storedNote.id === parseInt(noteElement.id));

  if (noteI !== -1) {
    storageArr.splice(noteI, 1);
    localStorage.setItem('notesArr', JSON.stringify(storageArr));
  }
  noteElement.remove();
  deleteMessageWrapper.style.display = 'none';

  if(storageArr.length === 0) {
    startPageContent.style.display = 'flex';
  }
}

function onCancelButtonHandler() {
  deleteMessageWrapper.style.display = 'none';
}

addeventListenersToNotes();

function addeventListenersToNotes() {
  let notesFromLocalSt = JSON.parse(localStorage.getItem('notesArr'));

  let notesFromHTML = document.querySelectorAll('.main__note');

  notesFromHTML.forEach(note => {
    let noteObject = notesFromLocalSt.find(item => item.id.toString() === note.id);
      
    let openFormToEdit = () => openEditForm(noteObject, notesFromLocalSt);
    if (noteObject) {
      note.removeEventListener('click', openFormToEdit);
      note.addEventListener('click', openFormToEdit);
    }
  });
}

function openEditForm(noteObject, notesFromLocalSt) {
  scrollTo(0, 0);
  editFormContainer.style.display = 'flex';
  editTitle.value = noteObject.title;
  editText.value = noteObject.description;

  let editForm = document.getElementById('editForm');
  formValidation(editForm, editFormInputs);

  if(currentEditBackHandler) editBackButton.removeEventListener('click', currentEditBackHandler);
  if(currentEditSaveHandler) editSaveButton.removeEventListener('click', currentEditSaveHandler);

  currentEditBackHandler = () => closeEditForm();
  currentEditSaveHandler = () => saveEditedNote(noteObject, notesFromLocalSt);

  editBackButton.addEventListener('click', currentEditBackHandler);
  editSaveButton.addEventListener('click', currentEditSaveHandler);
}

function saveEditedNote(noteObject, notesFromLocalSt) {
  if(editTitle.value.trim() && editText.value.trim() !== '') {
    noteObject.title = editTitle.value.trim();
    noteObject.description = editText.value.trim();
    noteObject.time = new Date().toLocaleTimeString('uk-UA');
    noteObject.date = new Date().toLocaleDateString('uk-UA');

    let noteIndex = notesFromLocalSt.findIndex(item => item.id === noteObject.id);
    if (noteIndex !== -1) {
      notesFromLocalSt[noteIndex] = noteObject;
    }

    localStorage.setItem('notesArr', JSON.stringify(notesFromLocalSt));

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

function closeEditForm() {
  editFormContainer.style.display = 'none';
  editBackButton.removeEventListener('click', currentEditBackHandler);
  editSaveButton.removeEventListener('click', currentEditSaveHandler);
}

function centerDeleteMessage() {
  let windowWidth = window.innerWidth;
  let messageWidth = deleteMessage.offsetWidth;
  let windowHeight = window.innerHeight;
  let messageHeight = deleteMessage.offsetHeight;

  deleteMessage.style.left = `${(windowWidth - messageWidth) / 2}px`;
    deleteMessage.style.top = `${(windowHeight - messageHeight) / 2}px`

  deleteMessage.scrollIntoView({block: "center", behavior: "smooth"});
}

searchBtn.addEventListener('click', showSearchingTools);

function showSearchingTools() {
  searchBtn.style.display = 'none';
  searchBarWrapper.style.display = 'flex';
}

searchCloseButton.addEventListener('click', function() {
  searchBarWrapper.style.display = 'none';
  notFoundContent.style.display = 'none';
  searchBtn.style.display = 'block';
  searchText.value = '';
  notesWrapper.innerHTML = '';
  generateNote();
  addeventListenersToNotes();
})

searchText.addEventListener('input', searchingByBar);

function searchingByBar() {
  let searchWord = searchText.value.toLowerCase();
  let noteList = JSON.parse(localStorage.getItem('notesArr')) || [];

  notesWrapper.innerHTML = '';

  let foundNotes = noteList.filter(note => 
    note.title.toLowerCase().includes(searchWord)
  );

  if (searchWord === '') {
    notFoundContent.style.display = 'none';
    notesWrapper.innerHTML = '';
    generateNote();
    addeventListenersToNotes();
    return;
  }

  if (noteList.length === 0) {
    startPageContent.style.display = 'flex';
    notFoundContent.style.display = 'none';
    return;
  }

  if (foundNotes.length === 0) {
    notFoundContent.style.display = 'flex';
    startPageContent.style.display = 'none';
    searchBtn.style.display = 'block';
    return;
  }

  notFoundContent.style.display = 'none';
  startPageContent.style.display = 'none';
  notesWrapper.style.display = 'flex';

  foundNotes.forEach(note => {
    let colorTag = note.tag.toLowerCase();
    notesWrapper.insertAdjacentHTML(
      'beforeend',
      `<div id="${note.id}" class="main__note ${colorTag}">
        <div class="main__headlineAndButtonWrapper">
          <h2 class="main__noteHeadline">${note.title}</h2>
          <button class="main__deleteButton"></button>
        </div>
        <div class="main__dateCategory--wrapper">
          <p class="main__noteDate">${note.date}</p>
          <p class="main__noteCategory">${note.tag}</p>
        </div>
      </div>`
    );
  });
  console.log(foundNotes);
  addeventListenersToNotes();
  foundNotes.forEach(note => {
    document
      .getElementById(note.id)
      .querySelector('.main__deleteButton')
      .addEventListener('click', event => addEventListenToDeleteAndCancelBtns(event));
  });
}

function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

document.addEventListener('DOMContentLoaded', function() {
  let savedTheme = localStorage.getItem('theme');

  if(!savedTheme) {
    savedTheme = 'dark';
  }

  setTheme(savedTheme);
});

themeButton.addEventListener('click', function() {
  let currentTheme = document.body.getAttribute('data-theme');

  let newTheme;

  if(currentTheme === 'dark') {
    newTheme = 'light';
  } else {
    newTheme = 'dark';
  }

  setTheme(newTheme);
})