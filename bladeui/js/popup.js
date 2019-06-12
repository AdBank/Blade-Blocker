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

require("./popup.notifications.js");
const {
  getStarted,
  main
} = require("./html/index.js");

const {
  GetStartedPage,
  Main
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

function loadPage(page = "getStarted")
{
  switch (page)
  {
    case "getStarted": {
      const initialView = new GetStartedPage({onChangeView});
      initialView.render(getStarted);
      break;
    }
    case "main": {
      const initialView = new Main({onChangeView});
      initialView.render(main);
      break;
    }
    default: {
      console.error(`Page '${page}' is not declared`);
    }
  }

  setViewToStorage(page);
}

async function renderInitialView()
{
  const promise = new Promise(resolve => {
    browser.storage.local.get("bladeCurrentPage").then((view) =>
    {
      loadPage(view.bladeCurrentPage);
      resolve();
    });
  });

  return promise;
}

function setViewToStorage(view)
{
  browser.storage.local.set({bladeCurrentPage: view});
}

browser.runtime.sendMessage({
  type: "app.get",
  what: "platform"
}).then(platform =>
{
  // this won't ever change during ABP lifecycle, which is why
  // it's set ASAP as data-platform attribute, on the most top element,
  // instead of being one of the body classes
  document.documentElement.dataset.platform = platform;
});


document.addEventListener("DOMContentLoaded", async () =>
{
  const REPLACER_EXTENSION_ID = "piflhcebimeekhiijcnfifobipcpjggn";

  await renderInitialView();

  browser.runtime.sendMessage(REPLACER_EXTENSION_ID, {isExtensionInstalled: true},
    function(response) 
    {
      if (response && response.replacerInstalled)
      {
        browser.storage.sync.set({bladeReplacerInstalled: true})
      }
      else 
      {
        browser.storage.sync.set({bladeReplacerInstalled: false})
      }
    }
  );
});
