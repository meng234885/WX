
const express = require('express');
const handleRequest = require('./reply/handleRequest');

const app = express();

app.use(handleRequest());

app.listen(3000,(err=>{
    if (!err){
        console.log('开启服务器成功~');
    } else {
        console.log(err);
    }
}))