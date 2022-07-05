const HtmlWebPack = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Teser = require('terser-webpack-plugin');


module.exports = {
    mode: 'production',

    output: {
        clean: true,
        filename: 'main.[contenthash].js',  

    },

    module: {
        rules: [
            {
                test: /\.html$/, //que busque todos los archivos con extension html
                loader: 'html-loader',//que cargue el paquete html-loader que instalamos
                options: {
                    sources: false //que  mueva otros archivos linqueados dentro (imagenes)
                }
            },
            {
                test: /\.css$/, //todos los archivos css
                exclude: /styles.css$/,// que esxluya este archivo, sino no será tomado por la siguente regla
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtract.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              },

        ]
    },

    optimization:{
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Teser(),
        ]

        
    },

    plugins: [
        new HtmlWebPack({
            // title: 'Mi Documento',
            // filename: 'holamundo.html',
            template: './src/index.html'
        }),
        new MiniCssExtract({
            filename: '[name].[fullhash].css',//[name] mantiene el nombre, y [hash] le agrega un hash para que los navegadores no cacheen el archivo
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns : [
                {from: 'src/assets/', to: 'assets/',}
            ]
        })
    ]
}