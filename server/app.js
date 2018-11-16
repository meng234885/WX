const express=require('express');
const app=express();
const sha1=require('sha1');

const {getUserDataAsync,parseXMLDataAsync,formatMessage}=require('./utils/tools')

const config = {
        appId: 'wxced80a7ac92ba382',
        appsecret: 'b5fc381abfd5a603e56105a1bf6ac213',
        token: 'Meng081516'
}



app.use(async (req,res,next)=>{
    console.log(req.query);

    const {signature, echostr, timestamp, nonce} = req.query;
    const {token} = config;
    const arr = [timestamp, nonce, token].sort();
    const str = sha1(arr.join(''));

    if (req.method ==='GET'){
        if (signature === str) {
            res.end(echostr);
        } else {
            res.end('error');
        }
    } else if (req.method ==='POST') {
        if (signature !== str) {
            res.end('error');
            return;
        }




    }else {
        res.send("error")
    }
    const xmlData = await getUserDataAsync(req);
    // console.log(xmlData);
    const jsData = await parseXMLDataAsync(xmlData);
    // console.log(jsData);




    const message=formatMessage(jsData);
    console.log(message);
    let content = '我听不懂啊~';
    if (message.Content==='1'){
        content = '这里是1啊~'
    }else if (message.Content==='2') {
        content = '这里是2啊~'
    }else if (message.Content.includes('爱')) {
        content = '我爱你'
    }


    let replyMessage = `<xml>
                            <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
                            <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
                            <CreateTime>${Date.now()}</CreateTime>
                            <MsgType><![CDATA[text]]></MsgType>
                            <Content><![CDATA[${content}]]></Content>
                        </xml>`
    // res.send(replyMessage);


    res.send(replyMessage)
})





app.listen(3000,(err=>{
    if (!err){
        console.log('开启服务器成功~');
    } else {
        console.log(err);
    }
}))