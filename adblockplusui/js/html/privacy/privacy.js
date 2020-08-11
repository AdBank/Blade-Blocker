/* eslint-disable max-len */

"use strict";

const html = `
<div class="privacy-view flex-column">
<h1>BLADE ad blocker+ extension</h1>
<p>When you use the BLADE ad blocker+ browser extension, some of your data is collected and processed by underlying Adblock Plus extension:</p>

<h2>Extension update checks</h2>
<p>Your browser periodically checks for updates of all your extensions, including BLADE ad blocker+. Some general information - browser version, extension version, operating system, date of last update and your IP address - are transmitted during an update check. Updates to BLADE ad blocker+ for Firefox are handled by the Mozilla website and are subject to the <a href="https://www.mozilla.org/ru/privacy/" target="_blank" rel="noopener noreferrer">Mozilla's Privacy Policy</a>. Updates to BLADE ad blocker+ for Chrome are handled by the Google Web Store website and are subject to the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>. 

<h2>Emergency notification</h2>
<p>BLADE ad blocker+ contains an emergency notification mechanism that allows it to notify users about important issues affecting their BLADE ad blocker+ installation. This feature requires all BLADE ad blocker+ installations to query an address in the AdblockPlus.org domain regularly to retrieve the list of active notifications. This request makes your IP address visible to the website and also sends some general information like version of the underlying Adblock Plus extension, browser, browser version and the number of previous BLADE ad blocker+ downloads (the download number is limited to four, and will be displayed as 4+ after reaching this number). This data allows serving different notifications to different clients and is subject to this <a href="https://adblockplus.org/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</p>

<h2>Data retention</h2>
<p>Data related to extension update checks, emergency notifications is automatically removed after 30 days. BLADE ad blocker+ stores some data in <a href="http://support.mozilla.com/kb/Profiles" target="_blank" rel="noopener noreferrer">the Firefox profile</a> on your computer. BLADE ad blocker+ never transmits this data to any servers, but other extensions and services, such as <a href="https://www.mozilla.org/ru/privacy/websites/" target="_blank" rel="noopener noreferrer">Firefox Sync</a>, may do so. Most of the data is unobjectionable privacy-wise. However, filter hit statistics and recent issue reports could be used to reconstruct your browsing history. Adblock Plus treats this information identically to how history data is treated by the browser; this data isn't stored if you are using <a href="http://support.mozilla.com/kb/Private+Browsing" target="_blank" rel="noopener noreferrer">private browsing mode</a> and is removed if you choose to clear your browsing history.</p>

<a style="display: block; margin-top: 10px;" href="https://adblockplus.org/privacy" target="_blank" rel="noopener noreferrer">Adblock Plus Privacy Policy</a>.

  <div class="button-container">
    <button id="ok-button">Ok</button>
  </div>
</div>
`;

module.exports = html;
