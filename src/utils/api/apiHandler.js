export default class ApiHandler {

  constructor(url) {
    this.url = url;
  }

  setApiUrl = url => {
    this.url = url;

    return this;
  }

  setAuthToken = token => {
    this.token = token;

    return this;
  }

  apiRequest = (endpoint, params) =>
    new Promise((resolve, reject) => {
      let paramsString = '';

      if (params) {
        Object.keys(params).forEach(param => {
          paramsString += `&${param}=${params[param]}`;
        });
      }

      fetch(`${this.url}${endpoint}?${paramsString}`, {
        headers: this.getAuthHeaders()
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 403) {
            throw new Error('Authorization failed');
          }

          throw new Error('Unknown API Error');
        })
        .then(json => resolve(json))
        .catch(e => reject(e));
    })

  getAuthHeaders = () => {
    let headers = {};

    if (this.token) {
      headers = {
        'Authorization': `Bearer ${this.token}`,
      };
    }

    return new Headers(headers);
  }
}
