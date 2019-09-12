function createRmFileJob (execlib, FileOperationJobBase) {
  'use strict';

  var lib = execlib.lib;

  function RmFileJob (path_or_options, defer) {
    FileOperationJobBase.call(this, path_or_options, defer);
  }
  lib.inherit(RmFileJob, FileOperationJobBase);
  RmFileJob.prototype.FsOperationName = 'unlink';
  RmFileJob.prototype._interpretFsOperationResult = function (ignore) {
    return true;
  };

  return RmFileJob;
}

module.exports = createRmFileJob;
