function createLib (execlib) {
  'use strict';
  var fsutils = require('allex_fsutilsserverruntimelib')(execlib.lib),
    Node = require('allex_nodehelpersserverruntimelib')(execlib.lib),
    FsPathJobBase = require('./fspathjobbasecreator')(execlib, fsutils),
    FsPathOnlyJobBase = require('./fspathonlyjobbasecreator')(execlib, FsPathJobBase, Node.Fs),
    EntityExistsJob = require('./entityexistsjobcreator')(execlib, FsPathOnlyJobBase, fsutils, Node.Fs),
    EntityTypeJob = require('./entitytypejobcreator')(execlib, FsPathJobBase, fsutils),
    EntityIsOfTypeJob = require('./entityisoftypejobcreator')(execlib, EntityTypeJob),
    EntityMustBeOfTypeJob = require('./entitymustbeoftypejobcreator')(execlib, EntityTypeJob),
    EntityOfTypeExistsJob = require('./entityoftypeexistsjobcreator')(execlib, EntityExistsJob, EntityIsOfTypeJob, fsutils),
    FileExistsJob = require('./fileexistsjobcreator')(execlib, EntityOfTypeExistsJob),
    DirExistsJob = require('./direxistsjobcreator')(execlib, EntityOfTypeExistsJob),
    FileMustExistJob = require('./filemustexistjobcreator')(execlib, EntityMustBeOfTypeJob),
    DirMustExistJob = require('./dirmustexistjobcreator')(execlib, EntityMustBeOfTypeJob),
    DirListingFileNamesJob = require('./dirlistingjobcreator')(execlib, FsPathOnlyJobBase),
    DirListingFilePathsJob = require('./dirlistingpathsjobcreator')(execlib, DirListingFileNamesJob, Node.Path),
    FileOperationJobBase = require('./fileoperationjobbasecreator')(execlib, FsPathOnlyJobBase),
    ReadAllFileJob = require('./readallfilejobcreator')(execlib, FileOperationJobBase),
    ReadJsonFileJob = require('./readjsonfilejobcreator')(execlib, ReadAllFileJob),
    WriteToFileJob = require('./writetofilejobcreator')(execlib, FileOperationJobBase),
    WriteJsonFileJob = require('./writejsonfilejobcreator')(execlib, WriteToFileJob),
    AppendToFileJob = require('./appendtofilejobcreator')(execlib, WriteToFileJob),
    RmFileJob = require('./rmfilejobcreator')(execlib, FileOperationJobBase),
    RmDirJob = require('./rmdirjobcreator')(execlib, FsPathJobBase, Node.Fs),
    EnsureDirJob = require('./ensuredirjobcreator')(execlib, FsPathJobBase, Node.Fs),
    EntityStatsJob = require('./entitystatsjobcreator')(execlib, FsPathJobBase, fsutils),
    EntityCreatedAtJob = require('./entitycreatedatjobcreator')(execlib, EntityStatsJob),
    EntityModifiedAtJob = require('./entitymodifiedatjobcreator')(execlib, EntityStatsJob);

  return {
    EntityExistsJob: EntityExistsJob,
    entityExistsJob: function (pathorarry) {
      return new EntityExistsJob(pathorarry);
    },
    entityExistsPP: function (pathorarry) {
      var instance = new EntityExistsJob(pathorarry);
      return instance.go.bind(instance);
    },
    entityExists: function (pathorarry) {
      return (new EntityExistsJob(pathorarry)).go();
    },

    EntityTypeJob: EntityTypeJob,
    entityTypeJob: function (pathorarry) {
      return new EntityTypeJob(pathorarry);
    },
    entityTypePP: function (pathorarry) {
      var instance = new EntityTypeJob(pathorarry);
      return instance.go.bind(instance);
    },
    entityType: function (pathorarry) {
      return (new EntityTypeJob(pathorarry)).go();
    },

    FileExistsJob: FileExistsJob,
    fileExistsJob: function (pathorarry) {
      return new FileExistsJob(pathorarry);
    },
    fileExistsPP: function (pathorarry) {
      var instance = new FileExistsJob(pathorarry);
      return instance.go.bind(instance);
    },
    fileExists: function (pathorarry) {
      return (new FileExistsJob(pathorarry)).go();
    },
    
    FileMustExistJob: FileMustExistJob,
    fileMustExistJob: function (pathorarry) {
      return new FileMustExistJob(pathorarry);
    },
    fileMustExistPP: function (pathorarry) {
      var instance = new FileMustExistJob(pathorarry);
      return instance.go.bind(instance);
    },
    fileMustExist: function (pathorarry) {
      return (new FileMustExistJob(pathorarry)).go();
    },

    EntityIsOfTypeJob: EntityIsOfTypeJob,
    entityIsOfTypeJob: function (pathorarry, typestring) {
      return new EntityIsOfTypeJob(pathorarry, typestring);
    },
    entityIsOfTypePP: function (pathorarry, typestring) {
      var instance = new EntityIsOfTypeJob(pathorarry, typestring);
      return instance.go.bind(instance);
    },
    entityIsOfType: function (pathorarry, typestring) {
      return (new EntityIsOfTypeJob(pathorarry, typestring)).go();
    },

    DirExistsJob: DirExistsJob,
    dirExistsJob: function (pathorarry) {
      return new DirExistsJob(pathorarry);
    },
    dirExistsPP: function (pathorarry) {
      var instance = new DirExistsJob(pathorarry);
      return instance.go.bind(instance);
    },
    dirExists: function (pathorarry) {
      return (new DirExistsJob(pathorarry)).go();
    },

    DirMustExistJob: DirMustExistJob,
    dirMustExistJob: function (pathorarry) {
      return new DirMustExistJob(pathorarry);
    },
    dirMustExistPP: function (pathorarry) {
      var instance = new DirMustExistJob(pathorarry);
      return instance.go.bind(instance);
    },
    dirMustExist: function (pathorarry) {
      return (new DirMustExistJob(pathorarry)).go();
    },

    DirListingFileNamesJob: DirListingFileNamesJob,
    dirListingFileNamesJob: function (pathorarry) {
      return new DirListingFileNamesJob(pathorarry);
    },
    dirListingFileNamesPP: function (pathorarry) {
      var instance = new DirListingFileNamesJob(pathorarry);
      return instance.go.bind(instance);
    },
    dirListingFileNames: function (pathorarry) {
      return (new DirListingFileNamesJob(pathorarry)).go();
    },

    DirListingFilePathsJob: DirListingFilePathsJob,
    dirListingFilePathsJob: function (pathorarry) {
      return new DirListingFilePathsJob(pathorarry);
    },
    dirListingFilePathsPP: function (pathorarry) {
      var instance = new DirListingFilePathsJob(pathorarry);
      return instance.go.bind(instance);
    },
    dirListingFilePaths: function (pathorarry) {
      return (new DirListingFilePathsJob(pathorarry)).go();
    },

    ReadAllFileJob: ReadAllFileJob,
    readAllFileJob: function (pathencobj) {
      return new ReadAllFileJob(pathencobj);
    },
    readAllFilePP: function (pathencobj) {
      var instance = new ReadAllFileJob(pathencobj);
      return instance.go.bind(instance);
    },
    readAllFile: function (pathencobj) {
      return (new ReadAllFileJob(pathencobj)).go();
    },

    WriteToFileJob: WriteToFileJob,
    writeToFileJob: function (contents, pathencobj){
      return new WriteToFileJob(contents, pathencobj);
    },
    writeToFilePP: function (contents, pathencobj){
      var instance = new WriteToFileJob(contents, pathencobj);
      return instance.go.bind(instance);
    },
    writeToFile: function (contents, pathencobj){
      return (new WriteToFileJob(contents, pathencobj)).go();
    },

    AppendToFileJob: AppendToFileJob,
    appendToFileJob: function (contents, pathencobj) {
      return new AppendToFileJob(contents, pathencobj);
    },
    appendToFilePP: function (contents, pathencobj) {
      var instance = new AppendToFileJob(contents, pathencobj);
      return instance.go.bind(instance);
    },
    appendToFile: function (contents, pathencobj) {
      return (new AppendToFileJob(contents, pathencobj)).go();
    },

    ReadJsonFileJob: ReadJsonFileJob,
    readJsonFileJob: function (pathencobj) {
      return new ReadJsonFileJob(pathencobj);
    },
    readJsonFilePP: function (pathencobj) {
      var instance = new ReadJsonFileJob(pathencobj);
      return instance.go.bind(instance);
    },
    readJsonFile: function (pathencobj) {
      return (new ReadJsonFileJob(pathencobj)).go();
    },

    WriteJsonFileJob: WriteJsonFileJob,
    writeJsonFileJob: function (contents, pathencobj) {
      return new WriteJsonFileJob(contents, pathencobj);
    },
    writeJsonFilePP: function (contents, pathencobj) {
      var instance = new WriteJsonFileJob(contents, pathencobj);
      return instance.go.bind(instance);
    },
    writeJsonFile: function (contents, pathencobj) {
      return (new WriteJsonFileJob(contents, pathencobj)).go();
    },

    RmFileJob: RmFileJob,
    rmFileJob: function (pathorarry) {
      return new RmFileJob(pathorarry);
    },
    rmFilePP: function (pathorarry) {
      var instance = new RmFileJob(pathorarry);
      return instance.go.bind(instance);
    },
    rmFile: function (pathorarry) {
      return (new RmFileJob(pathorarry)).go();
    },

    RmDirJob: RmDirJob,
    rmDirJob: function (pathorarry) {
      return new RmDirJob(pathorarry);
    },
    rmDirPP: function (pathorarry) {
      var instance = new RmDirJob(pathorarry);
      return instance.go.bind(instance);
    },
    rmDir: function (pathorarry) {
      return (new RmDirJob(pathorarry)).go();
    },

    EnsureDirJob: EnsureDirJob,
    ensureDirJob: function (pathorarry) {
      return new EnsureDirJob(pathorarry);
    },
    ensureDirPP: function (pathorarry) {
      var instance = new EnsureDirJob(pathorarry);
      return instance.go.bind(instance);
    },
    ensureDir: function (pathorarry) {
      return (new EnsureDirJob(pathorarry)).go();
    },

    EntityStatsJob: EntityStatsJob,
    entityStatsJob: function (pathorarry) {
      return new EntityStatsJob(pathorarry);
    },
    entityStatsPP: function (pathorarry) {
      var instance = new EntityStatsJob(pathorarry);
      return instance.go.bind(instance);
    },
    entityStats: function (pathorarry) {
      return (new EntityStatsJob(pathorarry)).go();
    },

    EntityCreatedAtJob: EntityCreatedAtJob,
    entityCreatedAtJob: function (pathorarry) {
      return new EntityCreatedAtJob(pathorarry);
    },
    entityCreatedAtPP: function (pathorarry) {
      var instance = new EntityCreatedAtJob(pathorarry);
      return instance.go.bind(instance);
    },
    entityCreatedAt: function (pathorarry) {
      return (new EntityCreatedAtJob(pathorarry)).go();
    },

    EntityModifiedAtJob: EntityModifiedAtJob,
    entityModifiedAtJob: function (pathorarry) {
      return new EntityModifiedAtJob(pathorarry);
    },
    entityModifiedAtPP: function (pathorarry) {
      var instance = new EntityModifiedAtJob(pathorarry);
      return instance.go.bind(instance);
    },
    entityModifiedAt: function (pathorarry) {
      return (new EntityModifiedAtJob(pathorarry)).go();
    }
  };
}

module.exports = createLib;
