function createEnsureDirJob (execlib, FsPathJobBase, Fs) {
  'use strict';

  var lib = execlib.lib,
    qlib = lib.qlib;

  function EnsureDirJob (path, defer) {
    FsPathJobBase.call(this, path, defer);
  }
  lib.inherit(EnsureDirJob, FsPathJobBase);
  EnsureDirJob.prototype._run = function () {
    qlib.promise2defer(Fs.ensureDir(this.path), this);
    return this.defer.promise;
  };

  return EnsureDirJob;
}

module.exports = createEnsureDirJob;
