/* eslint-disable max-len */

"use strict";

const secretPhrase = require("./secretPhrase");
const confirmSecretPhrase = require("./confirmSecretPhrase");
const setExternalWallet = require("./setExternalWallet");
const registrationCompleted = require("./registrationCompleted");
const verifyKyc = require("./verifyKyc");
const termsAndConditions = require("./termsAndConditions");
const createPassword = require("./createPassword");
const termsAndConditionsText = require("./termsAndConditionsText");

module.exports = {
  secretPhrase,
  confirmSecretPhrase,
  setExternalWallet,
  registrationCompleted,
  verifyKyc,
  termsAndConditions,
  createPassword,
  termsAndConditionsText
};
