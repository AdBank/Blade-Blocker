const REPLACER_EXTENSION_ID = 'okgilpemcanifjabahmbpmgohnelcoko';

chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if (sender.id === REPLACER_EXTENSION_ID) {
      //listener on message when replacer is installed
      if (request.isExtensionInstalled) {
        sendResponse({blockerInstalled: true});
      }

      //listener on message when replacer sends user bladeid (after user signin/signup)
      if (request.userBladeId) {
        browser.storage.sync.set({userBladeId: request.userBladeId});
        sendResponse({userBladeIdReceived: true});
      }
    }

});