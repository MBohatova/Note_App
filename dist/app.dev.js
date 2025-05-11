"use strict";

// Кнопки
var searchBtn = document.querySelector('.header__searchButton');
var themeButton = document.querySelector('.header__themeButton');
var createBtn = document.querySelector('.main__createButton');
var saveButton = document.querySelector('.header__saveButton');
var backButton = document.querySelector('.header__backButton');
var tagButton = document.querySelectorAll('.tagButton');
var mainButton = document.querySelector('.main__buttonBox');
var editBackButton = document.querySelector('.header__rewriteBackButton');
var editSaveButton = document.querySelector('.header__rewriteSaveButton');
var deleteButton = document.querySelector('.deleteButton');
var cancelButton = document.querySelector('.cancelButton');
var main__deleteButton;
var searchCloseButton = document.querySelector('.header__closeButton');
var prevClickedTagButton = null; // Контейнери

var body = document.querySelector('body');
var startPageContent = document.querySelector('.main__emptyContent');
var notFoundContent = document.querySelector('.main__notFoundContent');
var headerWrapper = document.querySelector('.header__wrapper');
var header = document.querySelector('.header');
var main = document.querySelector('.main');
var tagsBox = document.querySelector('.main__tagBox');
var editorHeader = document.querySelector('.header__editorButtonBox');
var noteForm = document.querySelector('.main__form');
var notesWrapper = document.querySelector('.main__notesWrapper');
var editForm = document.querySelector('.main__editForm');
var editHeader = document.querySelector('.header__rewriteEditor');
var deleteButtonWrapper = document.querySelector('.main__deleteButtonWrapper');
var deleteMessageWrapper = document.querySelector('.deleteMessageWrapper');
var deleteMessage = document.querySelector('.deleteMessage');
var searchBarWrapper = document.querySelector('.header__searchBarBox');
var formContainer = document.querySelector('.formContainer');
var editFormContainer = document.querySelector('.editFormContainer'); // Інпути та інші елементи сторінки

var noteTitle = document.querySelector('.main__formTitle');
var noteText = document.querySelector('.main__formText');
var searchText = document.querySelector('.header__searchBar');
var headerHeadline = document.querySelector('.header__headline');
var editTitle = document.querySelector('.main__editTitle');
var editTextArea = document.querySelector('.main__editText');
var emptyParagraph = document.querySelector('.main__paragraph');
var notFoundParagraph = document.querySelector('.main__paragraphNotFound'); // Масиви, об'єкти

var noteObj = {};
var notesArr = [];
var formInputsArr = [noteTitle, noteText];
var editFormInputs = [editTitle, editTextArea];
var notesFromStorage = localStorage.getItem('notesArr');

if (notesFromStorage) {
  generateNote();
} else {
  startPageContent.style.display = 'inherit';
}

var clearCategoryButtonsColorStyle = function clearCategoryButtonsColorStyle() {
  tagButton.forEach(function (tag_button) {
    return tag_button.style.color = 'black';
  });
};

tagsBox.addEventListener('click', function (e) {
  if (prevClickedTagButton) prevClickedTagButton.style.color = 'black';
  e.target.style.color = 'white';
  prevClickedTagButton = e.target;
  noteObj.tag = e.target.textContent;
});
noteObj.tag = 'Without tag';
createBtn.addEventListener('click', function () {
  formContainer.style.display = 'flex';
  notFoundContent.style.display = 'none';
  searchText.value = '';
  scrollTo(0, 0);
  clearCategoryButtonsColorStyle();
  saveButton.addEventListener('click', onSaveButtonHandler);
  backButton.addEventListener('click', onBackButtonHandler);

  function onBackButtonHandler() {
    formContainer.style.display = 'none';
    noteTitle.classList.remove('emptyInput');
    noteText.classList.remove('emptyInput');
    searchText.value = '';
    saveButton.removeEventListener('click', onBackButtonHandler);
  }
});

// function formValidation(form, inputsArr) {
//   form.addEventListener('input', function () {
//     inputsArr.forEach(function (input) {
//       return input.classList.remove('emptyInput');
//     });
//   });
// }

formValidation(noteForm, formInputsArr);

