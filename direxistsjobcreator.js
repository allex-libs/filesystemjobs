function createDirExistsJob (execlib, EntityOfTypeExistsJob) {
  'use strict';

  var lib = execlib.lib;

  function DirExistsJob (path, defer) {
    EntityOfTypeExistsJob.call(this, path, 'd', defer);
  }
  lib.inherit(DirExistsJob, EntityOfTypeExistsJob);

  return DirExistsJob;
}

module.exports = createDirExistsJob;
