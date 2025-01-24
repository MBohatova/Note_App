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
var searchCloseButton = document.querySelector('.header__closeButton'); // Контейнери

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
var searchBarWrapper = document.querySelector('.header__searchBarBox'); // Інпути та інші елементи сторінки

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
var notesFromStorage = localStorage.getItem('notesArr');

if (notesFromStorage) {
  generateNote();
} else {
  startPageContent.style.display = 'inherit';
}

var lastClickedButton = null;

function chooseTag() {
  var activeTag = null;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var tag = _step.value;
      tag.addEventListener('click', function () {
        noteObj.tag = tag.textContent;

        if (activeTag) {
          activeTag.classList.remove('choosenTag');
        }

        tag.classList.add('choosenTag');
        activeTag = tag;
      });
      tag.classList.remove('choosenTag');
      noteObj.tag = 'Without tag';
    };

    for (var _iterator = tagButton[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

createBtn.addEventListener('click', function () {
  editorHeader.style.display = 'inherit';
  noteForm.style.display = 'inherit';
  searchText.style.display = 'none';
  searchCloseButton.style.display = 'none';
  notFoundContent.style.display = 'none';
  searchText.value = '';
  scrollTo(0, 0);
  chooseTag();
  saveButton.addEventListener('click', onSaveButtonHandler);
  backButton.addEventListener('click', onBackButtonHandler);

  function onBackButtonHandler() {
    hideBtns();
    generateNote();
    noteTitle.classList.remove('emptyInput');
    noteText.classList.remove('emptyInput');
    searchText.style.display = 'none';
    searchCloseButton.style.display = 'none';
    searchBtn.style.display = 'inherit';
    searchText.value = '';
    saveButton.removeEventListener('click', onBackButtonHandler);
  }
});

function onSaveButtonHandler() {
  if (noteTitle.value && noteText.value !== '') {
    createNote();
    saveNotesInLocalStorage();
    generateNote();
    clearTextArea();
    editNote();
    noteTitle.classList.remove('emptyInput');
    noteText.classList.remove('emptyInput');
  } else {
    noteTitle.classList.add('emptyInput');
    noteText.classList.add('emptyInput');
  }
}

function createNote() {
  noteObj.title = noteTitle.value;
  noteObj.text = noteText.value;
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
  hideBtns();
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

function hideBtns() {
  editorHeader.style.display = 'none';
  noteForm.style.display = 'none';
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
          editHeader.style.display = 'inherit';
          editForm.style.display = 'inherit';
          editForm.innerHTML = "\n            <input \n                type=\"text\"\n                class=\"main__editTitle\"\n                id=\"editTitle\"\n                value=\"".concat(noteObject.title, "\"\n            >\n            <textarea id=\"editText\" class=\"main__editText\" placeholder=\"Type something...\">").concat(noteObject.text, "</textarea>\n          ");
          var editTitle = document.getElementById('editTitle');
          var editText = document.getElementById('editText');
          editBackButton.removeEventListener('click', closeEditForm);
          editBackButton.addEventListener('click', closeEditForm);
          editSaveButton.removeEventListener('click', saveEditedNote);
          editSaveButton.addEventListener('click', saveEditedNote);

          function saveEditedNote() {
            if (editTitle.value && editText.value !== '') {
              noteObject.title = editTitle.value;
              noteObject.text = editText.value;
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
              editTitle.classList.remove('emptyInput');
              editText.classList.remove('emptyInput');
            } else {
              editTitle.classList.add('emptyInput');
              editText.classList.add('emptyInput');
            }
          }

          function closeEditForm() {
            editHeader.style.display = 'none';
            editForm.style.display = 'none';
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
  searchText.style.display = 'inherit';
  searchCloseButton.style.display = 'inherit';
  searchCloseButton.addEventListener('click', function () {
    searchBarWrapper.style.display = 'none';
    notFoundContent.style.display = 'none';
    searchBtn.style.display = 'inherit';
    searchText.value = '';
    notesWrapper.innerHTML = '';
    generateNote();
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
      searchBtn.style.display = 'inherit';
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