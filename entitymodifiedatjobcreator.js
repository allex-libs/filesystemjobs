function createEntityModifiedAtJob (execlib, EntityStatsJob) {
  'use strict';

  var lib = execlib.lib;

  function EntityModifiedAtJob (path, defer) {
    EntityStatsJob.call(this, path, defer);
  }
  lib.inherit(EntityModifiedAtJob, EntityStatsJob);
  EntityModifiedAtJob.prototype.targetFStatsPropertyName = 'mtimeMs';

  return EntityModifiedAtJob;
}

module.exports = createEntityModifiedAtJob;
