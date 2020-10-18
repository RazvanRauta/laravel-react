/**
 * @author: Razvan Rauta
 * Date: Oct 18 2020
 * Time: 10:49
 */

const { override, addWebpackAlias, useBabelRc } = require('customize-cra')
const path = require('path')

module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  }),
  useBabelRc()
)
