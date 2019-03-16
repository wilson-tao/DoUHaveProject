export function getFromStorage(key) {
  if (!key) {
    return null;
  }

  try {
    const valueStr = localStorage.getItem(key);
    if (valueStr) {
      console.log('Parsing...', valueStr);
      console.log(JSON.parse(valueStr));
      return JSON.parse(valueStr);
    }
    return null;
  } catch (err) {
    return null;
  }
}

export function setInStorage(key, obj) {
  if (!key) {
    console.error('Error: key is missing');
  }

  try {
    localStorage.setItem(key, JSON.stringify(obj));
  } catch (err) {
    console.error(err);
  }
}

export function deleteFromStorage() {
  console.log('Logging Out...')

  localStorage.removeItem('the_main_app');
  window.location.reload();
}
