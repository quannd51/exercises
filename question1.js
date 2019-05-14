const load = (inputOfStore) => {
  const arrStock = inputOfStore.split("\n");
  const dataLoad = [];

  if (arrStock.length > 0) {
    for (let stringChild of arrStock) {
      const arrChild = stringChild.split(";");
      if (arrChild.length > 0) {
        let item = {};
        for (let stringKeyValue of arrChild) {
          let keyValue = stringKeyValue.split('=');

          if (keyValue[1]) {
            item[keyValue[0]] = keyValue[1]; // item.key = value;
          }
        }

        if (Object.keys(item).length > 0) {
          dataLoad.push(item);
        }
      }
    }
  }

  return dataLoad;
};

const store = (arrayData) => {
  let strStore = '';

  let lastItem = arrayData[arrayData.length - 1];
  for (let item of arrayData) {
    let listKey = Object.keys(item);
    let lastKey = listKey[listKey.length - 1];

    for (let key of listKey) {
      let value = item[key];
      if (key === lastKey) {
        strStore = `${strStore}${key}=${value}`;
        break;
      }

      strStore = `${strStore}${key}=${value};`;
    }

    if (lastItem !== item) {
      strStore = `${strStore}\n`;
    }
  }

  return strStore;
};

module.exports = {
  load,
  store
}