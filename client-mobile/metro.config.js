const { getDefaultConfig } = require('@expo/metro-config')
const path = require('path')
const exclusionList = require('metro-config/src/defaults/exclusionList')

const extraNodeModules = {
  shared: path.resolve(__dirname + '/../shared')
}

const watchFolders = [
  path.resolve(__dirname + '/../shared')
]

const defaultConfig = getDefaultConfig(__dirname)

module.exports = {
  ...defaultConfig,
  transformer: {
    ...defaultConfig.transformer,
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false
      }
    })
  },
  resolver: {
    ...defaultConfig.resolver,
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs', 'json'],
    blockList: exclusionList([/#current-cloud-backend\/.*/]),
    extraNodeModules
  },
  watchFolders
}
