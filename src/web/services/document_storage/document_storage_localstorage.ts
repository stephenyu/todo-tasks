import { DocumentStorage } from "./document_storage";

const localStorage = window.localStorage;

export const DocumentStorageLocalStorage: DocumentStorage = {
  save: (document) => Promise.resolve(localStorage.setItem('scratchPad', document)),
  retrieve: () => {
    let result = localStorage.getItem('scratchPad');
    if (result === null)
      result = '';

    return Promise.resolve(result);
  }
};
