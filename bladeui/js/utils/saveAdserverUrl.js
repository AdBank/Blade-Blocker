"use strict";

function getAdserverUrl()
{
  fetch("/api/config/adserver")
  .then((response) =>
  {
    const adbankUrl = response.data.adserver_url;

    saveAdserverUrl(adbankUrl);
  })
  .catch((err) =>
  {
    console.error(err);
  });
}

function saveAdserverUrl(url)
{
  browser.storage.sync.set({
    bladeAdserverUrl: url
  });
}

module.exports = getAdserverUrl;
