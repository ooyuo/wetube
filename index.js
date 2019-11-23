const express = require('express') // express라는 이름을 내 파일들안엣 찾고, 못찾으면 node_modules>express>index.js
const app = express();

const PORT = 4000;
function handleListening() {
    console.log(`listening on: http://localhost:${PORT}`);
}

app.listen(PORT, handleListening);