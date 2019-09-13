function createEntityCreatedAtJob (execlib, EntityStatsJob) {
  'use strict';

  var lib = execlib.lib;

  function EntityCreatedAtJob (path, defer) {
    EntityStatsJob.call(this, path, defer);
  }
  lib.inherit(EntityCreatedAtJob, EntityStatsJob);
  EntityCreatedAtJob.prototype.targetFStatsPropertyName = 'birthtimeMs';

  return EntityCreatedAtJob;
}

module.exports = createEntityCreatedAtJob;
