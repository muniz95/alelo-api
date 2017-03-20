"use strict";

const util = require('util');
let request = require('request');
const URL = "https://www.meualelo.com.br/meualelo.services/rest";

request = request.defaults({jar: true});

class Alelo {
  constructor(cpf,pwd) {
    this.cpf = cpf;
    this.pwd = new Buffer(pwd).toString("base64");
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
    request.post(opts, (err, httpResponse, body) => {
      if(err) console.error(err);
      console.log(body);
    });
  };

  obterCartoes() {
    // this.login();
    // console.log(cookieJar);
    request.get(`${URL}/user/card/preference/list`, (err, httpResponse, data) => {
      console.log(httpResponse);
    });
  };
}

export default Alelo
