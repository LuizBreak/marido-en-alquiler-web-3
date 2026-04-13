module.exports = {

     /*
      This file is only use for debuging puporses using Chrome DevTools. 
      It is not used in production build. You can remove it if you don't need it.
    */

  configureWebpack: {
    devtool: 'source-map'
  }


//   configureWebpack: {
//     devtool: process.env.NODE_ENV === 'production'
//       ? false
//       : 'eval-source-map'
//   }

};