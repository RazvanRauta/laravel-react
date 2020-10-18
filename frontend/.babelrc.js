/**
 * @author: Razvan Rauta
 * Date: Oct 18 2020
 * Time: 11:44
 */

const plugins = [
  [
    'babel-plugin-import',
    {
      libraryName: '@material-ui/core',
      libraryDirectory: 'esm',
      camel2DashComponentName: false,
    },
    'core',
  ],
  [
    'babel-plugin-import',
    {
      libraryName: '@material-ui/icons',
      libraryDirectory: 'esm',
      camel2DashComponentName: false,
    },
    'icons',
  ],
]

module.exports = { plugins }
