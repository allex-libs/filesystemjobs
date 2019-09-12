function createFsPathOnlyJobBaseCreator (execlib, FsPathJobBase, Fs) {
  'use strict';

  var lib = execlib.lib;

  function FsPathOnlyJobBase (path, defer) {
    FsPathJobBase.call(this, path, defer);
  }
  lib.inherit(FsPathOnlyJobBase, FsPathJobBase);
  FsPathOnlyJobBase.prototype._run = function () {
    var op = Fs[this.FsOperationName], params;
    if (!lib.isFunction(op)) {
      throw new lib.Error('NOT_A_FILESYSTEM_FUNCTION', this.FsOperationName+' is not a function of the filesystem library');
    }
    //Fs[this.FsOperationName](this.path, this._onFsOperation.bind(this));
    params = [this.path];
    params.push.apply(params, this._additionalFsOperationParameters());
    params.push(this._onFsOperation.bind(this));
    op.apply(Fs, params);
    return this.defer.promise;
  };
  FsPathOnlyJobBase.prototype._onFsOperation =  function (err, result) {
    if (err) {
      this._interpretFsOperationError(err);
      return;
    }
    this.resolve(this._interpretFsOperationResult(result));
  };
  FsPathOnlyJobBase.prototype._interpretFsOperationResult = function (result) {
    return result;
  };
  FsPathOnlyJobBase.prototype._interpretFsOperationError = function (exception) {
    this.reject(exception);
  };
  FsPathOnlyJobBase.prototype._additionalFsOperationParameters = function () {
    return [];
  };

  return FsPathOnlyJobBase;
}

module.exports = createFsPathOnlyJobBaseCreator;
