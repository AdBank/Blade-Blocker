/* eslint-disable */
"use strict";

const URL = "http://ec2-3-81-128-247.compute-1.amazonaws.com:8088";

function getAdserverUrl()
{
  fetch(URL + "/api/config/adserver")
  .then(response => response.json())
  .then(data => {
    const adbankUrl = data.adserver_url;

    saveAdserverUrl(adbankUrl);
  })
  .catch((err) =>
  {
    console.error(err);
  });
}

function saveAdserverUrl(url)
{
  browser.storage.sync.set({bladeAdserverUrl: url}, (data) =>
  {
    console.log(data);
  });
}

module.exports = getAdserverUrl;
