import { getElement } from './utils.js';

export const refs = {
  header: {
    searchBtn: getElement(".header__searchButton"),
    themeButton: getElement(".header__themeButton"),
    searchCloseButton: getElement(".header__closeButton"),
    searchBarWrapper: getElement(".header__searchBarBox"),
    searchText: getElement(".header__searchBar"),
    headerHeadline: getElement(".header__headline"),
  },
  main: {
    createBtn: getElement(".main__createButton"),
    startPageContent: getElement(".main__emptyContent"),
    notFoundContent: getElement(".main__notFoundContent"),
    notesWrapper: getElement(".main__notesWrapper"),
    emptyParagraph: getElement(".main__paragraph"),
    notFoundParagraph: getElement(".main__paragraphNotFound"),
  },
  formContainer: {
    saveButton: getElement(".header__saveButton"),
    backButton: getElement(".header__backButton"),
    noteForm: getElement(".main__form"),
    noteTitle: getElement(".main__formTitle"),
    noteText: getElement(".main__formText"),
    tagsBox: getElement(".main__tagBox"),
    tagButton: document.querySelectorAll(".tagButton"),
    prevClickedTagButton: null,
    formContainer: getElement(".formContainer"),
  },
  editFormContainer: {
    editFormContainer: getElement(".editFormContainer"),
    editHeader: getElement(".header__rewriteEditor"),
    editBackButton: getElement(".header__rewriteBackButton"),
    editSaveButton: getElement(".header__rewriteSaveButton"),
    editForm: getElement(".main__editForm"),
    editTitle: getElement(".main__editTitle"),
    editTextArea: getElement(".main__editText"),
  },
  deleteMessageWrapper: {
    deleteButton: getElement(".deleteButton"),
    cancelButton: getElement(".cancelButton"),
    deleteMessageWrapper: getElement(".deleteMessageWrapper"),
    deleteMessage: getElement(".deleteMessage"),
  },
  eventHandlers: {
    currentDeleteHandler: null,
    currentCancelHandler: null,
    currentEditBackHandler: null,
    currentEditSaveHandler: null,
  },
  objectAndArray: {
    noteObj: {},
    notesArr: []
  },
  main__deleteButton: null,
  body: getElement('body'),
};

export const elemArrays = {
    formInputsArr: [refs.formContainer.noteTitle, refs.formContainer.noteText],
    editFormInputs: [refs.editFormContainer.editTitle, refs.editFormContainer.editTextArea]
}

