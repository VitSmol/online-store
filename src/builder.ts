const fs = require(`fs`);
const path = require(`path`);

const templateFile = path.join(__dirname, `./template.html`);
const projectDir = path.join(__dirname, `./`);
const componentDir = path.join(__dirname, `components`);
const file = path.join(projectDir, `index.html`);

const callback = (err: Error) => {
  if (err) {
    return;
  }
};

type Component = {
  name: string;
}
type Obj = {
  fileName: string;
  code: string;
  fileExt: string
}

const deleteFile = (file: FileSystem) => {
  fs.unlink(file, callback);
};

function pageBuilder(template: FileSystem) {
  let text = ``;
  const components: Obj[] = [];
  // const file = path.join(projectDir, `index.html`);
  const stream = fs.createReadStream(template);

  fs.mkdir(projectDir, { recursive: true }, callback);

  stream.on(`data`, (chunk: string) => {
    text += chunk;
  });
  fs.readdir(componentDir, { withFileTypes: true }, (err: Error, data: Component[]) => {
    if (!err) {
      data.forEach((el: Component) => {
        const [filePath, fileName, fileExt] = [path.parse(el.name).base, path.parse(el.name).name, path.parse(el.name).ext];
        const stream = fs.createReadStream(path.join(componentDir, filePath));
        stream.on(`data`, (chunk: string) => {
          const obj = {
            fileName: fileName,
            code: chunk.toString(),
            fileExt
          };
          components.push(obj);
        });
      });

    }
  });
  stream.on(`end`, () => {

    function arrayDiff(a: Array<string> | undefined, b: Array<Obj>) {
      return b.filter((el: Obj) => a?.includes(el.fileName));
    }
    //! if the selector is commented out, it will not be included in the markup
    const arr: string[] | undefined = text.match(/(?!<!--\s{0,5}){{\w{0,20}}}(?!\s{0,5}-->)/g)?.map(el => {
      return el.replace(/{|}/g, "");
    });
    //! exclude non-html files
    const result = arrayDiff(arr, components).filter(el => el.fileExt === '.html');

    const output = fs.createWriteStream(file);
    result.forEach(el => {
      console.log(text);
      
      const regExp = new RegExp(`{{${el.fileName}}}`);
      text = text.replace(regExp, el.code);
    });
    output.write(text);
  });
}

function execute() {
  deleteFile(file);
  const stream = fs.createReadStream(templateFile, 'utf-8');
  stream.on('data', (chunk: string) => {
    chunk;
  });
  stream.on('end', (): void => {
    pageBuilder(templateFile);
  });
}

execute();

