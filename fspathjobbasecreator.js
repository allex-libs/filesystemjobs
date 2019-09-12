function createFsPathJobBaseCreator (execlib, fsutils) {
  'use strict';

  var lib = execlib.lib,
    qlib = lib.qlib,
    JobBase = qlib.JobBase;

  function FsPathJobBase (path, defer) {
    this.path = fsutils.surePath(path);
    JobBase.call(this, defer);
  }
  lib.inherit(FsPathJobBase, JobBase);
  FsPathJobBase.prototype.destroy = function () {
    this.path = null;
    JobBase.prototype.destroy.call(this);
  };
  FsPathJobBase.prototype.go = function () {
    if (this.path === null) {
      return q.reject(new lib.Error('FS_JOB_ALREADY_DONE', this.constructor+' Job has path === null, therefore it is assumed done'));
    }
    return this._run();
  };

  return FsPathJobBase;
}

module.exports = createFsPathJobBaseCreator;
