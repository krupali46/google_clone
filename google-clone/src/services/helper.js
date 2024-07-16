export const getData = (mykey) => {
    const myData = JSON.parse(localStorage.getItem(mykey));

    if (!myData) {
        return [];
    }
    return myData;

}

export const setData = (key,item) => {
    localStorage.setItem(key, JSON.stringify(item));

}