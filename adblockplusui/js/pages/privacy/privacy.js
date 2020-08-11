/* eslint-disable max-len */

"use strict";

const BaseClass = require("../common/baseClass");
const {isPageWhitelisted} = require("../../popup.utils.js");

class Main extends BaseClass
{
  constructor(props)
  {
    super(props);
  }

  initListeners()
  {
    const okButton = document.getElementById("ok-button");
    const wrapper = document.getElementById("main-app-wrapper");


    wrapper.classList.add("optin-view");
    okButton.addEventListener('click', this.handleOkClick.bind(this));
  }

  handleOkClick()
  {
    browser.storage.local.set(
      {privacyEnabled: true}).then(() => {
        super.handleChangeView("main");
      });
  }
}

module.exports = Main;
