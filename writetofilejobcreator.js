function createWriteToFileJob (execlib, FileOperationJobBase) {
  'use strict';

  var lib = execlib.lib;

  function WriteToFileJob (data, path_or_options, defer) {
    FileOperationJobBase.call(this, path_or_options, defer);
    this.data = data;
  }
  lib.inherit(WriteToFileJob, FileOperationJobBase);
  WriteToFileJob.prototype.destroy = function () {
    this.data = null;
    FileOperationJobBase.prototype.destroy.call(this);
  };
  WriteToFileJob.prototype.FsOperationName = 'writeFile';
  WriteToFileJob.prototype._additionalFsOperationParameters = function () {
    var ret = FileOperationJobBase.prototype._additionalFsOperationParameters.call(this);
    ret.unshift(this.data);
    return ret;
  };
  WriteToFileJob.prototype._interpretFsOperationResult = function (ignore) {
    return true;
  };

  return WriteToFileJob;
}

module.exports = createWriteToFileJob;
