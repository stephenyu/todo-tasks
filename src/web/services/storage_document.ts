import { StorageDocument } from "./storage";

const localStorage = window.localStorage;

export const DocumentStorage: StorageDocument = {
  save: (document) => Promise.resolve(localStorage.setItem('scratchPad', document)),
  retrieve: () => Promise.resolve(localStorage.getItem('scratchPad'))
};
