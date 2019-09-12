function createDirListingFilePathsJob (execlib, DirListingFileNamesJob, Path) {
  'use strict';

  var lib = execlib.lib;

  function DirListingFilePathsJob (path, defer) {
    DirListingFileNamesJob.call(this, path, defer);
  }
  lib.inherit(DirListingFilePathsJob, DirListingFileNamesJob);
  DirListingFilePathsJob.prototype._interpretFsOperationResult = function (result) {
    return lib.isArray(result) ? result.map(pather.bind(null, this.path)) : [];
  };

  function pather (leadingpath, filename) {
    return Path.join(leadingpath, filename);
  }

  return DirListingFilePathsJob;
}

module.exports = createDirListingFilePathsJob;
