function createDirListingJob (execlib, FsPathOnlyJobBase) {
  'use strict';

  var lib = execlib.lib;

  function DirListing (path, defer) {
    FsPathOnlyJobBase.call(this, path, defer);
  }
  lib.inherit(DirListing, FsPathOnlyJobBase);
  DirListing.prototype.FsOperationName = 'readdir';

  return DirListing;
}

module.exports = createDirListingJob;
