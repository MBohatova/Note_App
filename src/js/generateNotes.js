import { BASE_URL, refs } from './refs.js';
import { addEventListenersToDeleteButtonsOnNotes, addeventListenersToNotes } from './eventListeners.js';

export const generateNote = () => {
  refs.main.notesWrapper.innerHTML = '';

  checkIfNotesExist().then(notes => {
    if(notes && notes.length > 0) {
      refs.main.startPageContent.style.display = 'none';
      refs.main.notesWrapper.style.display = 'flex';

     notes.forEach((note) => {
      let colorTag = note.tag.toLowerCase();
      refs.main.notesWrapper.insertAdjacentHTML('afterbegin', 
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
        addeventListenersToNotes();
     })
    } else {
      refs.main.startPageContent.style.display = 'flex';
    }
  })
}

export const generateFoundNotes = (foundNotes) => {
  foundNotes.forEach(note => {
    let colorTag = note.tag.toLowerCase();
    refs.main.notesWrapper.insertAdjacentHTML(
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

  addeventListenersToNotes();
}

export const checkIfNotesExist = async () => {
  try {
    const response = await fetch(`${BASE_URL}`);

    if(!response.ok) {
      throw Error('Something went wrong!');
    }

    const notes = await response.json();
    return notes;
  } catch (error) {
    console.log(error);
  }
}

