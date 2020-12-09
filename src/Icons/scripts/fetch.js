var fs = require('fs');

function readFiles(dirname, onFileContent, onError, onEnd) {
  let filenames = fs.readdirSync(dirname);
  filenames.forEach(function (filename) {
    let content = fs.readFileSync(dirname + filename, 'utf-8');
    onFileContent(filename, content);
  });

  onEnd();
}

let globalPaths = [];
let reg = /d="([^"]+)z"/g;

let run = () => {
  try {
    readFiles(
      'C://Users/cosmi/Downloads/149086-essential-set/svg/',
      (file, cotent) => {
        cotent = cotent.split(/[\n\r\t\s]/).join('');

        if (globalPaths.length > 300) throw 'done';
        let path;
        while ((path = reg.exec(cotent))) {
          globalPaths.push(`"${path[1]}"`);
        }
      },
      error => console.error(error),

      () => console.log(globalPaths)
    );
  } catch (e) {
    // console.log(globalPaths);

    processPath(globalPaths[0]);

    fs.writeFileSync('../paths.js', `export const pathSegments = [${globalPaths.join(',')}] `);
  }
};

let processPath = path => {
  path = path.replace(/z/g, '');

  let segments = path.split(/([^\d\.\,\-])/g);

  console.log(segments);
};

run();
