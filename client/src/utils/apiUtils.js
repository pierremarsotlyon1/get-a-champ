import 'isomorphic-fetch';
import superagent from 'superagent';
import superagentJsonapify from 'superagent-jsonapify';
import {getLocalStorage, ID_TOKEN} from '../utils/localStorage';

superagentJsonapify(superagent);

const urlServer = process.env.NODE_ENV === 'production' ? 'http://37.187.23.89:8000' : 'http://localhost:8000';

export function getApi(url, query = {}) {
  return new Promise((resolve, reject) => {
    const token = getLocalStorage(ID_TOKEN);
    if (token) {
      query.token = token;
    }

    superagent.get(urlServer + url)
      .query(query)
      .end((error, response) => {
        if (!response) {
          return reject({
            error: 'Erreur de connexion avec le serveur'
          }, 404);
        }
        if (response.ok) {
          return resolve(response.body, response.statusCode);
        }

        return reject(response.body, response.statusCode);
      });
    /*
     restler.get(urlServer + url, {
     query: query
     }).on("success", (data_response, response) => {
     return resolve(data_response, response, query);
     }).on("fail", (data_response, response) => {
     return reject(data_response, response, query);
     });
     */
  });
}

export function postApi(url, data = {}) {
  return new Promise((resolve, reject) => {
    const token = getLocalStorage(ID_TOKEN);
    if (token) {
      data.token = token;
    }

    superagent.post(urlServer + url)
      .send(data)
      .end((error, response) => {
        if (response.ok) {
          return resolve(response.body, response.statusCode);
        }

        return reject(response.body, response.statusCode);
      });
    /*restler.post(urlServer + url, {
     data: data
     }).on("success", (data_response, response) => {
     return resolve(data_response, response, data);
     }).on("fail", (data_response, response) => {
     return reject(data_response, response, data);
     });*/
  });
}

export function postMultipartApi(url, data = [], file) {
  return new Promise((resolve, reject) => {
    const token = getLocalStorage(ID_TOKEN);
    if (!token) {
      return reject({
        error: 'Erreur lors de la récupération de votre identifiant'
      });
    }

    let req = superagent.post(urlServer + url);
    req.attach(file.name, file.data);

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        req.field(key, data[key]);
      }
    }

    req.field('token', token);

    req.then((response, response2) => {
      return resolve(response);
    })
      .catch((response) => {
        return reject(response);
      });
  });
}

export function putApi(url, data = {}) {
  return new Promise((resolve, reject) => {

    const token = getLocalStorage(ID_TOKEN);
    if (token) {
      data.token = token;
    }


    superagent.put(urlServer + url)
      .send(data)
      .end((error, response) => {
        if (response.ok) {
          return resolve(response.body, response.statusCode);
        }

        return reject(response.body, response.statusCode);
      });
    /*restler.put(urlServer + url, {
     data: data
     }).on("success", (data_response, response) => {
     return resolve(data_response, response, data);
     }).on("fail", (data_response, response) => {
     return reject(data_response, response, data);
     });*/
  });
}

export function removeApi(url, query = {}) {
  return new Promise((resolve, reject) => {

    const token = getLocalStorage(ID_TOKEN);
    if (token) {
      query.token = token;
    }

    superagent.delete(urlServer + url)
      .query(query)
      .end((error, response) => {
        if (response.ok) {
          return resolve(response.body, response.statusCode);
        }

        return reject(response.body, response.statusCode);
      });
    /*restler.del(urlServer + url, {
     query: query
     }).on("success", (data_response, response) => {
     return resolve(data_response, response, query);
     }).on("fail", (data_response, response) => {
     return reject(data_response, response, query);
     });*/
  });
}

export function staticFileServer(url) {
  return urlServer + url;
}