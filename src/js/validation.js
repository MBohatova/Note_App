import { refs, elemArrays } from './refs.js';

export const formValidation = (form, inputsArr) => {
  form.addEventListener('input', function () {
    inputsArr.forEach(function (input) {
      return input.classList.remove('emptyInput');
    });
  });
};

formValidation(refs.formContainer.noteForm, elemArrays.formInputsArr);