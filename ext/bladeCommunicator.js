//listener on message when replacer is installed
const REPLACER_EXTENSION_ID = 'okgilpemcanifjabahmbpmgohnelcoko';

chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if (sender.id === REPLACER_EXTENSION_ID) {
      if (request.isExtensionInstalled) {
        sendResponse({blockerInstalled: true})
      }
    }
});

//listener on message when replacer sends user bladeid (after user signin/signup)