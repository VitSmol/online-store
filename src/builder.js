var fs = require("fs");
var path = require("path");
var templateFile = path.join(__dirname, "./template.html");
var projectDir = path.join(__dirname, "./");
var componentDir = path.join(__dirname, "components");
var file = path.join(projectDir, "index.html");
var callback = function (err) {
    if (err) {
        return;
    }
};
var deleteFile = function (file) {
    fs.unlink(file, callback);
};
function pageBuilder(template) {
    var text = "";
    var components = [];
    // const file = path.join(projectDir, `index.html`);
    var stream = fs.createReadStream(template);
    fs.mkdir(projectDir, { recursive: true }, callback);
    stream.on("data", function (chunk) {
        text += chunk;
    });
    fs.readdir(componentDir, { withFileTypes: true }, function (err, data) {
        if (!err) {
            data.forEach(function (el) {
                var _a = [path.parse(el.name).base, path.parse(el.name).name, path.parse(el.name).ext], filePath = _a[0], fileName = _a[1], fileExt = _a[2];
                var stream = fs.createReadStream(path.join(componentDir, filePath));
                stream.on("data", function (chunk) {
                    var obj = {
                        fileName: fileName,
                        code: chunk.toString(),
                        fileExt: fileExt
                    };
                    components.push(obj);
                });
            });
        }
    });
    stream.on("end", function () {
        var _a;
        function arrayDiff(a, b) {
            return b.filter(function (el) { return a === null || a === void 0 ? void 0 : a.includes(el.fileName); });
        }
        //! if the selector is commented out, it will not be included in the markup
        var arr = (_a = text.match(/(?!<!--\s{0,5}){{\w{0,20}}}(?!\s{0,5}-->)/g)) === null || _a === void 0 ? void 0 : _a.map(function (el) {
            return el.replace(/{|}/g, "");
        });
        //! exclude non-html files
        var result = arrayDiff(arr, components).filter(function (el) { return el.fileExt === '.html'; });
        var output = fs.createWriteStream(file);
        result.forEach(function (el) {
            console.log(text);
            var regExp = new RegExp("{{".concat(el.fileName, "}}"));
            text = text.replace(regExp, el.code);
        });
        output.write(text);
    });
}
function execute() {
    deleteFile(file);
    var stream = fs.createReadStream(templateFile, 'utf-8');
    stream.on('data', function (chunk) {
        chunk;
    });
    stream.on('end', function () {
        pageBuilder(templateFile);
    });
}
execute();
