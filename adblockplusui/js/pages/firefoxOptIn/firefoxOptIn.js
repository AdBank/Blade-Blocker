"use strict";

const BaseClass = require("../common/baseClass");

class FirefoxOptIn extends BaseClass
{
  constructor(props)
  {
    super(props);
  }

  initListeners()
  {
    const enableButton = document.getElementById("enable-button");
    const cancelButton = document.getElementById("cancel-button");
    const wrapper = document.getElementById("main-app-wrapper");
    const privacyLink = document.getElementById("privacy-link");


    wrapper.classList.add("optin-view");


    enableButton.addEventListener("click", this.handleEnableClicked.bind(this));
    cancelButton.addEventListener("click", this.handleCancelClicked.bind(this));
    privacyLink.addEventListener("click", this.handleEnableClicked.bind(this));
  }

  handleCancelClicked() {
    browser.storage.local.set({firefoxOptInEnabled: false});
    window.close();
  }

  handleEnableClicked() {
    browser.storage.local.set(
      {firefoxOptInEnabled: true}).then(() => {
        super.handleChangeView("privacy");
      });
  }
}

module.exports = FirefoxOptIn;
