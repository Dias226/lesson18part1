// подключаем пакет path
const path = require('path');

// прописываем модуль export
module.exports = {
    // точка входа (строка, массив или обьект)
    entry: {
        main: './src/index.js'
    },
    // точка выхода (обьект)
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        publicPath: '/dist'
    },
    // если wepack не сможет собрать проект - выдаст ошибку на страницу с помощью оверлея
    devServer: {
        overlay: true
    },
    // правила для babel
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        }]
    }
};