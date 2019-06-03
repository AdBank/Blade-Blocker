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
    const mainAppWrapper = document.getElementById("main-app-wrapper");

    this.toggler = document.getElementById("checkbox");
    const blockedCount = document.getElementById("blockedCount");

    browser.tabs.query({active: true, lastFocusedWindow: true}, tabs =>
    {
      if (mainAppWrapper && tabs.length)
      {
        this.initToggleOnOff({id: tabs[0].id, url: tabs[0].url})
      };
    });

    browser.runtime.sendMessage({type: "prefs.get", key: "blocked_total"}, (blockedTotal) => {
      if (blockedCount)
      {
        blockedCount.innerHTML = blockedTotal;
      }
    });

    mainAppWrapper.classList.remove("custom-bg");
  }

  initToggleOnOff(tab)
  {
    isPageWhitelisted(tab, whitelisted =>
      {
        if (whitelisted)
        {
          this.toggler.checked = false;
        }
      });

    this.toggler.addEventListener("change", () =>
    {
      if (this.toggler.checked)
      {
        browser.runtime.sendMessage({
          type: "filters.unwhitelist",
          tab
        });
      }
      else
      {
        browser.runtime.sendMessage({
          type: "filters.whitelist",
          tab
        });
      }
    });
  }
}

module.exports = Main;
