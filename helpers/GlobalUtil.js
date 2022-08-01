export class Util{
    static getCookie(name){
        const cookies=document.cookie;
        const reqCookie=cookies.split(';').find(each=>each.split('=')[0] === name || each.split('=')[0] === ` ${name}`);
        return reqCookie.split('=')[1];
    }
};