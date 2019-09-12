function createEntityTypeJob (execlib, FsPathJobBase, fsutils) {
  'use strict';

  var lib = execlib.lib;

  function EntityTypeJob (path, defer) {
    FsPathJobBase.call(this, path, defer);
  }
  lib.inherit(EntityTypeJob, FsPathJobBase);
  EntityTypeJob.prototype._run = function () {
    fsutils.fileTypePromised(this.path).then(
      this._onFileType.bind(this),
      this.resolve.bind(this, '')
    );
    return this.defer.promise;
  };
  EntityTypeJob.prototype._onFileType = function (typestring) {
    if (lib.isString(typestring)) {
      if (typestring.length===1) {
        this.resolve(typestring);
        return;
      }
      throw new lib.Error('FSUTILS_FILETYPE_INCOSISTENCY', 'fsutils.fileType has to return a string that can only be 1 in length');
    }
    this.resolve('');
  };

  return EntityTypeJob;
}

module.exports = createEntityTypeJob;

