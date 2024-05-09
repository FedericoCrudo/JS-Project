import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config'
export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, data = undefined) {
  try {
    const fetchPro = data ? fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }) : fetch(url);
    const resp = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    data = await resp.json();
    if (!resp.ok) throw new Error(`${data.message} (${resp.status})`)
    return data
  } catch (error) {
    //in questo modo l'errore stà visibile all'interno del model
    throw error
  }

}
// export const getJson = async function (url) {
//   try {
//     const fetchPro = fetch(url);
//     const resp = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     data = await resp.json();
//     if (!resp.ok) throw new Error(`${data.message} (${resp.status})`)
//     return data
//   } catch (error) {
//     //in questo modo l'errore stà visibile all'interno del model
//     throw error
//   }
// }
// export const sendJson = async function (url, data) {
//   try {
//     const fetchPro = fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(data)
//     });
//     const resp = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     data = await resp.json();
//     if (!resp.ok) throw new Error(`${data.message} (${resp.status})`)
//     return data
//   } catch (error) {
//     //in questo modo l'errore stà visibile all'interno del model
//     throw error
//   }
// }