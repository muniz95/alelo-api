'use strict';

var expect = require('chai').expect;
var Alelo = require('../dist/index');

describe('#alelo', function() {
    it('should deny access using wrong CPF/password', function() {
        var alelo = new Alelo("00000000000", "SomeWrongPassword");
        return alelo.login().then((response) => expect(response.alertCode).to.equal("205"));
    });
});
