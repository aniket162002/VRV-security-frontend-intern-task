// src/utils/localStorage.js

export const getLocalStorageData = (key, defaultValue) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  };
  
  export const setLocalStorageData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  export const deleteLocalStorageData = (key) => {
    localStorage.removeItem(key);
  };
  