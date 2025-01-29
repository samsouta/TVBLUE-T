// utils/localStorageHelper.ts
export const clearLocalStorageKeys = (keys: string[]) => {
    keys.forEach((key) => {
      if (localStorage.getItem(key)) {
        console.log(`Removing ${key} from localStorage`);
        localStorage.removeItem(key);
      }
    });
  };
  