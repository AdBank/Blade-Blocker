/* eslint-disable max-len*/

"use strict";

const headerNavbar = require("../common/headerNavbar");
const backButtonWithTitle = require("../common/backButtonWithTitle");
const input = require("../common/input");
const textarea = require("../common/textarea");

const html = `
<div class="referrals-view flex-column">
  ${headerNavbar("referrals")}
  <div class="content">
    ${backButtonWithTitle("Copy the code")}
    <div class="phrase-wrapper">
      <button id="referral-code" class="referral-code" type="button">

      </button>
      <p class="tooltip hidden" id="tooltip">Copied!</p>
      <div class="action-phrase-buttons">
        <button class="copy" id="copy-button">
          <i class="fa fa-copy"></i>
        </button>
      </div>
    </div>
  </div>
</div>
`;

module.exports = html;
