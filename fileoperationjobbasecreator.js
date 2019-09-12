function createFileOperationJobBase (execlib, FsPathOnlyJobBase) {
  'use strict';

  var lib = execlib.lib;

  function FileOperationJobBase (path_or_options, defer) {
    this.options = null;
    if (lib.isString(path_or_options) || lib.isArray(path_or_options)) {
      FsPathOnlyJobBase.call(this, path_or_options, defer);
    } else {
      FsPathOnlyJobBase.call(this, path_or_options.path, defer);
      this.options = path_or_options;
    }
  }
  lib.inherit(FileOperationJobBase, FsPathOnlyJobBase);
  FileOperationJobBase.prototype.destroy = function () {
    this.options = null;
    FsPathOnlyJobBase.prototype.destroy.call(this);
  };
  FileOperationJobBase.prototype._additionalFsOperationParameters = function () {
    if (this.options) {
      return [this.options];
    }
    return FsPathOnlyJobBase.prototype._additionalFsOperationParameters.call(this);
  };

  return FileOperationJobBase;
}

module.exports = createFileOperationJobBase;
