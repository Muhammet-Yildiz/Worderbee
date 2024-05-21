
export function localStorageAvailable() {
    try {
        const key = '__random_key__';
        window.localStorage.setItem(key, key);
        window.localStorage.removeItem(key);
        return true;
    } catch (error) {
        return false;
    }
}
export const getStorage = (key: string, initialState: any) => {
    const storageAvailable = localStorageAvailable();
    if (!storageAvailable) {
        return initialState
    }

    let value = null;

    try {
        const result = window.localStorage.getItem(key);
        if (result) {
            value = JSON.parse(result);
        }
        else {
            setStorage(key, initialState)

            return initialState;
        }
    } catch (error) {
        console.error(error);
    }

    return value;
};


export const setStorage = (key: string, value: any) => {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(error);
    }
};
