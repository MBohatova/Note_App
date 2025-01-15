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
let themeArr = [];
let areas = [body, editForm, editHeader, noteForm, editorHeader];
let textAreas = [noteTitle, noteText];
let color = '';

let notesFromStorage = localStorage.getItem('notesArr');
if(notesFromStorage) {
  generateNote();
} else {
  startPageContent.style.display = 'inherit';
}

createBtn.addEventListener('click', function() {
  editorHeader.style.display = 'inherit';
  noteForm.style.display = 'inherit';
  searchText.style.display = 'none';
  searchCloseButton.style.display = 'none';

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
    searchText.style.display = 'inherit';
    searchCloseButton.style.display = 'inherit';
    saveButton.removeEventListener('click', onBackButtonHandler);
  }
})

function onSaveButtonHandler() {
  createNote();
  saveNotesInLocalStorage();
  generateNote();
  clearTextArea();
  editNote();
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
  let notesFromHTML = document.querySelectorAll('.main__note')

  for(let note of notesFromHTML) {
    for(let noteObject of notesFromLocalSt) {
      if(note.id === noteObject.id.toString()) {
        note.addEventListener('click', function() {
          editHeader.style.display = 'inherit';

          editBackButton.addEventListener('click', onEditBackButtonHandler);
          editForm.innerHTML = '';
          editForm.style.display = 'inherit';
          if(themeButton.classList.contains('btnLightTheme')) {
            editForm.insertAdjacentHTML('beforeend',
              `<input 
                  type="text"
                  class="lightThemeTitles"
                  id="editTitle"
                  value="${noteObject.title}"
                >
                <textarea id="editText" class="lightThemeTexts" placeholder="Type something...">${noteObject.text}</textarea>`
            )
          } 
          
          if(themeButton.classList.contains('header__themeButton')) {
            editForm.insertAdjacentHTML('beforeend',
              `<input 
                  type="text"
                  class="main__editTitle"
                  id="editTitle"
                  value="${noteObject.title}"
                >
                <textarea id="editText" class="main__editText" placeholder="Type something...">${noteObject.text}</textarea>`
            )
          }
          let editTitle = document.getElementById('editTitle');
          let editText = document.getElementById('editText');

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

  if(themeButton.className === 'btnLightTheme') {
    deleteMessage.classList.toggle('deleteMessage');
    deleteMessage.classList.toggle('deleteMessageLight');
  } else {
    deleteMessage.classList.add('deleteMessage');
  }

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
  searchBarWrapper.style.display = 'flex';
  searchText.style.display = 'inherit';
  searchCloseButton.style.display = 'inherit';

  searchCloseButton.addEventListener('click', function() {
    searchBarWrapper.style.display = 'none';
    notFoundContent.style.display = 'none';
    searchText.value = '';
    notesWrapper.innerHTML = '';
    generateNote();
  })

  searchText.addEventListener('input', searchingByBar);

  function searchingByBar() {
    let searchWord = searchText.value.toLowerCase();
    let noteList = JSON.parse(localStorage.getItem('notesArr'));

    notesWrapper.innerHTML = '';

    let foundNotes = noteList.filter(note => 
      note.title.toLowerCase().includes(searchWord)
    );

    if (foundNotes.length === 0) {
      notFoundContent.style.display = 'flex';
      return;
    }

    if(searchText.value === '') {
      notFoundContent.style.display = 'none';
    }

    foundNotes.forEach(note => {
      let colorTag = note.tag.toLowerCase();
      notesWrapper.insertAdjacentHTML('beforeend', 
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
    document.getElementById(note.id).querySelector('.main__deleteButton')
      .addEventListener('click', event => deleteNote(event, note.id));
  });
  }
}

themeButton.addEventListener('click', changeTheme);

function changeTheme() {
  if(themeButton.classList.contains('btnLightTheme')) {
    themeButton.classList.add('header__themeButton');

    headerHeadline.classList.remove('headHeadlineLight');
    headerHeadline.classList.add('header__headline');

    emptyParagraph.classList.remove('emptyParagraphLight');
    emptyParagraph.classList.add('main__paragraph');

    notFoundParagraph.classList.remove('paragraphNotFoundLight');
    notFoundParagraph.classList.add('main__paragraphNotFound');

    areas.forEach((elem) => elem.classList.remove('lightTheme'));

    noteTitle.classList.remove('lightThemeTitles');
    noteTitle.classList.add('main__formTitle');

    noteText.classList.remove('lightThemeTexts');
    noteText.classList.add('main__formText');

    themeButton.classList.remove('btnLightTheme');

    searchBarWrapper.classList.remove('searchBarLightTheme');
    searchBarWrapper.classList.add('header__searchBarBox');

    searchText.classList.remove('searchBarInputLight');
    searchText.classList.add('header__searchBar');

    searchCloseButton.classList.remove('closeButtonLight');
    searchCloseButton.classList.add('header__closeButton');

    localStorage.setItem('theme', 'dark');
  } else {
    themeButton.classList.remove('header__themeButton');
    themeButton.classList.add('btnLightTheme');

    headerHeadline.classList.remove('header__headline');
    headerHeadline.classList.add('headHeadlineLight');

    emptyParagraph.classList.remove('main__paragraph');
    emptyParagraph.classList.add('emptyParagraphLight');

    notFoundParagraph.classList.remove('main__paragraphNotFound');
    notFoundParagraph.classList.add('paragraphNotFoundLight');

    areas.forEach((elem) => elem.classList.add('lightTheme'));

    noteTitle.classList.remove('main__formTitle');
    noteTitle.classList.add('lightThemeTitles');

    noteText.classList.remove('main__formText');
    noteText.classList.add('lightThemeTexts');

    searchBarWrapper.classList.remove('header__searchBarBox');
    searchBarWrapper.classList.add('searchBarLightTheme');

    searchText.classList.remove('header__searchBar');
    searchText.classList.add('searchBarInputLight');

    searchCloseButton.classList.remove('header__closeButton');
    searchCloseButton.classList.add('closeButtonLight');

    localStorage.setItem('theme', 'light');
  }
}

function initializeTheme() {
  let savedTheme = localStorage.getItem('theme');

  if(savedTheme === 'light') {
    themeButton.classList.add('btnLightTheme');
    themeButton.classList.remove('header__themeButton');
    headerHeadline.classList.add('headHeadlineLight');
    headerHeadline.classList.remove('header__headline');
    emptyParagraph.classList.add('emptyParagraphLight');
    emptyParagraph.classList.remove('main__paragraph');
    notFoundParagraph.classList.add('paragraphNotFoundLight');
    notFoundParagraph.classList.remove('main__paragraphNotFound');
    areas.forEach((elem) => elem.classList.add('lightTheme'));

    noteTitle.classList.add('lightThemeTitles');
    noteTitle.classList.remove('main__formTitle');
    noteText.classList.add('lightThemeTexts');
    noteText.classList.remove('main__formText');

    searchBarWrapper.classList.add('searchBarLightTheme');
    searchBarWrapper.classList.remove('header__searchBarBox');
    searchText.classList.add('searchBarInputLight');
    searchText.classList.remove('header__searchBar');
    searchCloseButton.classList.add('closeButtonLight');
    searchCloseButton.classList.remove('header__closeButton');
  } else {
    themeButton.classList.add('header__themeButton');
    themeButton.classList.remove('btnLightTheme');
    headerHeadline.classList.add('header__headline');
    headerHeadline.classList.remove('headHeadlineLight');
    emptyParagraph.classList.add('main__paragraph');
    emptyParagraph.classList.remove('emptyParagraphLight');
    notFoundParagraph.classList.add('main__paragraphNotFound');
    notFoundParagraph.classList.remove('paragraphNotFoundLight');
    areas.forEach((elem) => elem.classList.remove('lightTheme'));

    noteTitle.classList.add('main__formTitle');
    noteTitle.classList.remove('lightThemeTitles');
    noteText.classList.add('main__formText');
    noteText.classList.remove('lightThemeTexts');

    searchBarWrapper.classList.add('header__searchBarBox');
    searchBarWrapper.classList.remove('searchBarLightTheme');
    searchText.classList.add('header__searchBar');
    searchText.classList.remove('searchBarInputLight');
    searchCloseButton.classList.add('header__closeButton');
    searchCloseButton.classList.remove('closeButtonLight');
  }
}
initializeTheme();
