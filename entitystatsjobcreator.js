function createEntityStatsJob (execlib, FsPathJobBase, fsutils) {
  'use strict';

  var lib = execlib.lib;

  function EntityStatsJob (path, defer) {
    FsPathJobBase.call(this, path, defer);
  }
  lib.inherit(EntityStatsJob, FsPathJobBase);
  EntityStatsJob.prototype._run = function () {
    fsutils.FStatsPromised(this.path).then(
      this._onFileStats.bind(this),
      this.resolve.bind(this, '')
    );
    return this.defer.promise;
  };
  EntityStatsJob.prototype._onFileStats = function (fstats) {
    this.finalize(this.targetFStatsPropertyName ?
      fstats[this.targetFStatsPropertyName]
      :
      fstats
    );
  };
  EntityStatsJob.prototype.finalize = function (fstatsresult) {
    if (!lib.isVal(fstatsresult)) {
      this.resolve(null);
      return;
    }
    this.resolve(this.finallyProcess(fstatsresult));
  };
  EntityStatsJob.prototype.finallyProcess = function (fstatsresult) {
    return fstatsresult;
  };
  EntityStatsJob.prototype.targetFStatsPropertyName = null;

  return EntityStatsJob;
}

module.exports = createEntityStatsJob;

