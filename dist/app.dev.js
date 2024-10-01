"use strict";

// Кнопки
var searchBtn = document.querySelector('.header__searchButton');
var infoBtn = document.querySelector('.header__infoButton');
var createBtn = document.querySelector('.main__createButton');
var saveButton = document.querySelector('.header__saveButton');
var backButton = document.querySelector('.header__backButton');
var visibilityButton = document.querySelector('.header__visibilityButton');
var tagButton = document.querySelectorAll('.tagButton');
var mainButton = document.querySelector('.main__buttonBox');
var editBackButton = document.querySelector('.header__rewriteBackButton');
var editSaveButton = document.querySelector('.header__rewriteSaveButton');
var deleteButton = document.querySelector('.deleteButton');
var cancelButton = document.querySelector('.cancelButton');
var main__deleteButton;
var searchCloseButton = document.querySelector('.header__closeButton'); // Контейнери

var startPageContent = document.querySelector('.main__emptyContent');
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
var searchBarWrapper = document.querySelector('.header__searchBarBox'); // Масиви, об'єкти

var noteObj = {};
var notesArr = [];
var colors = ['health', 'money', 'plans', 'hobby', 'goals', 'work']; // Інпути та інші елементи сторінки

var noteTitle = document.querySelector('.main__formTitle');
var noteText = document.querySelector('.main__formText');
var searchText = document.querySelector('.header__searchBar');
var notesFromStorage = localStorage.getItem('notesArr');

if (notesFromStorage) {
  generateNote();
} else {
  startPageContent.style.display = 'inherit';
}

createBtn.addEventListener('click', function () {
  editorHeader.style.display = 'inherit';
  noteForm.style.display = 'inherit';
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var tag = _step.value;
      tag.addEventListener('click', function () {
        noteObj.tag = tag.textContent;
      });
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

  saveButton.addEventListener('click', onSaveButtonHandler);
  backButton.addEventListener('click', onBackButtonHandler);

  function onBackButtonHandler() {
    hideBtns();
    saveButton.removeEventListener('click', onBackButtonHandler);
  }
});

function onSaveButtonHandler() {
  createNote();
  saveNotesInLocalStorage();
  generateNote();
  clearTextArea();
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
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = notesList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var note = _step2.value;
      notesWrapper.insertAdjacentHTML('afterbegin', "<div id=\"".concat(note.id, "\" class=\"main__note\">\n        <div class=\"main__headlineAndButtonWrapper\">\n          <h2 class=\"main__noteHeadline\">").concat(note.title, "</h2>\n          <button class=\"main__deleteButton\"></button>\n        </div>\n        <div class=\"main__dateCategory--wrapper\">\n          <p class=\"main__noteDate\">").concat(note.date, "</p>\n          <p class=\"main__noteCategory\">").concat(note.tag, "</p>\n        </div>\n      </div>"));
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  main__deleteButton = document.querySelector('.main__deleteButton');
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
  var notesFromHTML = document.querySelectorAll('.main__note');
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = notesFromHTML[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var note = _step3.value;
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        var _loop2 = function _loop2() {
          var noteObject = _step4.value;

          if (note.id === noteObject.id.toString()) {
            note.addEventListener('click', function () {
              editHeader.style.display = 'inherit';
              editBackButton.addEventListener('click', onEditBackButtonHandler);
              editForm.innerHTML = '';
              editForm.style.display = 'inherit';
              editForm.insertAdjacentHTML('beforeend', "<input \n                type=\"text\"\n                class=\"main__editTitle\"\n                value=\"".concat(noteObject.title, "\"\n              >\n              <textarea class=\"main__editText\" placeholder=\"Type something...\">").concat(noteObject.text, "</textarea>"));
              var editTitle = document.querySelector('.main__editTitle');
              var editText = document.querySelector('.main__editText');
              editSaveButton.addEventListener('click', onEditSaveButtonHandler);

              function onEditSaveButtonHandler() {
                editNoteObj();
                changeNoteVersion();
                editHeader.style.display = 'none';
                editForm.style.display = 'none';
              }

              function editNoteObj() {
                noteObject.title = editTitle.value;
                noteObject.text = editText.value;
                noteObject.time = new Date().toLocaleTimeString('uk-UA');
                noteObject.date = new Date().toLocaleDateString('uk-UA');
              }

              function changeNoteVersion() {
                var noteIndex = notesFromLocalSt.findIndex(function (note) {
                  return note.id === noteObject.id;
                });

                if (noteIndex !== -1) {
                  notesFromLocalSt[noteIndex] = noteObject;
                }

                localStorage.setItem('notesArr', JSON.stringify(notesFromLocalSt));
              }
            });
          }
        };

        for (var _iterator4 = notesFromLocalSt[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          _loop2();
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }
}

function onEditBackButtonHandler() {
  editHeader.style.display = 'none';
  editForm.style.display = 'none';
  editBackButton.removeEventListener('click', onEditBackButtonHandler);
}

main__deleteButton.addEventListener('click', deleteNote);

function deleteNote() {
  deleteMessageWrapper.style.display = 'flex';
  var notesFromHTML = document.querySelector('.main__note');
  var note = document.querySelector('.main__note');
  note.remove();
  deleteButton.removeEventListener('click', onDeleteButtonHandler);
  cancelButton.removeEventListener('click', onCancelButtonHandler);
  deleteButton.addEventListener('click', onDeleteButtonHandler);
  cancelButton.addEventListener('click', onCancelButtonHandler);

  function onDeleteButtonHandler() {
    var notesFromStorage = localStorage.getItem('notesArr');
    var storageArr = JSON.parse(notesFromStorage);
    var noteI = storageArr.findIndex(function (storedNote) {
      return storedNote.id === parseInt(note.id);
    });

    if (noteI !== -1) {
      storageArr.splice(noteI, 1);
    }

    localStorage.setItem('notesArr', JSON.stringify(storageArr));

    if (notesFromHTML.length === 0) {
      startPageContent.style.display = 'inherit';
    }

    deleteMessageWrapper.style.display = 'none';
  }

  function onCancelButtonHandler() {
    deleteMessageWrapper.style.display = 'none';
  }
}

searchBtn.addEventListener('click', searching);

function searching() {
  headerWrapper.style.display = 'none';
  searchBarWrapper.style.display = 'inherit';
  searchCloseButton.addEventListener('click', function () {
    searchText.value = 'Search by the keyword...';
  });
  var noteList = document.querySelectorAll('.main__note');
  var searchWord = searchText.value.toLowerCase();
  var foundNote = null;
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = noteList[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var note = _step5.value;
      var headline = note.querySelector('.main__noteHeadline').textContent.toLowerCase();

      if (headline.includes(searchWord)) {
        foundNote = note;
        break;
      }
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
        _iterator5["return"]();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  if (foundNote) {
    notesWrapper.prepend(foundNote);
  } else {
    console.log('---');
  }
}