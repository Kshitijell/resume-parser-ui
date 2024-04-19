import * as FileSaver from 'file-saver';
import { v4 as UIDV4 } from 'uuid';
import { toast } from 'react-toastify';

export const capitalizeFLetter = (string = '') =>
  `${string?.[0]?.toUpperCase()}${string?.slice(1)?.replaceAll('_', ' ')?.toLowerCase()}`;

export const notify = (message = '', type = 'success') => toast[type](capitalizeFLetter(message));

export const getSessionStorage = (key) => {
  let value = null;
  try {
    const result = window.sessionStorage.getItem(key);

    if (result) {
      value = JSON.parse(window.atob(result));
    }
  } catch (error) {
    console.error(error);
  }

  return value;
};

export const setSessionStorage = (key, value) => {
  try {
    window.sessionStorage.setItem(key, window.btoa(JSON.stringify(value)));
  } catch (error) {
    console.error(error);
  }
};

export const removeSessionStorage = (key) => {
  try {
    window.sessionStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};

export const setTokensInSessionStorage = () => {
  try {
    const sessionStorageValues = Object.values(sessionStorage);
    const values = sessionStorageValues.filter((store) => {
      try {
        const { credentialType } = JSON.parse(store);
        if (credentialType) {
          return true;
        }
      } catch (error) {
        return false;
      }
      return false;
    });
    values.forEach((e) => {
      const { credentialType, secret } = JSON.parse(e);
      if (credentialType === 'IdToken') {
        setSessionStorage('accesstoken', secret);
      } else if (credentialType === 'RefreshToken') {
        setSessionStorage('refreshtoken', secret);
      }
    });
  } catch (error) {
    throw new Error(error);
  }
};

export function formatDate(created_at) {
  const inputDate = new Date(created_at);
  const formattedDateTime = inputDate.toLocaleString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
  return formattedDateTime;
}

export const returnLargestLengthOfValues = (arrList = [], keyName = '') =>
  arrList?.reduce((prev, curr) => {
    const currValueLength = curr?.[keyName]?.toString()?.length;
    if (currValueLength > prev) {
      return currValueLength;
    }
    return prev;
  }, 0);

export const getUIDV4 = () => UIDV4();

export const calculateGridHeight = (numRecords, maxRecords, rowHeight = 52) =>
  `${Math.min(numRecords, maxRecords) * rowHeight + 170}px`;

export const getObjectOnKeys = (list = [], keyName = '') =>
  list.reduce((acc, curr) => {
    if (!acc[curr[keyName]]) {
      acc[curr[keyName]] = [];
    }
    acc[curr[keyName]].push(curr);
    return acc;
  }, {});

export function saveExcelFile(excelBuffer, fileName, type) {
  try {
    let blob;
    if (type) {
      blob = new Blob([excelBuffer], {
        type: `application/${type}`,
      });
    } else {
      blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
    }
    if (type === 'csv' && !fileName.endsWith('.csv')) {
      fileName += '.csv';
    }

    FileSaver.saveAs(blob, fileName);
  } catch (err) {
    console.error(err);
  }
}

export default function DownloadExcelFromBase64String(props) {
  const { file, filename, type } = props;
  if (file) {
    const excelBuffer = base64ToArrayBuffer(file);
    saveExcelFile(excelBuffer, filename, type);
  }
}

export function base64ToArrayBuffer(base64) {
  try {
    const binaryString = window.atob(base64);
    const { length } = binaryString;
    const bytes = new Uint8Array(length);

    for (let i = 0; i < length; i += 1) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes.buffer;
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Searches for objects in the given array that contain the specified search term.
 * @param {Array} array - The array of objects to search.
 * @param {string} searchTerm - The search term to look for.
 * @returns {Array} - An array containing objects that match the search term.
 */
export function handleGlobalRowSearch(array, searchTerm) {
  const results = [];
  if (typeof searchTerm !== 'string') return [];
  function searchObject(obj, term, parentObj = null) {
    let isFound = false;
    Object.entries(obj).forEach(([key, value]) => {
      if (!isFound) {
        if (Array.isArray(value)) {
          value.forEach((el) => searchObject(el, term, obj));
        } else if (typeof value === 'object' && value) {
          searchObject(value, term);
        } else if (typeof value === 'string' && value.toLowerCase().includes(term)) {
          results.push(parentObj ?? obj);
          isFound = true;
        }
      }
    });
  }
  array.forEach((obj) => searchObject(obj, searchTerm.toLowerCase()));
  return results;
}
