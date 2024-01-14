import * as Constants from './Constants';

export const request = (endPoint, requestType, body) =>
  new Promise(async (resolve, reject) => {
    var token = '';

    // const user = getUser();
    // if (user) {
    //   token = 'Bearer ' + user.token;
    // }

    fetch(Constants.BASE_URL + endPoint, {
      method: requestType,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: body,
    })
      .then(response => {
        response
          .json()
          .then(json => {
            if (response.ok) {
              resolve(json);
            } else if (response.status === 417) {
              reject(json);
            } else {
              if (response.status === 401 || response.status === 403) {
                console.log('LOGOUT');
              }
              reject(json);
            }
          })
          .catch(error => {
            if (response.status === 401 || response.status === 403) {
              console.log('LOGOUT');
            }
            reject(response.status);
          });
      })
      .catch(error => {
        reject(error);
      });
  });

export default request;
