/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';


var
  yml = require('../utilities/file/require-yaml'),
  env = require("cfenv").getAppEnv();

var bluemixUrl = function (appName) {
   return env.url.indexOf('.stage1.mybluemix.net') != -1
     ? appName + '.stage1.mybluemix.net'
     : appName + '.mybluemix.net';
   }

var
  ENV = process.env.NODE_ENV,
  APP_NAME = env.name,
  DOMAIN   = env.isLocal ? 'server.local'
                         : bluemixUrl(APP_NAME),

  PORT = env.isLocal ? 3000 : env.port,
  PROTOCOL = process.env.SECURE_EXPRESS ? 'https' : 'http',
  URL  = ENV === 'production'
    ? PROTOCOL + '://' + DOMAIN
    : PROTOCOL + '://' + DOMAIN + ':' + PORT;

module.exports = {
  app_name    : APP_NAME,
  domain      : DOMAIN,
  environment : ENV,
  port        : PORT,
  url         : URL
};
