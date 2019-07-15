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

const {
  main
} = require("./html/index.js");

const {
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

function loadPage()
{
  const initialView = new Main({onChangeView});
  initialView.render(main);
}

async function renderInitialView()
{
  loadPage();
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
  await renderInitialView();
});
