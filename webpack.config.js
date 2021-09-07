const path = require('path'); //modulo de node para la resolucion de directorios
const htmlWebpackPlugin = require('html-webpack-plugin'); //plugin para el manejo de html
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //plugin para el manejo de css
const CopyPlugin = require('copy-webpack-plugin'); //plugin para copiar elementos
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); //plugin para minificar css
const TerserPlugin = require('terser-webpack-plugin'); //minificar de una mejor forma
const Dotenv = require('dotenv-webpack');

module.exports = {
   entry: './src/index.js', // archivo de entrada
   output: {
      path: path.resolve(__dirname, 'dist'), //directorio de salida
      filename: '[name].[contenthash].js',
      assetModuleFilename: 'assets/images/[hash][ext][query]' //hashear el nombre de las imagenes
   },
   resolve: {
      extensions: ['.js'], //manejo de las extensiones
      alias: { //definir alias
         '@utils': path.resolve(__dirname, 'src/utils/'),
         '@templates': path.resolve(__dirname, 'src/templates/'),
         '@styles': path.resolve(__dirname, 'src/styles/'),
         '@images': path.resolve(__dirname, 'src/assets/images/'),
      }
   },
   module: {
      rules: [
         {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader' //transpilador de javascript
            }
         },
         {
            test: /\.css|.styl$/i,
            use: [MiniCssExtractPlugin.loader,
            'css-loader', //entender el codigo css
            'stylus-loader' //entender el codigo de stylus
            ],
         },
         {
            test: /\.png$/,
            type: 'asset/resource' //mover imagenes con el modulo asset
         },
         {
            test: /\.(woff|woff2)$/,
            type: "asset/resource", //mover fuentes con el modulo asset
            generator: {
               filename: "assets/fonts/[name].[contenthash].[ext]"
            }
         }
      ]
   },
   plugins: [
      // configuracion del plugin html
      new htmlWebpackPlugin({
         inject: true,
         template: './public/index.html',
         filename: './index.html',
      }),
      // configuracion del plugin para copiar y hashear el css
      new MiniCssExtractPlugin({
         filename: 'assets/[name].[contenthash].css'
      }),
      // configuracion para copiar elementos
      new CopyPlugin({
         patterns: [
            {
               from: path.resolve(__dirname, "src", "assets/images"), //directorio de inicio
               to: "assets/images" //directorio final
            }
         ]
      }),
      new Dotenv(),
   ],
   //configuracion de optimizacion
   optimization: {
      minimize: true, //activar la minificacion
      minimizer: [
         new CssMinimizerPlugin(), //minificar css
         new TerserPlugin(), //minificar mejor
      ]
   }
}
