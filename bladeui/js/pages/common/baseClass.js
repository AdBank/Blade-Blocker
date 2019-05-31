"use strict";

/* eslint-disable max-len */

class BaseClass
{
  constructor({onChangeView})
  {
    this.wrapper = document.getElementById("main-app-wrapper");
    this.emitViewChange = onChangeView;
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
