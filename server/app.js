const express=require('express');
const app=express();
const sha1=require('sha1');

const config = {
        appId: 'wxced80a7ac92ba382',
        appsecret: 'b5fc381abfd5a603e56105a1bf6ac213',
        token: 'Meng081516'
}



app.use((req,res,next)=>{
    console.log(req.query);

    const {signature, echostr, timestamp, nonce} = req.query;
    const {token} = config;
    const arr = [timestamp, nonce, token].sort();
    const str = sha1(arr.join(''));
    if (signature === str) {
        res.end(echostr);
    } else {
        res.end('error');
    }
})




app.listen(3000,(err=>{
    if (!err){
        console.log('开启服务器成功~');
    } else {
        console.log(err);
    }
}))