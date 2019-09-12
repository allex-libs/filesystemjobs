function createReadJsonFileJob (execlib, ReadAllFileJob) {
  'use strict';

  var lib = execlib.lib;

  function ReadJsonFileJob (path_or_options, defer) {
    /*
    if (lib.isString(path_or_options) || lib.isArray(path_or_options)) {
      path_or_options = {path: path_or_options, encoding: 'utf8'};
    } else if (!path_or_options.encoding) {
      path_or_options.encoding = 'utf8';
    }
    */
    ReadAllFileJob.call(this, path_or_options, defer);
  }
  lib.inherit(ReadJsonFileJob, ReadAllFileJob);
  ReadJsonFileJob.prototype._interpretFsOperationResult = function (result) {
    try {
      return JSON.parse(result);
    }
    catch (ignore) {
      return null;
    }
  };

  return ReadJsonFileJob;
}

module.exports = createReadJsonFileJob;
