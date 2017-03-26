"use strict";

let request = require('request-promise');
const util = require('util');
const URL = "https://www.meualelo.com.br/meualelo.services/rest";

request = request.defaults({jar: true});

class Alelo {

  /**
   * Creates a new Alelo account instance.
   *
   * @param {string} cpf - ID of the cardholder
   * @param {string} pwd - Account password
   *
   */
  constructor(cpf,pwd) {
    this.cpf = cpf;
    this.pwd = new Buffer(pwd).toString("base64");
    this.jar = request.jar().setCookie("", "");
  }

  /**
   * Performs login on the system
   *
   * @return {Promise}
   */
  login() {
    const opts = {
      url: `${URL}/login/authenticate`,
      json: {
        cpf: this.cpf,
        pwd: this.pwd,
        captchaResponse: ""
      },
      headers: {
        "Content-Type": "application/json"
      },
      jar: this.jar
    };
    return request.post(opts)
      .catch((err) => {
        // console.error(`Erro: ${err}`);
        return err.error
      });
  };

  /**
   * Gets the card balance, along with other info.
   *
   * @param {string} cardId - The card unique identification
   *
   * @return {Promise<Object>}
   */
  getBalance(cardId) {
    const opts = {
      url: `${URL}/user/card/balance`,
      qs: { selectedCardNumberId: cardId }
    };
    return request.get(opts)
      .then(response => JSON.parse(response))
      .catch((err) => console.error(err));
  };

  /**
   * Gets all cards of the user
   *
   * @return {Promise<Object>}
   */
  getCards() {
    const opts = {
      url: `${URL}/user/card/preference/list`,
      jar: this.jar
    };
    return request.get(opts)
      .then(response => JSON.parse(response))
      .catch((err) => console.error(err));
  };

  /**
   * Gets the transactions made between two dates
   *
   * @param {object} params - An object containing the search parameters
   * @param {object} params.selectedCardNumberId - Card unique ID
   * @param {object} params.daysAgo - Amount of days to be counted backwards which have transactions
   * @param {object} params.startDate - Initial date of the search
   * @param {object} params.endDate - Final date of the search
   */
  getMovement(params = {}) {
    const opts = {
      url: `${URL}/user/card/movement`,
      qs: params
    }
    return request.get(opts)
      // .then(response => console.log(response))
      .catch(err => console.error(err));
  }
}

module.exports = Alelo
