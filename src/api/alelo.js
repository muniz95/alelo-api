"use strict";

const axios = require('axios');
const URL = "https://www.meualelo.com.br/meualelo.services/rest";

axios.defaults.headers.post['Content-Type'] = 'application/json';

const obterSaldo = () => {};

/**
 * Efetua login
 * @param {string} cpf
 * @param {string} pwd
 * @return {string}
 */
const login = (cpf, pwd) => {
  axios({
    url: `${URL}/login/authenticate`,
    method: "post",
    data: {
      cpf: cpf,
      pwd: pwd,
      captchaResponse: ""
    }
  })
  .then(response => console.log(response));
};
const obterCartoes = () => {};

module.exports = {
  obterSaldo: obterSaldo,
  obterCartoes: obterCartoes,
  login: login,
  teste: ""
}
