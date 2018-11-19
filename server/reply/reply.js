module.exports = message => {
    let options = {
        toUserName: message.FromUserName,
        fromUserName: message.ToUserName,
        createTime: Date.now(),
        msgType: 'text'
    }

    let content = '你在说什么，我听不懂~';

    if (message.MsgType === 'text') {
        if (message.Content === '1') {
            content = '这是1啊~';
        } else if (message.Content === '2') {
            content = '这是2啊~';
        } else if (message.Content.includes('爱')) {
            content = '我爱你~';
        }else if (message.Content.includes('晚安')){
            content = '晚安，么么哒~';
        } else if (message.Content.includes('生日')){
            content = '生日快乐呦~';
        } else if (message.Content === '3') {
            options.msgType = 'news';
            options.title = '知乎~';
            options.description = 'class0810~';
            options.picUrl = 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4094533855,2791674877&fm=58&bpow=500&bpoh=500';
            options.url = 'https://www.zhihu.com/signup?next=%2F';
        }
    } else if (message.MsgType === 'voice') {
        content = `语音识别结果为: ${message.Recognition}`;
    } else if (message.MsgType === 'location') {
        content = `纬度：${message.Location_X}  经度：${message.Location_Y} 地图的缩放大小：${message.Scale} 位置详情：${message.Label}`;
    } else if (message.MsgType === 'event') {
        if (message.Event === 'subscribe') {
            content = '欢迎您关注公众号~';
            if (message.EventKey) {
                content = '欢迎您关注公众号~, 扫了带参数的二维码';
            }
        } else if (message.Event === 'unsubscribe') {
            console.log('无情取关~');
        } else if (message.Event === 'LOCATION') {
            content = `纬度：${message.Latitude} 经度：${message.Longitude}`;
        } else if (message.Event === 'CLICK') {
            content = `用户点击了：${message.EventKey}`;
        }
    }
    options.content = content;


    return options;

}
