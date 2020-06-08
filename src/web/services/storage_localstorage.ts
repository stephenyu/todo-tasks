import { Storage } from './storage';

class StorageLocalStorage implements Storage {

}

let localStorage: StorageLocalStorage;

function getLocalStorage() {
  if (localStorage == undefined) {
    localStorage = new StorageLocalStorage();
  }

  return localStorage;
}

export const storage: Storage = {
  store: (tasklist) => {
    const localStorage = getLocalStorage();

  },
  get: () => ({})
};
