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
    EnsureDirJob = require('./ensuredirjobcreator')(execlib, FsPathJobBase, Node.Fs);

  return {
    EntityExistsJob: EntityExistsJob,
    EntityTypeJob: EntityTypeJob,
    FileExistsJob: FileExistsJob,
    FileMustExistJob: FileMustExistJob,
    EntityIsOfTypeJob: EntityIsOfTypeJob,
    DirExistsJob: DirExistsJob,
    DirMustExistJob: DirMustExistJob,
    DirListingFileNamesJob: DirListingFileNamesJob,
    DirListingFilePathsJob: DirListingFilePathsJob,
    ReadAllFileJob: ReadAllFileJob,
    WriteToFileJob: WriteToFileJob,
    AppendToFileJob: AppendToFileJob,
    ReadJsonFileJob: ReadJsonFileJob,
    WriteJsonFileJob: WriteJsonFileJob,
    RmFileJob: RmFileJob,
    RmDirJob: RmDirJob,
    EnsureDirJob: EnsureDirJob
  };
}

module.exports = createLib;
