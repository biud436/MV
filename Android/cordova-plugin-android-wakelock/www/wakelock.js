/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var exec = require('cordova/exec');

function WakeLock() {
  throw new Error("This is static class.");
}

WakeLock.prototype.constructor = WakeLock;

WakeLock.init = function () {
  exec(null, null, "WakeLock", "init", [null]);
};

WakeLock.errorCallback = function (error) {
  console.error(error);
};

WakeLock.setDataToPointer = function (params, pointer) {
  pointer = params;
};

WakeLock.getScreenWidth = function (pointer) {
  exec(WakeLock.setDataToPointer(winParams, pointer), WakeLock.errorCallback, "WakeLock", "getScreenWidth", [null]);
};

WakeLock.getScreenHeight = function (pointer) {
  exec(WakeLock.setDataToPointer(winParams, pointer), WakeLock.errorCallback, "WakeLock", "getScreenHeight", [null]);
};

WakeLock.getScreenDestiny = function (pointer) {
  exec(WakeLock.setDataToPointer(winParams, pointer), WakeLock.errorCallback, "WakeLock", "getScreenDestiny", [null]);
};

module.exports = WakeLock;
