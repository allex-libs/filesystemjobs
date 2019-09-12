function createAppendToFileJob (execlib, WriteToFileJob) {
  'use strict';

  var lib = execlib.lib;

  function AppendToFileJob (data, path_or_options, defer) {
    WriteToFileJob.call(this, data, path_or_options, defer);
  }
  lib.inherit(AppendToFileJob, WriteToFileJob);
  AppendToFileJob.prototype.FsOperationName = 'appendFile';

  return AppendToFileJob;
}

module.exports = createAppendToFileJob;
