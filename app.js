// Кнопки
let searchBtn = document.querySelector('.header__searchButton');
let infoBtn = document.querySelector('.header__infoButton');
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
// Контейнери
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
// Масиви, об'єкти
let noteObj = {};
let notesArr = [];
let colors = ['health','money','plans','hobby','goals','work'];
// Інпути та інші елементи сторінки
let noteTitle = document.querySelector('.main__formTitle');
let noteText = document.querySelector('.main__formText');

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
  for(let note of notesList) {
    notesWrapper.insertAdjacentHTML('afterbegin', 
      `<div id="${note.id}" class="main__note">
        <h2 class="main__noteHeadline">${note.title}</h2>
        <div class="main__dateCategory--wrapper">
          <p class="main__noteDate">${note.date}</p>
          <p class="main__noteCategory">${note.tag}</p>
        </div>
      </div>`);
  }
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

deleteNote();

// function deleteNote() {
//   let notesFromHTML = document.querySelectorAll('.main__note');
//   let holdDelay = 5000;
//   let holdTimeout;
//   let isHeld = false; 

//   for(let note of notesFromHTML) {

//     note.addEventListener('mousedown', function() {
//       isHeld = false;

//       holdTimeout = setTimeout(function() {
//         isHeld = true;
//       }, holdDelay);
//     })
//     note.addEventListener('mouseup', function () {
//       clearTimeout(holdTimeout);
//       if(isHeld) {
//         deleteMessageWrapper.style.display = 'inherit';

//         deleteButton.addEventListener('click', function() {
//           note.remove();

//           let notesFromStorage = localStorage.getItem('notesArr');
//           let storageArr = JSON.parse(notesFromStorage);
//           let noteI = storageArr.findIndex(note => note.id === storageEl.id);

//           if(noteI !== -1) {
//             storageArr.splice(noteI, 1);
//           }
//           localStorage.setItem('notesArr', stringify(storageArr));

//           deleteMessageWrapper.style.display = 'none';
//         });

//         cancelButton.addEventListener('click', function() {
//           deleteMessageWrapper.style.display = 'none';
//         })
//       }
//     });

//     note.addEventListener('mouseleave', function () {
//       clearTimeout(holdTimeout);
//     });
//   }
// }

function deleteNote() {
  let notesFromHTML = document.querySelectorAll('.main__note');
  const holdDelay = 300; // Час затримки для активації видалення
  let holdTimeout;
  let isHeld = false; 

  for (let note of notesFromHTML) {
    note.addEventListener('mousedown', function() {
      isHeld = false;
      holdTimeout = setTimeout(function() {
        isHeld = true; // Якщо утримували достатньо довго
      }, holdDelay);
    });

    note.addEventListener('mouseup', function() {
      clearTimeout(holdTimeout);
      if (isHeld) {
        deleteMessageWrapper.style.display = 'flex';

        deleteButton.removeEventListener('click', onDeleteButtonHandler);
        cancelButton.removeEventListener('click', onCancelButtonHandler);

        deleteButton.addEventListener('click', onDeleteButtonHandler);
        cancelButton.addEventListener('click', onCancelButtonHandler);

        function onDeleteButtonHandler() {
          note.remove(); 

          let notesFromStorage = localStorage.getItem('notesArr');
          let storageArr = JSON.parse(notesFromStorage);
          let noteI = storageArr.findIndex(storedNote => storedNote.id === parseInt(note.id));

          if (noteI !== -1) {
            storageArr.splice(noteI, 1); 
          }

          localStorage.setItem('notesArr', JSON.stringify(storageArr));

          deleteMessageWrapper.style.display = 'none'; 
        }

        function onCancelButtonHandler() {
          deleteMessageWrapper.style.display = 'none'; 
        }
      }
    });

    note.addEventListener('mouseleave', function() {
      clearTimeout(holdTimeout);
    });
  }
}