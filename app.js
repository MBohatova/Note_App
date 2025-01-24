// Кнопки
let searchBtn = document.querySelector('.header__searchButton');
let themeButton = document.querySelector('.header__themeButton');
let createBtn = document.querySelector('.main__createButton');
let saveButton = document.querySelector('.header__saveButton');
let backButton = document.querySelector('.header__backButton');
let tagButton = document.querySelectorAll('.tagButton');
let mainButton = document.querySelector('.main__buttonBox');
let editBackButton = document.querySelector('.header__rewriteBackButton');
let editSaveButton = document.querySelector('.header__rewriteSaveButton');
let deleteButton = document.querySelector('.deleteButton');
let cancelButton = document.querySelector('.cancelButton');
let main__deleteButton;
let searchCloseButton = document.querySelector('.header__closeButton');
// Контейнери
let body = document.querySelector('body');
let startPageContent = document.querySelector('.main__emptyContent');
let notFoundContent = document.querySelector('.main__notFoundContent');
let headerWrapper = document.querySelector('.header__wrapper');
let header = document.querySelector('.header');
let main = document.querySelector('.main');
let tagsBox = document.querySelector('.main__tagBox');
let editorHeader = document.querySelector('.header__editorButtonBox');
let noteForm = document.querySelector('.main__form');
let notesWrapper = document.querySelector('.main__notesWrapper');
let editForm = document.querySelector('.main__editForm');
let editHeader = document.querySelector('.header__rewriteEditor');
let deleteButtonWrapper = document.querySelector('.main__deleteButtonWrapper');
let deleteMessageWrapper = document.querySelector('.deleteMessageWrapper');
let deleteMessage = document.querySelector('.deleteMessage');
let searchBarWrapper = document.querySelector('.header__searchBarBox');
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

let notesFromStorage = localStorage.getItem('notesArr');
if(notesFromStorage) {
  generateNote();
} else {
  startPageContent.style.display = 'inherit';
}

let lastClickedButton = null;

function chooseTag() {
  let activeTag = null;

  for (let tag of tagButton) {
    tag.addEventListener('click', function() {
      noteObj.tag = tag.textContent;

      if(activeTag) {
        activeTag.classList.remove('choosenTag');
      }

      tag.classList.add('choosenTag');
      activeTag = tag;
    });
    tag.classList.remove('choosenTag');
    noteObj.tag = 'Without tag';
  }
}

createBtn.addEventListener('click', function() {
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
})

function onSaveButtonHandler() {
  if(noteTitle.value && noteText.value !== '') {
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
  hideBtns();
  notesWrapper.style.display = 'flex';

  notesWrapper.innerHTML = '';

  let notesList = JSON.parse(localStorage.getItem('notesArr'));

  if (!notesList || notesList.length === 0) {
    startPageContent.style.display = 'inherit';
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

    main__deleteButton = document.querySelectorAll('.main__deleteButton');
    main__deleteButton.forEach(button => {
      button.addEventListener('click', function(event) {
        let noteId = event.target.closest('.main__note').id;
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
  let notesFromLocalSt = JSON.parse(localStorage.getItem('notesArr'));

  function attachEventListeners() {
    let notesFromHTML = document.querySelectorAll('.main__note');

    notesFromHTML.forEach(note => {
      let noteObject = notesFromLocalSt.find(item => item.id.toString() === note.id);

      if (noteObject) {
        note.removeEventListener('click', openEditForm);
        note.addEventListener('click', openEditForm);

        function openEditForm() {
          scrollTo(0, 0);
          editHeader.style.display = 'inherit';
          editForm.style.display = 'inherit';
          editForm.innerHTML = `
            <input 
                type="text"
                class="main__editTitle"
                id="editTitle"
                value="${noteObject.title}"
            >
            <textarea id="editText" class="main__editText" placeholder="Type something...">${noteObject.text}</textarea>
          `;

          let editTitle = document.getElementById('editTitle');
          let editText = document.getElementById('editText');

          editBackButton.removeEventListener('click', closeEditForm);
          editBackButton.addEventListener('click', closeEditForm);

          editSaveButton.removeEventListener('click', saveEditedNote);
          editSaveButton.addEventListener('click', saveEditedNote);

          function saveEditedNote() {
            if(editTitle.value && editText.value !== '') {
              noteObject.title = editTitle.value;
              noteObject.text = editText.value;
              noteObject.time = new Date().toLocaleTimeString('uk-UA');
              noteObject.date = new Date().toLocaleDateString('uk-UA');
  
              let noteIndex = notesFromLocalSt.findIndex(item => item.id === noteObject.id);
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
        }
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
  let windowWidth = window.innerWidth;
  let messageWidth = deleteMessage.offsetWidth;
  let windowHeight = window.innerHeight;
  let messageHeight = deleteMessage.offsetHeight;

  deleteMessage.style.left = `${(windowWidth - messageWidth) / 2}px`;
    deleteMessage.style.top = `${(windowHeight - messageHeight) / 2}px`

  deleteMessage.scrollIntoView({block: "center", behavior: "smooth"});
}

function deleteNote(event, noteId) {
  event.stopPropagation();

  deleteMessageWrapper.style.display = 'flex';
  centerDeleteMessage();

  let noteElement = document.getElementById(noteId);

  deleteButton.removeEventListener('click', onDeleteButtonHandler);
  cancelButton.removeEventListener('click', onCancelButtonHandler);

  deleteButton.addEventListener('click', onDeleteButtonHandler);
  cancelButton.addEventListener('click', onCancelButtonHandler);

  function onDeleteButtonHandler() {
    let notesFromStorage = localStorage.getItem('notesArr');
    let storageArr = JSON.parse(notesFromStorage);
    let noteI = storageArr.findIndex(storedNote => storedNote.id === parseInt(noteElement.id));

    if (noteI !== -1) {
      storageArr.splice(noteI, 1);
      localStorage.setItem('notesArr', JSON.stringify(storageArr));
    }
    noteElement.remove();

    let searchWord = searchText.value.toLowerCase();
    let foundNotes = storageArr.filter(note =>
      note.title.toLowerCase().includes(searchWord)
    );

    if (storageArr.length === 0) {
      startPageContent.style.display = 'inherit';
      notFoundContent.style.display = 'none';
      notesWrapper.style.display = 'none';
    } 
    else if (foundNotes.length === 0) {
      startPageContent.style.display = 'none';
      notFoundContent.style.display = 'flex';
      notesWrapper.style.display = 'none';
    }
     else {
      startPageContent.style.display = 'none';
      notFoundContent.style.display = 'none';
      notesWrapper.style.display = 'flex';
      notesWrapper.innerHTML = '';
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

      editNote();
      foundNotes.forEach(note => {
        document
          .getElementById(note.id)
          .querySelector('.main__deleteButton')
          .addEventListener('click', event => deleteNote(event, note.id));
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

  searchCloseButton.addEventListener('click', function() {
    searchBarWrapper.style.display = 'none';
    notFoundContent.style.display = 'none';
    searchBtn.style.display = 'inherit';
    searchText.value = '';
    notesWrapper.innerHTML = '';
    generateNote();
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

    editNote();
    foundNotes.forEach(note => {
      document
        .getElementById(note.id)
        .querySelector('.main__deleteButton')
        .addEventListener('click', event => deleteNote(event, note.id));
    });
  }
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
