function createReadAllFileJob (execlib, FileOperationJobBase) {
  'use strict';

  var lib = execlib.lib;

  function ReadAllFileJob (path_or_options, defer) {
    FileOperationJobBase.call(this, path_or_options, defer);
  }
  lib.inherit(ReadAllFileJob, FileOperationJobBase);
  ReadAllFileJob.prototype.FsOperationName = 'readFile';

  return ReadAllFileJob;
}

module.exports = createReadAllFileJob;
