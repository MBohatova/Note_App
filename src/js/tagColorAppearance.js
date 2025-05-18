import { refs } from './refs.js'; 

export const clearCategoryButtonsColorStyle = () => {
  refs.formContainer.tagButton.forEach(tag_button => tag_button.style.color = 'black')
}

export const chooseTagColors = (e) => {
  if(refs.formContainer.prevClickedTagButton) refs.formContainer.prevClickedTagButton.style.color = 'black';

  e.target.style.color = 'white';
  refs.formContainer.prevClickedTagButton = e.target;
  refs.objectAndArray.noteObj.tag = e.target.textContent;
}