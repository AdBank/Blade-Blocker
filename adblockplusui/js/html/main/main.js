/* eslint-disable max-len */

"use strict";

const checkbox = require("../common/checkbox");

const html = `
<div class="main-view flex-column">
  <div class="top-label">
    <p><i class="fa fa-exclamation"></i>You must install Blade Crypto Rewards +</p>
    <a href="https://blade.software/" target="_blank" rel="noopener noreferrer" class="cta-link">DOWNLOAD NOW</a>
  </div>
  <div class="faq">
    <a href="https://blade.software/faq.html" target="_blank" rel="noopener noreferrer" class="caption">Learn why you need two extensions here.</a>
  </div>
  <div class="logo">
    <img src="./skin/blade_assets/blade-powered-adbank-logo.svg" 
    alt="blade logo" />
  </div>
  <div class="content">
    <p class="count" id="blockedCount"></p>
    <p class="caption-count">CURRENT BLOCKS</p>
  </div>
  <footer>
    <div class="version"><p class="text">Version</p><p class="version-number">1.0.2</p></div>
    <div class="toggler" id="toggler"><p>Status</p>${checkbox(true)}</div>
  </footer>
</div>
`;

module.exports = html;
