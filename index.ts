/// <reference path="typings/tsd.d.ts" />

import ModuleBridge =  require ("./moduleBridge/ModuleBridge");

var inv: mykoop.IModuleBridge = new ModuleBridge();
export = inv;

