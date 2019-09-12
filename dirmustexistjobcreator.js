function createDirMustExistJob (execlib, EntityMustBeOfTypeJob) {
  'use strict';

  var lib = execlib.lib;

  function DirMustExistJob (path, defer) {
    EntityMustBeOfTypeJob.call(this, path, 'd', defer);
  }
  lib.inherit(DirMustExistJob, EntityMustBeOfTypeJob);

  return DirMustExistJob;
}

module.exports = createDirMustExistJob;
