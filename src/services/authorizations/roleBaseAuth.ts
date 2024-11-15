import { getLocalStorageItem } from "../localStorageItem";

export const AdminRole = () => {
    const role = getLocalStorageItem("role");
    if (role === "super_admin") {
        return true;
    }
}

export const LibrarianRole = () => {
    const role = getLocalStorageItem("role");
    if (role === "librarian") {
        return true;
    }
}
export const ReaderRole = () => {
    const role = getLocalStorageItem("role");
    if (role === "reader") {
        return true;
    }
}

export const getRole = () => {
    return getLocalStorageItem("role");
}