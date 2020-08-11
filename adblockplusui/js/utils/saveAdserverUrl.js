/* eslint-disable */
"use strict";

const URL = "https://ads.blade.software";

function getAdserverUrl() {
  fetch(URL + "/api/config/adserver")
    .then((response) => response.json())
    .then((data) => {
      const adbankUrl = data.adserver_url;

      saveAdserverUrl(adbankUrl);
    })
    .catch((err) => {
      console.error(err);
    });
}

function saveAdserverUrl(url) {
  browser.storage.sync.set({ bladeAdserverUrl: url }, (data) => {
    console.log(data);
  });
}

module.exports = getAdserverUrl;
