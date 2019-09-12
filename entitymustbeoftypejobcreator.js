function createEntityMustBeOfTypeJobCreator (execlib, EntityTypeJob) {
  'use strict';

  var lib = execlib.lib;

  function EntityMustBeOfTypeJob (path, typestring, defer) {
    if (!(lib.isString(typestring) && typestring.length>0)) {
      throw new Error('TYPESTRING_INVALID', 'typestring provided to '+this.constructor+' constructor has to be a non-empty string');
    }
    EntityTypeJob.call(this, path, defer);
    this.typestring = typestring;
  }
  lib.inherit(EntityMustBeOfTypeJob, EntityTypeJob);
  EntityMustBeOfTypeJob.prototype._onFileType = function (typestring) {
    this.typestring.indexOf(typestring)>=0 ?
      this.resolve(true)
      :
      this.reject(new lib.Error('NOT_OF_DESIGNATED_TYPE', this.path+' is not of type '+this.typestring));
  };

  return EntityMustBeOfTypeJob;
}

module.exports = createEntityMustBeOfTypeJobCreator;
