"use strict";

/* eslint-disable */

const saveAdserverUrl = require("../../utils/saveAdserverUrl");

class BaseClass
{
  constructor({onChangeView})
  {
    this.wrapper = document.getElementById("main-app-wrapper");
    this.emitViewChange = onChangeView;

    browser.storage.sync.get(null, data =>
      {
        if (!data.bladeAdserverUrl)
        {
          saveAdserverUrl();
        }
      }
    );
  }

  _setNotauthorizedIcon()
  {
    browser.browserAction.setIcon({
      path: "/icons/blade/blade-16-whitelisted.png"
    });
  }

  _setAuthorizedIcon()
  {
    browser.browserAction.setIcon({
      path: "/icons/blade/blade-16.png"
    });
  }

  initListeners()
  {
    // The error is thrown because this method is required to implement in child classes
    throw new Error("you must implement this method");
  }

  handleChangeView(next)
  {
    this.emitViewChange(next);
  }

  render(html)
  {
    this.wrapper.insertAdjacentHTML("beforeend", html);
    this.initListeners();
  }
}

module.exports = BaseClass;
