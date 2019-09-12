function createWriteJsonFileJob (execlib, WriteToFileJob) {
  'use strict';

  var lib = execlib.lib;

  function WriteJsonFile (data, path_or_options, defer) {
    WriteToFileJob.call(this, JSON.stringify(data, null, 2), path_or_options, defer);
  }
  lib.inherit(WriteJsonFile, WriteToFileJob);

  return WriteJsonFile;
}

module.exports = createWriteJsonFileJob;
