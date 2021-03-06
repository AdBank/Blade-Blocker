/*
 * This file is part of Adblock Plus <https://adblockplus.org/>,
 * Copyright (C) 2006-present eyeo GmbH
 *
 * Adblock Plus is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * Adblock Plus is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Adblock Plus.  If not, see <http://www.gnu.org/licenses/>.
 */

"use strict";

/**
 * A <code>Recommendation</code> object represents a recommended filter
 * subscription.
 */
class Recommendation
{
  /**
   * Creates a <code>Recommendation</code> object from the given source object.
   * @param {object} source The source object.
   * @private
   */
  constructor(source)
  {
    this._source = source;
  }

  /**
   * The type of the recommended filter subscription.
   * @type {string}
   */
  get type()
  {
    return this._source.type;
  }

  /**
   * The languages of the recommended filter subscription.
   * @type {Array.<string>}
   */
  get languages()
  {
    return this._source.languages ? [...this._source.languages] : [];
  }

  /**
   * The title of the recommended filter subscription.
   * @type {string}
   */
  get title()
  {
    return this._source.title;
  }

  /**
   * The URL of the recommended filter subscription.
   * @type {string}
   */
  get url()
  {
    return this._source.url;
  }

  /**
   * The home page of the recommended filter subscription.
   * @type {string}
   */
  get homepage()
  {
    return this._source.homepage;
  }
}

/**
 * Yields <code>{@link Recommendation}</code> objects representing recommended
 * filter subscriptions.
 *
 * @yields {Recommendation} An object representing a recommended filter
 *   subscription.
 */
function* recommendations()
{
  for (let source of require("../data/subscriptions.json"))
    yield new Recommendation(source);
}

exports.recommendations = recommendations;
