/* eslint-disable max-len */

"use strict";

const BaseClass = require("../common/baseClass");

class Main extends BaseClass
{
  constructor(props)
  {
    super(props);
  }

  initListeners()
  {
    const mainAppWrapper = document.getElementById("main-app-wrapper");

    mainAppWrapper.classList.remove("custom-bg");
  }
}

module.exports = Main;
