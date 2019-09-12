function createFileExistsJob (execlib, EntityOfTypeExistsJob) {
  'use strict';

  var lib = execlib.lib;

  function FileExistsJob (path, defer) {
    EntityOfTypeExistsJob.call(this, path, 'f', defer);
  }
  lib.inherit(FileExistsJob, EntityOfTypeExistsJob);

  return FileExistsJob;
}

module.exports = createFileExistsJob;
