import path from 'path'

const sourcePath = path.resolve(__dirname, 'source')

export default {
  entry: sourcePath,
  devServer: {
    port: 4000,
    contentBase: sourcePath,
  },
}
