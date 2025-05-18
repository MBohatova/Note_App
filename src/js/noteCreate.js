import { refs } from './refs.js'; 
import { chooseTagColors, clearCategoryButtonsColorStyle } from './tagColorAppearance.js';
import { onSaveButtonHandler } from './saveNote.js';

export const onCreateButtonClickHandler = () => {
  refs.formContainer.formContainer.style.display = 'flex';
  refs.main.notFoundContent.style.display = 'none';
  refs.header.searchText.value = '';
  scrollTo(0, 0);

  refs.formContainer.tagsBox.removeEventListener('click', chooseTagColors);
  refs.formContainer.tagsBox.addEventListener('click', chooseTagColors);

  refs.objectAndArray.noteObj.tag = 'Without tag';

  clearCategoryButtonsColorStyle();

  refs.formContainer.saveButton.addEventListener('click', onSaveButtonHandler);
  refs.formContainer.backButton.addEventListener('click', onBackButtonHandler);
}

export const onBackButtonHandler = () => {
  refs.formContainer.formContainer.style.display = 'none';
  refs.formContainer.noteTitle.classList.remove('emptyInput');
  refs.formContainer.noteText.classList.remove('emptyInput');
  refs.header.searchText.value = '';
  refs.formContainer.saveButton.removeEventListener('click', onBackButtonHandler);
}

export const createNote = () => {
  refs.objectAndArray.noteObj.title = refs.formContainer.noteTitle.value.trim();
  refs.objectAndArray.noteObj.description = refs.formContainer.noteText.value.trim();
  refs.objectAndArray.noteObj.id = new Date().getTime();
  refs.objectAndArray.noteObj.time = new Date().toLocaleTimeString('uk-UA');
  refs.objectAndArray.noteObj.date = new Date().toLocaleDateString('uk-UA');
}

refs.main.createBtn.addEventListener('click', onCreateButtonClickHandler);