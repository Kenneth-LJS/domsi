const path = require('path');
const { readdir, writeFile, copyFile } = require('fs').promises;

function toPosixPath(pathStr) {
    return pathStr.split(path.sep).join(path.posix.sep);
}

async function getFiles(dir, rootDir) {
    if (!rootDir) { rootDir = dir; }
    const dirents = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory()
                ? getFiles(res, rootDir)
                : path.relative(rootDir, res);
    }));
    return Array.prototype.concat(...files);
}

(async () => {
    const devPath = 'dev';
    const buildPath = 'build.dev'
    const modulesDir = 'domsi';

    const moduleFiles = await getFiles(path.resolve(buildPath, modulesDir));
    const result = moduleFiles.map(moduleFile => toPosixPath(path.join(modulesDir, moduleFile)));
    await writeFile(path.resolve(buildPath, 'modules.json'), JSON.stringify(result));


    (await getFiles(path.resolve(devPath))).forEach(devFilePath => {
        copyFile(
            path.resolve(devPath, devFilePath),
            path.resolve(buildPath, devFilePath),
        );
    });



    copyFile(
        path.resolve(__dirname, 'loader.js'),
        path.resolve(buildPath, 'loader.js'),
    );
})();