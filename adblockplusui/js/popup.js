/* eslint-disable max-len */
/*
 * This file is part of Adblock Plus <https://adblockplus.org/>,
 * Copyright (C) 2006-present eyeo GmbH
 *
 * Adblock Plus is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * Adblock Plus is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Adblock Plus.  If not, see <http://www.gnu.org/licenses/>.
 */

"use strict";

require("./io-big-toggle.js");
require("./popup.notifications.js");
const { detect } = require('detect-browser');
const browserName = detect();

const {
  main,
  firefoxOptIn,
  privacy
} = require("./html/index.js");

const {
  Main,
  FirefoxOptIn,
  Privacy
} = require("./pages/index.js");

function onChangeView(next, previous)
{
  const mainWrapper = document.getElementById("main-app-wrapper");

  while (mainWrapper.firstChild)
  {
    mainWrapper.removeChild(mainWrapper.firstChild);
  }

  loadPage(next, previous);
}

function loadPage(page)
{
  switch(page) {
    case 'main': {
      const initialView = new Main({onChangeView});
      initialView.render(main);
      break;
    }
    case 'firefoxOptIn': {
      const initialView = new FirefoxOptIn({onChangeView});
      initialView.render(firefoxOptIn);
      break;
    }
    case 'privacy': {
      const initialView = new Privacy({onChangeView});
      initialView.render(privacy);
      break;
    }
  }
}

async function showOptIn() {
  const promise = new Promise(resolve => {
    browser.storage.local.get(null).then(data => {
      if (data && browserName && browserName.name === "firefox") {
        if (!data.firefoxOptInShown || !data.firefoxOptInEnabled) {
          browser.storage.local.set({firefoxOptInShown: true, bladeCurrentPage: "firefoxOptIn"})
          loadPage('firefoxOptIn');
          resolve(true);
        }
        else if (!data.privacyShown || !data.privacyEnabled) {
          browser.storage.local.set({privacyShown: true, bladeCurrentPage: "privacy"})
          loadPage('privacy');
          resolve(true);
        } else {
          resolve(false);  
        }
      } else {
        resolve(false);
      }
    });
  })

  return promise;
}

async function renderInitialView()
{
  loadPage('main');
}

// platform and application dataset bootstrap
Promise.all([
  // one is used to hide the Issue Reporter due EdgeHTML bug
  // the Issue Reporter should work once MSEdge ships with Chromium instead
  browser.runtime.sendMessage({
    type: "app.get",
    what: "platform"
  }),
  // one is used to hide all Edge specific things (i.e. 3rd parts links)
  browser.runtime.sendMessage({
    type: "app.get",
    what: "application"
  })
]).then(([platform, application]) =>
{
  // this won't ever change during ABP lifecycle, which is why
  // it's set ASAP as data-platform attribute, on the most top element,
  // instead of being one of the body classes
  const {dataset} = document.documentElement;
  dataset.platform = platform;
  dataset.application = application;
});

// create the tab object once at the right time
// and make it available per each getTab.then(...)

document.addEventListener("DOMContentLoaded", async () =>
{
  const optInShown = await showOptIn();

  if (!optInShown) {
    renderInitialView();
  }
});
