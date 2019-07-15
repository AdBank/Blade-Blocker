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
      sendResponse({userBladeIdReceived: true});
    }
  });
