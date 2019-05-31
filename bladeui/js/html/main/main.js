/* eslint-disable max-len */

"use strict";

const checkbox = require("../common/checkbox");

const html = `
<div class="main-view flex-column">
  <div class="logo">
    <img src="./skin/blade_assets/blade-powered-adbank-logo.svg" 
    alt="blade logo" />
  </div>
  <div class="content">
    <p class="count" id="blockedCount"></p>
    <p class="caption-count">CURRENT BLOCKS</p>
  </div>
  <footer>
    <div class="version"><p class="text">Version</p><p class="version-number">0.0.1</p></div>
    <div class="toggler" id="toggler"><p>Status</p>${checkbox(true)}</div>
  </footer>
</div>
`;

module.exports = html;
