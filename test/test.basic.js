var Node = require('allex_nodehelpersserverruntimelib')(execlib.lib);

describe ('Basic Tests', function () {
  it('Load Lib', function () {
    return setGlobal('Lib', require('..')(execlib));
  });
  it('Set some object', function () {
    return setGlobal('SomeObject', {blah: 5, trah: 'no'});
  });
  //pure Jobs
  it('See ctime', function () {
    return expect((new Lib.EntityCreatedAtJob([__dirname, 'testdir'])).go()).to.eventually.be.below(Date.now());
  });
  it('Entity Exists', function () {
    return expect((new Lib.EntityExistsJob([__dirname, 'testdir', 'existing.txt'])).go()).to.eventually.equal(true);
  });
  it('File Exists', function () {
    return expect((new Lib.FileExistsJob([__dirname, 'testdir', 'existing.txt'])).go()).to.eventually.equal(true);
  });
  it('File Exists NOT', function () {
    return expect((new Lib.FileExistsJob([__dirname, 'testdir', 'nonexisting.txt'])).go()).to.eventually.equal(false);
  });
  it('File Must Exist', function () {
    return expect((new Lib.FileMustExistJob([__dirname, 'testdir', 'existing.txt'])).go()).to.eventually.equal(true);
  });
  it('File Must Exist NOT throws', function () {
    return expect((new Lib.FileMustExistJob([__dirname, 'testdir', 'nonexisting.txt'])).go()).to.eventually.throw;
  });
  it('Directory Exists', function () {
    return expect((new Lib.DirExistsJob([__dirname, 'testdir', 'subdir'])).go()).to.eventually.equal(true);
  });
  it('Directory Exists NOT', function () {
    return expect((new Lib.DirExistsJob([__dirname, 'testdir', 'subdirNOT'])).go()).to.eventually.equal(false);
  });
  it('Directory Exists NOT in a case of a file', function () {
    return expect((new Lib.DirExistsJob([__dirname, 'testdir', 'existing.txt'])).go()).to.eventually.equal(false);
  });
  it('Directory Must Exist', function () {
    return expect((new Lib.DirMustExistJob([__dirname, 'testdir', 'subdir'])).go()).to.eventually.equal(true);
  });
  it('Directory Must Exist NOT throws', function () {
    return expect((new Lib.DirMustExistJob([__dirname, 'testdir', 'subdirNOT'])).go()).to.eventually.throw;
  });
  it('File is of Type \'f\'', function () {
    return expect((new Lib.EntityTypeJob([__dirname, 'testdir', 'existing.txt'])).go()).to.eventually.equal('f');
  });
  it('File is an \'f\' Type', function () {
    return expect((new Lib.EntityIsOfTypeJob([__dirname, 'testdir', 'existing.txt'], 'f')).go()).to.eventually.equal(true);
  });
  it('Directory is of Type \'d\'', function () {
    return expect((new Lib.EntityTypeJob([__dirname, 'testdir', 'subdir'])).go()).to.eventually.equal('d');
  });
  it('Directory is a \'d\' Type', function () {
    return expect((new Lib.EntityIsOfTypeJob([__dirname, 'testdir', 'subdir'], 'd')).go()).to.eventually.equal(true);
  });
  it('Non-existing File is of Type \'\'', function () {
    return expect((new Lib.EntityTypeJob([__dirname, 'testdir', 'nonexisting.txt'])).go()).to.eventually.equal('');
  });
  it('Directory filename listing', function () {
    return expect((new Lib.DirListingFileNamesJob([__dirname, 'testdir', 'subdir'])).go()).to.eventually.be.an('array').that.has.property('length', 4);
  });
  it('Directory filename listing on a non-existing Directory throws', function () {
    return expect((new Lib.DirListingFileNamesJob([__dirname, 'testdir', 'subdirNOT'])).go()).to.eventually.throw;
  });
  it('Directory filepath listing', function () {
    return expect((new Lib.DirListingFilePathsJob([__dirname, 'testdir', 'subdir'])).go()).to.eventually.be.an('array').that.has.property('length', 4);
  });
  it('Directory filepath listing sanity check for pathname', function () {
    return expect((new Lib.DirListingFilePathsJob([__dirname, 'testdir', 'subdir'])).go()).to.eventually.be.an('array').that.has.property(0).that.match(/^\/.*\/test\/testdir\/subdir\/.*\..{3}/);
  });
  it('Directory filepath listing on a non-existing Directory throws', function () {
    return expect((new Lib.DirListingFilePathsJob([__dirname, 'testdir', 'subdirNOT'])).go()).to.eventually.throw;
  });
  it('Remove file', function () {
    return expect((new Lib.RmFileJob([__dirname, 'testdir', 'existing.txt'])).go()).to.eventually.equal(true);
  });
  it('Removed file Exists NOT', function () {
    return expect((new Lib.FileExistsJob([__dirname, 'testdir', 'existing.txt'])).go()).to.eventually.equal(false);
  });
  it('Write to file', function () {
    setGlobal('MyMoment', Date.now());
    return expect((new Lib.WriteToFileJob('blah', {path:[__dirname, 'testdir', 'existing.txt'], encoding:'utf8'})).go()).to.eventually.equal(true);
  });
  it('Expect file to be changed after MyMoment', function () {
    return expect((new Lib.EntityModifiedAtJob([__dirname, 'testdir', 'existing.txt'])).go()).to.eventually.be.above(MyMoment-100); //100 because file systems can lie
  });
  it('Read all file', function () {
    return expect((new Lib.ReadAllFileJob({path:[__dirname, 'testdir', 'existing.txt'], encoding:'utf8'})).go()).to.eventually.equal('blah');
  });
  it('Append to file', function () {
    return expect((new Lib.AppendToFileJob('blah', {path:[__dirname, 'testdir', 'existing.txt'], encoding:'utf8'})).go()).to.eventually.equal(true);
  });
  it('Read all file after appending', function () {
    return expect((new Lib.ReadAllFileJob({path:[__dirname, 'testdir', 'existing.txt'], encoding:'utf8'})).go()).to.eventually.equal('blahblah');
  });
  it('Write some object to JSON file', function () {
    return expect((new Lib.WriteJsonFileJob(SomeObject, {path:[__dirname, 'testdir', 'someobject.json'], encoding:'utf8'})).go()).to.eventually.equal(true);
  });
  it('Read JSON file', function () {
    return expect((new Lib.ReadJsonFileJob({path:[__dirname, 'testdir', 'someobject.json'], encoding:'utf8'})).go()).to.eventually.deep.equal(SomeObject);
  });
  it('Create Dir', function () {
    return expect((new Lib.EnsureDirJob([__dirname, 'testdir', 'somesubdir'])).go()).to.eventually.equal(Node.Path.join(__dirname, 'testdir', 'somesubdir'));
  });
  it('Rm Dir', function () {
    return expect((new Lib.RmDirJob([__dirname, 'testdir', 'somesubdir'])).go()).to.eventually.equal(true);
  });
  it('See fsats', function () {
    return expect(qlib.promise2console((new Lib.EntityStatsJob([__dirname, 'testdir'])).go(), 'stats')).to.eventually.include.all.keys(['atime', 'ctime', 'mtime']);
  });
  //end of pure jobs
  

  //Job instances
  it('See ctime', function () {
    return expect((Lib.entityCreatedAtJob([__dirname, 'testdir'])).go()).to.eventually.be.below(Date.now());
  });
  it('Entity Exists', function () {
    return expect((Lib.entityExistsJob([__dirname, 'testdir', 'existing.txt'])).go()).to.eventually.equal(true);
  });
  it('File Exists', function () {
    return expect((Lib.fileExistsJob([__dirname, 'testdir', 'existing.txt'])).go()).to.eventually.equal(true);
  });
  it('File Exists NOT', function () {
    return expect((Lib.fileExistsJob([__dirname, 'testdir', 'nonexisting.txt'])).go()).to.eventually.equal(false);
  });
  it('File Must Exist', function () {
    return expect((Lib.fileMustExistJob([__dirname, 'testdir', 'existing.txt'])).go()).to.eventually.equal(true);
  });
  it('File Must Exist NOT throws', function () {
    return expect((Lib.fileMustExistJob([__dirname, 'testdir', 'nonexisting.txt'])).go()).to.eventually.throw;
  });
  it('Directory Exists', function () {
    return expect((Lib.dirExistsJob([__dirname, 'testdir', 'subdir'])).go()).to.eventually.equal(true);
  });
  it('Directory Exists NOT', function () {
    return expect((Lib.dirExistsJob([__dirname, 'testdir', 'subdirNOT'])).go()).to.eventually.equal(false);
  });
  it('Directory Exists NOT in a case of a file', function () {
    return expect((Lib.dirExistsJob([__dirname, 'testdir', 'existing.txt'])).go()).to.eventually.equal(false);
  });
  it('Directory Must Exist', function () {
    return expect((Lib.dirMustExistJob([__dirname, 'testdir', 'subdir'])).go()).to.eventually.equal(true);
  });
  it('Directory Must Exist NOT throws', function () {
    return expect((Lib.dirMustExistJob([__dirname, 'testdir', 'subdirNOT'])).go()).to.eventually.throw;
  });
  it('File is of Type \'f\'', function () {
    return expect((Lib.entityTypeJob([__dirname, 'testdir', 'existing.txt'])).go()).to.eventually.equal('f');
  });
  it('File is an \'f\' Type', function () {
    return expect((Lib.entityIsOfTypeJob([__dirname, 'testdir', 'existing.txt'], 'f')).go()).to.eventually.equal(true);
  });
  it('Directory is of Type \'d\'', function () {
    return expect((Lib.entityTypeJob([__dirname, 'testdir', 'subdir'])).go()).to.eventually.equal('d');
  });
  it('Directory is a \'d\' Type', function () {
    return expect((Lib.entityIsOfTypeJob([__dirname, 'testdir', 'subdir'], 'd')).go()).to.eventually.equal(true);
  });
  it('Non-existing File is of Type \'\'', function () {
    return expect((Lib.entityTypeJob([__dirname, 'testdir', 'nonexisting.txt'])).go()).to.eventually.equal('');
  });
  it('Directory filename listing', function () {
    return expect((Lib.dirListingFileNamesJob([__dirname, 'testdir', 'subdir'])).go()).to.eventually.be.an('array').that.has.property('length', 4);
  });
  it('Directory filename listing on a non-existing Directory throws', function () {
    return expect((Lib.dirListingFileNamesJob([__dirname, 'testdir', 'subdirNOT'])).go()).to.eventually.throw;
  });
  it('Directory filepath listing', function () {
    return expect((Lib.dirListingFilePathsJob([__dirname, 'testdir', 'subdir'])).go()).to.eventually.be.an('array').that.has.property('length', 4);
  });
  it('Directory filepath listing sanity check for pathname', function () {
    return expect((Lib.dirListingFilePathsJob([__dirname, 'testdir', 'subdir'])).go()).to.eventually.be.an('array').that.has.property(0).that.match(/^\/.*\/test\/testdir\/subdir\/.*\..{3}/);
  });
  it('Directory filepath listing on a non-existing Directory throws', function () {
    return expect((Lib.dirListingFilePathsJob([__dirname, 'testdir', 'subdirNOT'])).go()).to.eventually.throw;
  });
  it('Remove file', function () {
    return expect((Lib.rmFileJob([__dirname, 'testdir', 'existing.txt'])).go()).to.eventually.equal(true);
  });
  it('Removed file Exists NOT', function () {
    return expect((Lib.fileExistsJob([__dirname, 'testdir', 'existing.txt'])).go()).to.eventually.equal(false);
  });
  it('Write to file', function () {
    setGlobal('MyMoment', Date.now());
    return expect((Lib.writeToFileJob('blah', {path:[__dirname, 'testdir', 'existing.txt'], encoding:'utf8'})).go()).to.eventually.equal(true);
  });
  it('Expect file to be changed after MyMoment', function () {
    return expect((Lib.entityModifiedAtJob([__dirname, 'testdir', 'existing.txt'])).go()).to.eventually.be.above(MyMoment-100); //100 because file systems can lie
  });
  it('Read all file', function () {
    return expect((Lib.readAllFileJob({path:[__dirname, 'testdir', 'existing.txt'], encoding:'utf8'})).go()).to.eventually.equal('blah');
  });
  it('Append to file', function () {
    return expect((Lib.appendToFileJob('blah', {path:[__dirname, 'testdir', 'existing.txt'], encoding:'utf8'})).go()).to.eventually.equal(true);
  });
  it('Read all file after appending', function () {
    return expect((Lib.readAllFileJob({path:[__dirname, 'testdir', 'existing.txt'], encoding:'utf8'})).go()).to.eventually.equal('blahblah');
  });
  it('Write some object to JSON file', function () {
    return expect((Lib.writeJsonFileJob(SomeObject, {path:[__dirname, 'testdir', 'someobject.json'], encoding:'utf8'})).go()).to.eventually.equal(true);
  });
  it('Read JSON file', function () {
    return expect((Lib.readJsonFileJob({path:[__dirname, 'testdir', 'someobject.json'], encoding:'utf8'})).go()).to.eventually.deep.equal(SomeObject);
  });
  it('Create Dir', function () {
    return expect((Lib.ensureDirJob([__dirname, 'testdir', 'somesubdir'])).go()).to.eventually.equal(Node.Path.join(__dirname, 'testdir', 'somesubdir'));
  });
  it('Rm Dir', function () {
    return expect((Lib.rmDirJob([__dirname, 'testdir', 'somesubdir'])).go()).to.eventually.equal(true);
  });
  it('See fsats', function () {
    return expect(qlib.promise2console((Lib.entityStatsJob([__dirname, 'testdir'])).go(), 'stats')).to.eventually.include.all.keys(['atime', 'ctime', 'mtime']);
  });
  //end of Job instances



  //promises
  it('See ctime', function () {
    return expect((Lib.entityCreatedAt([__dirname, 'testdir']))).to.eventually.be.below(Date.now());
  });
  it('Entity Exists', function () {
    return expect((Lib.entityExists([__dirname, 'testdir', 'existing.txt']))).to.eventually.equal(true);
  });
  it('File Exists', function () {
    return expect((Lib.fileExists([__dirname, 'testdir', 'existing.txt']))).to.eventually.equal(true);
  });
  it('File Exists NOT', function () {
    return expect((Lib.fileExists([__dirname, 'testdir', 'nonexisting.txt']))).to.eventually.equal(false);
  });
  it('File Must Exist', function () {
    return expect((Lib.fileMustExist([__dirname, 'testdir', 'existing.txt']))).to.eventually.equal(true);
  });
  it('File Must Exist NOT throws', function () {
    return expect((Lib.fileMustExist([__dirname, 'testdir', 'nonexisting.txt']))).to.eventually.throw;
  });
  it('Directory Exists', function () {
    return expect((Lib.dirExists([__dirname, 'testdir', 'subdir']))).to.eventually.equal(true);
  });
  it('Directory Exists NOT', function () {
    return expect((Lib.dirExists([__dirname, 'testdir', 'subdirNOT']))).to.eventually.equal(false);
  });
  it('Directory Exists NOT in a case of a file', function () {
    return expect((Lib.dirExists([__dirname, 'testdir', 'existing.txt']))).to.eventually.equal(false);
  });
  it('Directory Must Exist', function () {
    return expect((Lib.dirMustExist([__dirname, 'testdir', 'subdir']))).to.eventually.equal(true);
  });
  it('Directory Must Exist NOT throws', function () {
    return expect((Lib.dirMustExist([__dirname, 'testdir', 'subdirNOT']))).to.eventually.throw;
  });
  it('File is of Type \'f\'', function () {
    return expect((Lib.entityType([__dirname, 'testdir', 'existing.txt']))).to.eventually.equal('f');
  });
  it('File is an \'f\' Type', function () {
    return expect((Lib.entityIsOfType([__dirname, 'testdir', 'existing.txt'], 'f'))).to.eventually.equal(true);
  });
  it('Directory is of Type \'d\'', function () {
    return expect((Lib.entityType([__dirname, 'testdir', 'subdir']))).to.eventually.equal('d');
  });
  it('Directory is a \'d\' Type', function () {
    return expect((Lib.entityIsOfType([__dirname, 'testdir', 'subdir'], 'd'))).to.eventually.equal(true);
  });
  it('Non-existing File is of Type \'\'', function () {
    return expect((Lib.entityType([__dirname, 'testdir', 'nonexisting.txt']))).to.eventually.equal('');
  });
  it('Directory filename listing', function () {
    return expect((Lib.dirListingFileNames([__dirname, 'testdir', 'subdir']))).to.eventually.be.an('array').that.has.property('length', 4);
  });
  it('Directory filename listing on a non-existing Directory throws', function () {
    return expect((Lib.dirListingFileNames([__dirname, 'testdir', 'subdirNOT']))).to.eventually.throw;
  });
  it('Directory filepath listing', function () {
    return expect((Lib.dirListingFilePaths([__dirname, 'testdir', 'subdir']))).to.eventually.be.an('array').that.has.property('length', 4);
  });
  it('Directory filepath listing sanity check for pathname', function () {
    return expect((Lib.dirListingFilePaths([__dirname, 'testdir', 'subdir']))).to.eventually.be.an('array').that.has.property(0).that.match(/^\/.*\/test\/testdir\/subdir\/.*\..{3}/);
  });
  it('Directory filepath listing on a non-existing Directory throws', function () {
    return expect(Lib.dirListingFilePaths([__dirname, 'testdir', 'subdirNOT'])).to.eventually.throw;
  });
  it('Remove file', function () {
    return expect((Lib.rmFile([__dirname, 'testdir', 'existing.txt']))).to.eventually.equal(true);
  });
  it('Removed file Exists NOT', function () {
    return expect((Lib.fileExists([__dirname, 'testdir', 'existing.txt']))).to.eventually.equal(false);
  });
  it('Write to file', function () {
    setGlobal('MyMoment', Date.now());
    return expect((Lib.writeToFile('blah', {path:[__dirname, 'testdir', 'existing.txt'], encoding:'utf8'}))).to.eventually.equal(true);
  });
  it('Expect file to be changed after MyMoment', function () {
    return expect((Lib.entityModifiedAt([__dirname, 'testdir', 'existing.txt']))).to.eventually.be.above(MyMoment-100); //100 because file systems can lie
  });
  it('Read all file', function () {
    return expect((Lib.readAllFile({path:[__dirname, 'testdir', 'existing.txt'], encoding:'utf8'}))).to.eventually.equal('blah');
  });
  it('Append to file', function () {
    return expect((Lib.appendToFile('blah', {path:[__dirname, 'testdir', 'existing.txt'], encoding:'utf8'}))).to.eventually.equal(true);
  });
  it('Read all file after appending', function () {
    return expect((Lib.readAllFile({path:[__dirname, 'testdir', 'existing.txt'], encoding:'utf8'}))).to.eventually.equal('blahblah');
  });
  it('Write some object to JSON file', function () {
    return expect((Lib.writeJsonFile(SomeObject, {path:[__dirname, 'testdir', 'someobject.json'], encoding:'utf8'}))).to.eventually.equal(true);
  });
  it('Read JSON file', function () {
    return expect((Lib.readJsonFile({path:[__dirname, 'testdir', 'someobject.json'], encoding:'utf8'}))).to.eventually.deep.equal(SomeObject);
  });
  it('Create Dir', function () {
    return expect((Lib.ensureDir([__dirname, 'testdir', 'somesubdir']))).to.eventually.equal(Node.Path.join(__dirname, 'testdir', 'somesubdir'));
  });
  it('Rm Dir', function () {
    return expect((Lib.rmDir([__dirname, 'testdir', 'somesubdir']))).to.eventually.equal(true);
  });
  it('See fsats', function () {
    return expect(qlib.promise2console((Lib.entityStats([__dirname, 'testdir'])), 'stats')).to.eventually.include.all.keys(['atime', 'ctime', 'mtime']);
  });
  /*
  */
  //end of promises





  //PPs
  it('See ctime', function () {
    return expect((Lib.entityCreatedAtPP([__dirname, 'testdir'])())).to.eventually.be.below(Date.now());
  });
  it('Entity Exists', function () {
    return expect((Lib.entityExistsPP([__dirname, 'testdir', 'existing.txt'])())).to.eventually.equal(true);
  });
  it('File Exists', function () {
    return expect((Lib.fileExistsPP([__dirname, 'testdir', 'existing.txt'])())).to.eventually.equal(true);
  });
  it('File Exists NOT', function () {
    return expect((Lib.fileExistsPP([__dirname, 'testdir', 'nonexisting.txt'])())).to.eventually.equal(false);
  });
  it('File Must Exist', function () {
    return expect((Lib.fileMustExistPP([__dirname, 'testdir', 'existing.txt'])())).to.eventually.equal(true);
  });
  it('File Must Exist NOT throws', function () {
    return expect((Lib.fileMustExistPP([__dirname, 'testdir', 'nonexisting.txt'])())).to.eventually.throw;
  });
  it('Directory Exists', function () {
    return expect((Lib.dirExistsPP([__dirname, 'testdir', 'subdir'])())).to.eventually.equal(true);
  });
  it('Directory Exists NOT', function () {
    return expect((Lib.dirExistsPP([__dirname, 'testdir', 'subdirNOT'])())).to.eventually.equal(false);
  });
  it('Directory Exists NOT in a case of a file', function () {
    return expect((Lib.dirExistsPP([__dirname, 'testdir', 'existing.txt'])())).to.eventually.equal(false);
  });
  it('Directory Must Exist', function () {
    return expect((Lib.dirMustExistPP([__dirname, 'testdir', 'subdir'])())).to.eventually.equal(true);
  });
  it('Directory Must Exist NOT throws', function () {
    return expect((Lib.dirMustExistPP([__dirname, 'testdir', 'subdirNOT'])())).to.eventually.throw;
  });
  it('File is of Type \'f\'', function () {
    return expect((Lib.entityTypePP([__dirname, 'testdir', 'existing.txt'])())).to.eventually.equal('f');
  });
  it('File is an \'f\' Type', function () {
    return expect((Lib.entityIsOfTypePP([__dirname, 'testdir', 'existing.txt'], 'f')())).to.eventually.equal(true);
  });
  it('Directory is of Type \'d\'', function () {
    return expect((Lib.entityTypePP([__dirname, 'testdir', 'subdir'])())).to.eventually.equal('d');
  });
  it('Directory is a \'d\' Type', function () {
    return expect((Lib.entityIsOfTypePP([__dirname, 'testdir', 'subdir'], 'd')())).to.eventually.equal(true);
  });
  it('Non-existing File is of Type \'\'', function () {
    return expect((Lib.entityTypePP([__dirname, 'testdir', 'nonexisting.txt'])())).to.eventually.equal('');
  });
  it('Directory filename listing', function () {
    return expect((Lib.dirListingFileNamesPP([__dirname, 'testdir', 'subdir'])())).to.eventually.be.an('array').that.has.property('length', 4);
  });
  it('Directory filename listing on a non-existing Directory throws', function () {
    return expect((Lib.dirListingFileNamesPP([__dirname, 'testdir', 'subdirNOT'])())).to.eventually.throw;
  });
  it('Directory filepath listing', function () {
    return expect((Lib.dirListingFilePathsPP([__dirname, 'testdir', 'subdir'])())).to.eventually.be.an('array').that.has.property('length', 4);
  });
  it('Directory filepath listing sanity check for pathname', function () {
    return expect((Lib.dirListingFilePathsPP([__dirname, 'testdir', 'subdir'])())).to.eventually.be.an('array').that.has.property(0).that.match(/^\/.*\/test\/testdir\/subdir\/.*\..{3}/);
  });
  it('Directory filepath listing on a non-existing Directory throws', function () {
    return expect(Lib.dirListingFilePathsPP([__dirname, 'testdir', 'subdirNOT'])()).to.eventually.throw;
  });
  it('Remove file', function () {
    return expect((Lib.rmFilePP([__dirname, 'testdir', 'existing.txt'])())).to.eventually.equal(true);
  });
  it('Removed file Exists NOT', function () {
    return expect((Lib.fileExistsPP([__dirname, 'testdir', 'existing.txt'])())).to.eventually.equal(false);
  });
  it('Write to file', function () {
    setGlobal('MyMoment', Date.now());
    return expect((Lib.writeToFilePP('blah', {path:[__dirname, 'testdir', 'existing.txt'], encoding:'utf8'})())).to.eventually.equal(true);
  });
  it('Expect file to be changed after MyMoment', function () {
    return expect((Lib.entityModifiedAtPP([__dirname, 'testdir', 'existing.txt'])())).to.eventually.be.above(MyMoment-100); //100 because file systems can lie
  });
  it('Read all file', function () {
    return expect((Lib.readAllFilePP({path:[__dirname, 'testdir', 'existing.txt'], encoding:'utf8'})())).to.eventually.equal('blah');
  });
  it('Append to file', function () {
    return expect((Lib.appendToFilePP('blah', {path:[__dirname, 'testdir', 'existing.txt'], encoding:'utf8'})())).to.eventually.equal(true);
  });
  it('Read all file after appending', function () {
    return expect((Lib.readAllFilePP({path:[__dirname, 'testdir', 'existing.txt'], encoding:'utf8'})())).to.eventually.equal('blahblah');
  });
  it('Write some object to JSON file', function () {
    return expect((Lib.writeJsonFilePP(SomeObject, {path:[__dirname, 'testdir', 'someobject.json'], encoding:'utf8'})())).to.eventually.equal(true);
  });
  it('Read JSON file', function () {
    return expect((Lib.readJsonFilePP({path:[__dirname, 'testdir', 'someobject.json'], encoding:'utf8'})())).to.eventually.deep.equal(SomeObject);
  });
  it('Create Dir', function () {
    return expect((Lib.ensureDirPP([__dirname, 'testdir', 'somesubdir'])())).to.eventually.equal(Node.Path.join(__dirname, 'testdir', 'somesubdir'));
  });
  it('Rm Dir', function () {
    return expect((Lib.rmDirPP([__dirname, 'testdir', 'somesubdir'])())).to.eventually.equal(true);
  });
  it('See fsats', function () {
    return expect(qlib.promise2console((Lib.entityStatsPP([__dirname, 'testdir'])()), 'stats')).to.eventually.include.all.keys(['atime', 'ctime', 'mtime']);
  });
  /*
  */
  //end of PPs
});
