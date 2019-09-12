var Node = require('allex_nodehelpersserverruntimelib')(execlib.lib);

describe ('Basic Tests', function () {
  it('Load Lib', function () {
    return setGlobal('Lib', require('..')(execlib));
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
    return expect((new Lib.DirListingFileNamesJob([__dirname, 'testdir', 'subdirNOT'])).go()).to.eventually.throw();
  });
  it('Directory filepath listing', function () {
    return expect((new Lib.DirListingFilePathsJob([__dirname, 'testdir', 'subdir'])).go()).to.eventually.be.an('array').that.has.property('length', 4);
  });
  it('Directory filepath listing sanity check for pathname', function () {
    return expect((new Lib.DirListingFilePathsJob([__dirname, 'testdir', 'subdir'])).go()).to.eventually.be.an('array').that.has.property(0).that.match(/^\/.*\/test\/testdir\/subdir\/.*\..{3}/);
  });
  it('Directory filepath listing on a non-existing Directory throws', function () {
    return expect((new Lib.DirListingFilePathsJob([__dirname, 'testdir', 'subdirNOT'])).go()).to.eventually.throw();
  });
  it('Remove file', function () {
    return expect((new Lib.RmFileJob([__dirname, 'testdir', 'existing.txt'])).go()).to.eventually.equal(true);
  });
  it('Removed file Exists NOT', function () {
    return expect((new Lib.FileExistsJob([__dirname, 'testdir', 'existing.txt'])).go()).to.eventually.equal(false);
  });
  it('Write to file', function () {
    return expect((new Lib.WriteToFileJob('blah', {path:[__dirname, 'testdir', 'existing.txt'], encoding:'utf8'})).go()).to.eventually.equal(true);
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
  it('Set some object', function () {
    return setGlobal('SomeObject', {blah: 5, trah: 'no'});
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
});
