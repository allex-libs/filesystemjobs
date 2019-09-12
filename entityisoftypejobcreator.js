function createEntityIsOfTypeJobCreator (execlib, EntityTypeJob) {
  'use strict';

  var lib = execlib.lib;

  function EntityIsOfTypeJob (path, typestring, defer) {
    if (!(lib.isString(typestring) && typestring.length>0)) {
      throw new Error('TYPESTRING_INVALID', 'typestring provided to '+this.constructor+' constructor has to be a non-empty string');
    }
    EntityTypeJob.call(this, path, defer);
    this.typestring = typestring;
  }
  lib.inherit(EntityIsOfTypeJob, EntityTypeJob);
  EntityIsOfTypeJob.prototype._onFileType = function (typestring) {
    this.resolve(this.typestring.indexOf(typestring)>=0);
  };

  return EntityIsOfTypeJob;
}

module.exports = createEntityIsOfTypeJobCreator;
