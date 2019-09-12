function createRmDirJob (execlib, FsPathJobBase, Fs) {
  'use strict';

  var lib = execlib.lib,
    qlib = lib.qlib;

  function RmDirJob (path, defer) {
    FsPathJobBase.call(this, path, defer);
  }
  lib.inherit(RmDirJob, FsPathJobBase);
  RmDirJob.prototype._run = function () {
    qlib.promise2defer(Fs.remove(this.path), this);
    return this.defer.promise;
  };

  return RmDirJob;
}

module.exports = createRmDirJob;
