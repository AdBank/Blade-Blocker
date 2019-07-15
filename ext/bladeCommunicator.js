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
    if (request.userBladeId)
    {
      // browser.storage.sync.set({userBladeId: request.userBladeId}); need to change it, this functionality should be in replacer
      sendResponse({userBladeIdReceived: true});
    }
  });
