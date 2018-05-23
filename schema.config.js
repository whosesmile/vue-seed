const fs = require('fs');
const path = require('path');

// 递归目录查找模块
function modules() {
  let result = [];
  let base = path.join(__dirname, './src/modules');
  fs.readdirSync(base).forEach(function (file) {
    file = path.resolve(base, file);
    let stat = fs.statSync(file);
    if (stat && stat.isDirectory() && fs.existsSync(path.join(file, 'index.js'))) {
      result.push(path.basename(file));
    }
  });
  return result;
}

// 模块列表
const list = modules();

// 代码模板
let code = list.reduce((str, name) => {
  str += `import ${name} from './modules/${name}';\n`;
  return str;
}, '');

code += `
export default [${list.map(name => `...${name}`).join(', ')}];
`;

fs.writeFileSync('./src/schema.js', code, 'utf8');
