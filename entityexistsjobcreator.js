function createEntityExistsJob (execlib, FsPathOnlyJobBase, fsutils, Fs) {
  'use strict';

  var lib = execlib.lib;

  function EntityExistsJob (path, defer) {
    FsPathOnlyJobBase.call(this, path, defer);
  }
  lib.inherit(EntityExistsJob, FsPathOnlyJobBase);
  EntityExistsJob.prototype.FsOperationName = 'access';
  EntityExistsJob.prototype._interpretFsOperationResult = function (result) {
    return true;
  };
  EntityExistsJob.prototype._interpretFsOperationError = function (exception) {
    this.resolve(false);
  };
  EntityExistsJob.prototype._additionalFsOperationParameters = function () {
    return [Fs.constants.F_OK];
  };

  return EntityExistsJob;
}

module.exports = createEntityExistsJob;
