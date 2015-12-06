module.exports = {
  entry: './src/fxos-toast.js',
  output: {
    filename: 'fxos-toast.js',
    library: 'FXOSToast',
    libraryTarget: 'umd'
  },

  externals: {
    "fxos-component": {
      root: "fxosComponent",
      commonjs: "fxos-component",
      commonjs2: "fxos-component",
      amd: "fxos-component"
    }
  }
}
