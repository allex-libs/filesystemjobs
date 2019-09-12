function createFileMustExistJob (execlib, EntityMustBeOfTypeJob) {
  'use strict';

  var lib = execlib.lib;

  function FileMustExistJob (path, defer) {
    EntityMustBeOfTypeJob.call(this, path, 'f', defer);
  }
  lib.inherit(FileMustExistJob, EntityMustBeOfTypeJob);

  return FileMustExistJob;
}

module.exports = createFileMustExistJob;
