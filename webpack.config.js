const path = require("path"); // import path from "path";와 같음
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
    entry: ["@babel/polyfill", ENTRY_FILE],
    mode: MODE,
    module: {
        /*
        1. scss 파일을 찾아라
        2. scss를 css로 바꿔라
        3. 전체 텍스트 중에 그 css의 텍스트를 추출해라
        4. 그 추출된 css를 분리된 하나의 파일로 만들어라

        module을 발견할때마다 다음의 rule를 따라라.
        */
        rules: [
            {
                test: /\.(js)$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.(scss)$/, // scss의 파일을 전부 찾아줌
                use: ExtractCSS.extract([
                    {
                        loader: "css-loader" // 3- webpack이 css를 이해할수 있게 됨, 잘 호환되는 css가 불러와지면 그 부분만 텍스트를 
                        // 출력해서 보냄
                    },
                    {
                        loader: "postcss-loader", // 2- css를 받아서 이 loader한테 주는 플러그인을 가지고 css를 변환함(css 호환성)
                        options: {
                            plugins() {
                                return [autoprefixer({ browsers: "cover 99.5%" })];
                            }
                        }
                    },
                    {
                        loader: "sass-loader" // 1- Sass or SCSS를 받아서 일반 css로 바꿔줌
                    }
                ])
            }
        ]
    },
    output: {
        path: OUTPUT_DIR,
        filename: "[name].js"
    },
    plugins: [new ExtractCSS("styles.css")]
};

module.exports = config;