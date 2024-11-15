export const  setLocalStorageItem = (key: string, value: string) => {
    localStorage.setItem(key, JSON.stringify(value));
}



export const  getLocalStorageItem = (key: string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

export const  removeLocalStorageItem = (key: string) => {
    localStorage.removeItem(key);
}