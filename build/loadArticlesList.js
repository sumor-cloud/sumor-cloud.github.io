import fse from 'fs-extra'

export default async ()=>{
    const articlesDir = `${process.cwd()}/articles`;
    const articleFiles = await fse.readdir(articlesDir);
    console.log(articleFiles)
}