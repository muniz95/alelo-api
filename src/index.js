"use strict";

let request = require('request-promise');
const URL = "https://www.meualelo.com.br/meualelo.services/rest";

request = request.defaults({jar: true});

class Alelo {
  constructor(cpf,pwd) {
    this.cpf = cpf;
    this.pwd = new Buffer(pwd).toString("base64");
    this.jar = request.jar();
  }

  obterSaldo() {};

  /**
   * Efetua login
   * @param {string} cpf
   * @param {string} pwd
   * @return {string}
   */
  login() {
    var opts = {
      url: `${URL}/login/authenticate`,
      json: {
        cpf: this.cpf,
        pwd: this.pwd,
        captchaResponse: ""
      },
      headers: {
        "Content-Type": "application/json"
      }
    };
    request.post(opts)
    .then((response) => {
      console.log(response);
      // this.jar.setCookie(httpResponse.headers["set-cookie"], URL);
    })
    .catch((err) => {
      if(err) console.error(`Erro: ${err}`);
    });
  };

  obterCartoes() {
    this.login();
    // console.log(this.jar);
    // request.get({url: `${URL}/user/card/preference/list`, jar: this.jar}, (err, httpResponse, data) => {
    //   console.log(httpResponse.headers["set-cookie"]);
    // });
  };
}

export default Alelo
