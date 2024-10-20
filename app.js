// Кнопки
let searchBtn = document.querySelector('.header__searchButton');
let themeButton = document.querySelector('.header__themeButton');
let createBtn = document.querySelector('.main__createButton');
let saveButton = document.querySelector('.header__saveButton');
let backButton = document.querySelector('.header__backButton');
let visibilityButton = document.querySelector('.header__visibilityButton');
let tagButton = document.querySelectorAll('.tagButton');
let mainButton = document.querySelector('.main__buttonBox');
let editBackButton = document.querySelector('.header__rewriteBackButton');
let editSaveButton = document.querySelector('.header__rewriteSaveButton');
let deleteButton = document.querySelector('.deleteButton');
let cancelButton = document.querySelector('.cancelButton');
let main__deleteButton;
let searchCloseButton = document.querySelector('.header__closeButton');
let searchBarButton = document.querySelector('.header__searchBarButton');
// Контейнери
let body = document.querySelector('body');
let startPageContent = document.querySelector('.main__emptyContent');
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
let searchBarWrapper = document.querySelector('.header__searchBarBox');
// Масиви, об'єкти
let noteObj = {};
let notesArr = [];
const colors = {
  'health': '#4caf50',
  'money': '#ffeb3b',
  'plans': '#2196f3',
  'hobby': '#e91e63',
  'goals': '#ff5722',
  'work': '#9c27b0'
};
let color = '';
// Інпути та інші елементи сторінки
let noteTitle = document.querySelector('.main__formTitle');
let noteText = document.querySelector('.main__formText');
let searchText = document.querySelector('.header__searchBar');
let headerHeadline = document.querySelector('.header__headline');

let notesFromStorage = localStorage.getItem('notesArr');
if(notesFromStorage) {
  generateNote();
} else {
  startPageContent.style.display = 'inherit';
}

createBtn.addEventListener('click', function() {
  editorHeader.style.display = 'inherit';
  noteForm.style.display = 'inherit';

  for (let tag of tagButton) {
    tag.addEventListener('click', function() {
      noteObj.tag = tag.textContent;
    });
    noteObj.tag = 'Without tag';
  }
  saveButton.addEventListener('click', onSaveButtonHandler);
  backButton.addEventListener('click', onBackButtonHandler);

  function onBackButtonHandler() {
    hideBtns();
    saveButton.removeEventListener('click', onBackButtonHandler);
  }
})

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
        let noteId = event.target.closest('.main__note').id; // Отримуємо ID нотатки
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
  let notesFromHTML = document.querySelectorAll('.main__note')

  // !! Переробити на метод find()
  for(let note of notesFromHTML) {
    for(let noteObject of notesFromLocalSt) {
      if(note.id === noteObject.id.toString()) {
        note.addEventListener('click', function() {
          editHeader.style.display = 'inherit';

          editBackButton.addEventListener('click', onEditBackButtonHandler);
          editForm.innerHTML = '';
          editForm.style.display = 'inherit';
          editForm.insertAdjacentHTML('beforeend',
            `<input 
                type="text"
                class="main__editTitle"
                value="${noteObject.title}"
              >
              <textarea class="main__editText" placeholder="Type something...">${noteObject.text}</textarea>`
          )

          let editTitle = document.querySelector('.main__editTitle');
          let editText = document.querySelector('.main__editText');

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
            let noteIndex = notesFromLocalSt.findIndex(note => note.id === noteObject.id);
            if (noteIndex !== -1) {
              notesFromLocalSt[noteIndex] = noteObject;
            }
            localStorage.setItem('notesArr', JSON.stringify(notesFromLocalSt));
          }
        })
      }
    }
  }
}

function onEditBackButtonHandler() {
  editHeader.style.display = 'none';
  editForm.style.display = 'none';
  editBackButton.removeEventListener('click', onEditBackButtonHandler);
}


function deleteNote(event, noteId) {
  event.stopPropagation();

  deleteMessageWrapper.style.display = 'flex';

  let noteElement = document.getElementById(noteId);
  // let notesFromHTML = document.querySelector('.main__note');
  // let note = document.querySelector('.main__note');

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

    notesFromHTML = document.querySelectorAll('.main__note');

    if(notesFromHTML.length === 0) {
      startPageContent.style.display = 'inherit';
    } else {
      startPageContent.style.display = 'none';
    }
    deleteMessageWrapper.style.display = 'none';
  }

  function onCancelButtonHandler() {
    deleteMessageWrapper.style.display = 'none';
    generateNote();
  }
}

searchBtn.addEventListener('click', searching);

function searching() {
  notesWrapper.innerHTML = '';
  headerWrapper.style.display = 'none';
  searchBarWrapper.style.display = 'inherit';

  searchCloseButton.addEventListener('click', function() {
    if(searchText.value === 'Search by the keyword...') {
      headerWrapper.style.display = 'inherit';
      searchBarWrapper.style.display = 'none';
      generateNote();
    }

    searchText.value = 'Search by the keyword...';
  })

  searchBarButton.addEventListener('click', function() {
    let searchWord = searchText.value.toLowerCase();
    let noteList = JSON.parse(localStorage.getItem('notesArr'));
    let foundNote = null;

    for(let note of noteList) {
      let headline = note.title.toLowerCase();
      if(headline.includes(searchWord)) {
        foundNote = note;
        break;
      }
    }
    notesWrapper.insertAdjacentHTML('afterbegin', 
      `<div id="${foundNote.id}" class="main__note">
        <div class="main__headlineAndButtonWrapper">
          <h2 class="main__noteHeadline">${foundNote.title}</h2>
          <button class="main__deleteButton"></button>
        </div>
        <div class="main__dateCategory--wrapper">
          <p class="main__noteDate">${foundNote.date}</p>
          <p class="main__noteCategory">${foundNote.tag}</p>
        </div>
      </div>`);
  })
}


// themeButton.addEventListener('click', changeTheme);

// function changeTheme() {
//   body.style.backgroundColor = 'rgb(250, 250, 211)';
//   headerHeadline.style.color = 'rgba(37, 37, 37, 1)';
//   editForm.style.backgroundColor = 'inherit';
//   // body.style.backgroundColor = 'rgba(37, 37, 37, 1)';
//   // headerHeadline.style.color = 'rgba(255, 255, 255, 1)';
// }
