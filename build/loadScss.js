import * as sass from 'sass'
import fse from 'fs-extra'
export default async () => {
  const root = `${process.cwd()}/styles/index.scss`
  const target = `${process.cwd()}/output/web/styles/index.css`
  const result = await sass.compileAsync(root)
  await fse.ensureFile(target)
  await fse.writeFile(target, result.css)
}
