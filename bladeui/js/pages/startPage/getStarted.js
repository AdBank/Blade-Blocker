/* eslint-disable max-len */

"use strict";

const BaseClass = require("../common/baseClass");

class GetStarted extends BaseClass
{
  constructor(props)
  {
    super(props);
  }

  initListeners()
  {
    const btn = document.getElementById("action-btn");
    const mainAppWrapper = document.getElementById("main-app-wrapper");

    mainAppWrapper.classList.add("custom-bg");

    // btn.addEventListener("click", this.handleOpenNextPage.bind(this));
  }

  handleOpenNextPage()
  {
    super.handleChangeView("main");
  }
}

module.exports = GetStarted;
