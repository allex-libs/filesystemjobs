function createEntityOfTypeExistsJob (execlib, EntityExistsJob, EntityIsOfTypeJob, fsutils) {
  'use strict';

  var lib = execlib.lib,
    q = lib.q,
    qlib = lib.qlib,
    JobBase = qlib.JobBase;

  function EntityOfTypeExists (path, type, defer) {
    JobBase.call(this, defer);
    this.path = fsutils.surePath(path);
    this.type = type;
  }
  lib.inherit(EntityOfTypeExists, JobBase);
  EntityOfTypeExists.prototype.destroy = function () {
    this.type = null;
    this.path = null;
    JobBase.prototype.destroy.call(this);
  };
  EntityOfTypeExists.prototype.go = function () {
    var ret;
    if (!this.defer) {
      return q.reject(new lib.Error('ALREADY_DESTROYED', this.constructor+' instance is already destroyed'));
    }
    if (!(this.path && this.type)) {
      return q.reject(new lib.Error('ALREADY_DESTROYED', this.constructor+' instance is already destroyed'));
    }
    ret = this.defer.promise;
    (new EntityExistsJob(this.path)).go().then(
      this.checkType.bind(this),
      this.reject.bind(this)
    );
    return ret;
  };
  EntityOfTypeExists.prototype.checkType = function () {
    if (!this.defer) {
      return;
    }
    if (!(this.path && this.type)) {
      this.reject(new lib.Error('ALREADY_DESTROYED', this.constructor+' instance is already destroyed'));
      return;
    }
    qlib.promise2defer((new EntityIsOfTypeJob(this.path, this.type)).go(), this);
  };

  return EntityOfTypeExists;
}

module.exports = createEntityOfTypeExistsJob;

