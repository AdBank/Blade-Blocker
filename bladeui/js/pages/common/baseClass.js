"use strict";

/* eslint-disable */

const INCOMPLETE_SETUP_PAGE = "getStarted";
const FIRST_PAGE = "main";

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

    browser.storage.onChanged.addListener(this.listenOnUserDataCleanUp.bind(this));
  }

  listenOnUserDataCleanUp(changes, area)
  {
    if (area === "sync")
    {
      const changedItems = Object.keys(changes);
      for (const item of changedItems)
      {
        if (item === "bladeReplacerInstalled" && (changes[item].newValue === false || changes[item].newValue === undefined))
        {
          this.handleChangeView(INCOMPLETE_SETUP_PAGE);

          console.log("i clear storage");
          browser.storage.sync.clear();
        }
        if (item === "bladeReplacerInstalled" && changes[item].newValue === true)
        {
          this.handleChangeView(FIRST_PAGE);
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
