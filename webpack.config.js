const path = require("path"); // import path from "path";와 같음
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
    entry: ENTRY_FILE,
    mode: MODE,
    module: {
        /*
        1. scss 파일을 찾아라
        2. scss를 css로 바꿔라
        3. 전체 텍스트 중에 그 css의 텍스트를 추출해라
        4. 그 추출된 css를 분리된 하나의 파일로 만들어라
        */
        rules: [
            {
                test: /\.(scss)$/, // scss의 파일을 전부 찾아줌
                use: ExtractCSS.extract([
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ])

            }
        ]
    },
    output: {
        path: OUTPUT_DIR,
        filename: "[name].[format]"
    }
};

module.exports = config;