function onSaveButtonHandler() {
  if (noteTitle.value.trim() && noteText.value.trim() !== '') {
    createNote();
    saveNotesInLocalStorage();
    generateNote();
    clearTextArea();
    editNote();
    formContainer.style.display = 'none';
  } else {
    formInputsArr.forEach(function (input) {
      if (input.value.trim() === '') {
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
  var notesFromStorage = localStorage.getItem('notesArr');

  if (notesFromStorage) {
    var notes = JSON.parse(notesFromStorage);
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
  var notesList = JSON.parse(localStorage.getItem('notesArr'));

  if (!notesList || notesList.length === 0) {
    startPageContent.style.display = 'inherit';
    return;
  }

  notesList.forEach(function (note) {
    var colorTag = note.tag.toLowerCase();
    notesWrapper.insertAdjacentHTML('afterbegin', "<div id=\"".concat(note.id, "\" class=\"main__note ").concat(colorTag, "\">\n        <div class=\"main__headlineAndButtonWrapper\">\n          <h2 class=\"main__noteHeadline\">").concat(note.title, "</h2>\n          <button class=\"main__deleteButton\"></button>\n        </div>\n        <div class=\"main__dateCategory--wrapper\">\n          <p class=\"main__noteDate\">").concat(note.date, "</p>\n          <p class=\"main__noteCategory\">").concat(note.tag, "</p>\n        </div>\n      </div>"));
    main__deleteButton = document.querySelectorAll('.main__deleteButton');
    main__deleteButton.forEach(function (button) {
      button.addEventListener('click', function (event) {
        var noteId = event.target.closest('.main__note').id;
        deleteNote(event, noteId);
      });
    });
  });
}

function clearTextArea() {
  noteTitle.value = '';
  noteText.value = '';
}

editNote();

function editNote() {
  var notesFromLocalSt = JSON.parse(localStorage.getItem('notesArr'));

  function attachEventListeners() {
    var notesFromHTML = document.querySelectorAll('.main__note');
    notesFromHTML.forEach(function (note) {
      var noteObject = notesFromLocalSt.find(function (item) {
        return item.id.toString() === note.id;
      });

      if (noteObject) {
        var openEditForm = function openEditForm() {
          scrollTo(0, 0);
          var editTitle = document.getElementById('editTitle');
          var editText = document.getElementById('editText');
          var editForm = document.getElementById('editForm');
          editFormContainer.style.display = 'flex';
          editTitle.value = noteObject.title;
          editText.value = noteObject.description;
          formValidation(editForm, editFormInputs);
          editBackButton.removeEventListener('click', closeEditForm);
          editBackButton.addEventListener('click', closeEditForm);
          editSaveButton.removeEventListener('click', saveEditedNote);
          editSaveButton.addEventListener('click', saveEditedNote);

          function saveEditedNote() {
            if (editTitle.value.trim() && editText.value.trim() !== '') {
              noteObject.title = editTitle.value.trim();
              noteObject.description = editText.value.trim();
              noteObject.time = new Date().toLocaleTimeString('uk-UA');
              noteObject.date = new Date().toLocaleDateString('uk-UA');
              var noteIndex = notesFromLocalSt.findIndex(function (item) {
                return item.id === noteObject.id;
              });

              if (noteIndex !== -1) {
                notesFromLocalSt[noteIndex] = noteObject;
              }

              localStorage.setItem('notesArr', JSON.stringify(notesFromLocalSt));
              generateNote();
              attachEventListeners();
              closeEditForm();
            } else {
              editFormInputs.forEach(function (input) {
                if (input.value.trim() === '') {
                  input.classList.add('emptyInput');
                }
              });
            }
          }

          function closeEditForm() {
            editFormContainer.style.display = 'none';
            editBackButton.removeEventListener('click', closeEditForm);
            editSaveButton.removeEventListener('click', saveEditedNote);
          }
        };

        note.removeEventListener('click', openEditForm);
        note.addEventListener('click', openEditForm);
      }
    });
  }

  attachEventListeners();
}

function onEditBackButtonHandler() {
  editHeader.style.display = 'none';
  editForm.style.display = 'none';
  editBackButton.removeEventListener('click', onEditBackButtonHandler);
}

function centerDeleteMessage() {
  var windowWidth = window.innerWidth;
  var messageWidth = deleteMessage.offsetWidth;
  var windowHeight = window.innerHeight;
  var messageHeight = deleteMessage.offsetHeight;
  deleteMessage.style.left = "".concat((windowWidth - messageWidth) / 2, "px");
  deleteMessage.style.top = "".concat((windowHeight - messageHeight) / 2, "px");
  deleteMessage.scrollIntoView({
    block: "center",
    behavior: "smooth"
  });
}

function deleteNote(event, noteId) {
  event.stopPropagation();
  deleteMessageWrapper.style.display = 'flex';
  centerDeleteMessage();
  var noteElement = document.getElementById(noteId);
  deleteButton.removeEventListener('click', onDeleteButtonHandler);
  cancelButton.removeEventListener('click', onCancelButtonHandler);
  deleteButton.addEventListener('click', onDeleteButtonHandler);
  cancelButton.addEventListener('click', onCancelButtonHandler);

  function onDeleteButtonHandler() {
    var notesFromStorage = localStorage.getItem('notesArr');
    var storageArr = JSON.parse(notesFromStorage);
    var noteI = storageArr.findIndex(function (storedNote) {
      return storedNote.id === parseInt(noteElement.id);
    });

    if (noteI !== -1) {
      storageArr.splice(noteI, 1);
      localStorage.setItem('notesArr', JSON.stringify(storageArr));
    }

    noteElement.remove();
    var searchWord = searchText.value.toLowerCase();
    var foundNotes = storageArr.filter(function (note) {
      return note.title.toLowerCase().includes(searchWord);
    });

    if (storageArr.length === 0) {
      startPageContent.style.display = 'inherit';
      notFoundContent.style.display = 'none';
      notesWrapper.style.display = 'none';
    } else if (foundNotes.length === 0) {
      startPageContent.style.display = 'none';
      notFoundContent.style.display = 'flex';
      notesWrapper.style.display = 'none';
    } else {
      startPageContent.style.display = 'none';
      notFoundContent.style.display = 'none';
      notesWrapper.style.display = 'flex';
      notesWrapper.innerHTML = '';
      foundNotes.forEach(function (note) {
        var colorTag = note.tag.toLowerCase();
        notesWrapper.insertAdjacentHTML('beforeend', "<div id=\"".concat(note.id, "\" class=\"main__note ").concat(colorTag, "\">\n            <div class=\"main__headlineAndButtonWrapper\">\n              <h2 class=\"main__noteHeadline\">").concat(note.title, "</h2>\n              <button class=\"main__deleteButton\"></button>\n            </div>\n            <div class=\"main__dateCategory--wrapper\">\n              <p class=\"main__noteDate\">").concat(note.date, "</p>\n              <p class=\"main__noteCategory\">").concat(note.tag, "</p>\n            </div>\n          </div>"));
      });
      editNote();
      foundNotes.forEach(function (note) {
        document.getElementById(note.id).querySelector('.main__deleteButton').addEventListener('click', function (event) {
          return deleteNote(event, note.id);
        });
      });
    }

    deleteMessageWrapper.style.display = 'none';
  }

  function onCancelButtonHandler() {
    deleteMessageWrapper.style.display = 'none';
  }
}

searchBtn.addEventListener('click', searching);

function searching() {
  searchBtn.style.display = 'none';
  searchBarWrapper.style.display = 'flex';
  searchText.style.display = 'flex';
  searchCloseButton.style.display = 'block';
  searchCloseButton.addEventListener('click', function () {
    searchBarWrapper.style.display = 'none';
    notFoundContent.style.display = 'none';
    searchBtn.style.display = 'block';
    searchText.value = ''; // notesWrapper.innerHTML = '';
    // generateNote();
  });
  searchText.addEventListener('input', searchingByBar);

  function searchingByBar() {
    var searchWord = searchText.value.toLowerCase();
    var noteList = JSON.parse(localStorage.getItem('notesArr')) || [];
    notesWrapper.innerHTML = '';
    var foundNotes = noteList.filter(function (note) {
      return note.title.toLowerCase().includes(searchWord);
    });

    if (searchWord === '') {
      notFoundContent.style.display = 'none';
      notesWrapper.innerHTML = '';
      searchBtn.style.display = 'block';
      generateNote();
      editNote();
      return;
    }

    if (noteList.length === 0) {
      startPageContent.style.display = 'inherit';
      notFoundContent.style.display = 'none';
      notesWrapper.style.display = 'none';
      searchBtn.style.display = 'inherit';
      return;
    }

    if (foundNotes.length === 0) {
      notFoundContent.style.display = 'flex';
      startPageContent.style.display = 'none';
      notesWrapper.style.display = 'none';
      searchBtn.style.display = 'inherit';
      return;
    }

    notFoundContent.style.display = 'none';
    startPageContent.style.display = 'none';
    notesWrapper.style.display = 'flex';
    searchBtn.style.display = 'inherit';
    foundNotes.forEach(function (note) {
      var colorTag = note.tag.toLowerCase();
      notesWrapper.insertAdjacentHTML('beforeend', "<div id=\"".concat(note.id, "\" class=\"main__note ").concat(colorTag, "\">\n          <div class=\"main__headlineAndButtonWrapper\">\n            <h2 class=\"main__noteHeadline\">").concat(note.title, "</h2>\n            <button class=\"main__deleteButton\"></button>\n          </div>\n          <div class=\"main__dateCategory--wrapper\">\n            <p class=\"main__noteDate\">").concat(note.date, "</p>\n            <p class=\"main__noteCategory\">").concat(note.tag, "</p>\n          </div>\n        </div>"));
    });
    editNote();
    foundNotes.forEach(function (note) {
      document.getElementById(note.id).querySelector('.main__deleteButton').addEventListener('click', function (event) {
        return deleteNote(event, note.id);
      });
    });
  }
}

function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

document.addEventListener('DOMContentLoaded', function () {
  var savedTheme = localStorage.getItem('theme');

  if (!savedTheme) {
    savedTheme = 'dark';
  }

  setTheme(savedTheme);
});
themeButton.addEventListener('click', function () {
  var currentTheme = document.body.getAttribute('data-theme');
  var newTheme;

  if (currentTheme === 'dark') {
    newTheme = 'light';
  } else {
    newTheme = 'dark';
  }

  setTheme(newTheme);
});