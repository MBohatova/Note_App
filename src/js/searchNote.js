import { refs } from './refs.js';
import { generateNote, generateFoundNotes, checkIfNotesExist } from './generateNotes.js';
import { addeventListenersToNotes } from './eventListeners.js';
import { deleteFoundNotes} from './deleteNote.js';

export const showSearchingTools = () => {
  refs.header.searchBtn.style.display = 'none';
  refs.header.searchBarWrapper.style.display = 'flex';
}
refs.header.searchBtn.addEventListener('click', showSearchingTools);

export const onSearchCloseButtonHandler = () => {
  refs.header.searchBarWrapper.style.display = 'none';
  refs.main.notFoundContent.style.display = 'none';
  refs.header.searchBtn.style.display = 'block';
  refs.header.searchText.value = '';
  refs.main.notesWrapper.innerHTML = '';
  generateNote();
  addeventListenersToNotes();
}
refs.header.searchCloseButton.addEventListener('click', onSearchCloseButtonHandler);

export const searchingByBar = () => {
  let searchWord = refs.header.searchText.value.toLowerCase();

  checkIfNotesExist().then((notes) => {
    if(notes) {
      refs.main.notesWrapper.innerHTML = '';
      const foundNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchWord)
      );
        if (searchWord === '') {
          refs.main.notFoundContent.style.display = 'none';
          refs.main.notesWrapper.innerHTML = '';
          generateNote();
          return;
        }

        if (foundNotes.length === 0) {
          refs.main.notFoundContent.style.display = 'flex';
          refs.main.startPageContent.style.display = 'none';
          refs.header.searchBtn.style.display = 'block';
          return;
        }

        if(notes.length === 0) {
          refs.main.startPageContent.style.display = 'flex';
          refs.main.notFoundContent.style.display = 'none';
          return;
        }

        refs.main.notFoundContent.style.display = 'none';
        refs.main.startPageContent.style.display = 'none';
        refs.main.notesWrapper.style.display = 'flex';

        generateFoundNotes(foundNotes);
        deleteFoundNotes(foundNotes);
    }
  })
}
refs.header.searchText.addEventListener('input', searchingByBar);