const fs = require('fs');
const Hogan = require('hogan.js');
const Path = require('path');

const paths = {
  src: './src/js/views',
  dest: './src/js/templates',
  hogan: require.resolve('hogan.js')
}

const templates = {};

function TemplateFile(path){
  const templates = [];
  const name = `${Path.basename(path)}.js`;
  const header = `import Hogan from '${paths.hogan}' \n`;
  const footer = ()=>{ return `export \{${templates.join(',')}\} `}
  let content = '';

  const methods = {
    name,
    path,
    read: ()=>{ return `${header}${content}${footer()}`; },
    write: (name,template)=>{ templates.push(name); content += `const ${name} = new Hogan.Template(${template }); \n`; }
  }
  return methods;
}

function WriteToTemplate(files,template){
  let file = files.readSync();
  if(file == null){ return false; }
  template.write(file.name.split('.mustache')[0],Hogan.compile(fs.readFileSync(Path.join(template.path,file.name),'utf8'),{asString:true}));
  return WriteToTemplate(files,template);
}

function Search(entries){
  let entry = entries.readSync();
  if(entry == null){
    for (let template in templates) {
        template = templates[template];
        fs.writeFileSync(Path.join(paths.dest,template.name),template.read());
    }
    return false;
  }
  if(!entry.isFile()){
    let template = Path.join(paths.src,entry.name);
    if(!templates[entry.name]){ templates[entry.name] = new TemplateFile(template); }
    WriteToTemplate(fs.opendirSync(template),templates[entry.name]);
  }

  return Search(entries);
}

Search(fs.opendirSync(paths.src));
