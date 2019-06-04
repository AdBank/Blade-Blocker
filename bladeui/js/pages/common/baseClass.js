"use strict";

/* eslint-disable max-len */

const INCOMPLETE_SETUP_PAGE = "getStarted";

class BaseClass
{
  constructor({onChangeView})
  {
    this.wrapper = document.getElementById("main-app-wrapper");
    this.emitViewChange = onChangeView;

    browser.storage.onChanged.addListener(this.listenOnUserDataCleanUp.bind(this));
  }

  listenOnUserDataCleanUp(changes, area)
  {
    if (area === "sync")
    {
      const changedItems = Object.keys(changes);
      for (const item of changedItems)
      {
        if (item === "bladeReplacerInstalled" && changes[item].newValue === false)
        {
          this.handleChangeView(INCOMPLETE_SETUP_PAGE);
        }
      }
    }
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
