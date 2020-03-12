/* eslint-disable max-len */

"use strict";

browser.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) =>
  {
    // listener on message when replacer is installed
    if (request.isExtensionInstalled)
    {
      sendResponse({blockerInstalled: true});
    }

    // listener on message when replacer sends user bladeid (after user signin/signup)
    if (request.userBladeId) {
      sendResponse({userBladeIdReceived: true});

      setTimeout(() => {
        browser.tabs.query({active: true, lastFocusedWindow: true})
          .then(tabs => {
            if (tabs.length > 0) {
              browser.runtime.sendMessage({
                type: "filters.whitelist",
                tab: {id: tabs[0].id, url: tabs[0].url}
              }).then(() => {
                browser.runtime.sendMessage({
                  type: "filters.unwhitelist",
                  tab: {id: tabs[0].id, url: tabs[0].url}
                });
              });
            }
          });
      }, 1000)
    }
  });
