// 校验ip地址的正则
export const ipReg = /^(((\d{1,2})|(1\d{2,2})|(2[0-4][0-9])|(25[0-5]))\.){3,3}((\d{1,2})|(1\d{2,2})|(2[0-4][0-9])|(25[0-5]))$/
// export const ipReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/

// 校验域名的正则
export const domainReg =  /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/

// 校验邮箱的正则
export const emailReg = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
// export const emailReg = /^\\w+([-_.]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,6})+$/

// 校验手机号的正则
export const mobileReg = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/

// 校验固定电话的正则
// export const telReg = /^(\d{2,4}[-_－—]?)?\d{3,8}([-_－—]?\d{3,8})?([-_－—]?\d{1,7})?$)|(^0?1[35]\d{9}$/
export const telReg = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/

// 校验固话与手机号的正则
export const tel_mobileReg = /^(0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8})|(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})(-| )?)?([0-9]{7,8})((-| |转)*([0-9]{1,4}))?$/

// 校验URL
// export const urlReg = /^(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/
export const urlReg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g

// 判断正整数 用于判断端口号
export const positiveIntegerReg = /^[0-9]+$/

// 校验邮政编码的正则
export const postalCode = /^[1-9][0-9]{5}$/

export const portValidate = str => {
    return positiveIntegerReg.test(str) && str >= 1 && str <= 65535
}

export const portRangesValidate = str => {

    if(str.indexOf("|") > -1) {
        const portRanges = str.split("|")
        for(let i = 0; i < portRanges.length; i++) {
            const result = portRangeValidate(portRanges[i], i + 1)
            if(typeof result === "string") {
                return result
            }
        }
        /*portRanges.forEach( (portRange, index) => {
            return portRangeValidate(portRange, index + 1)
        })*/
    } else {
        return portRangeValidate(str)
    }
}

function portRangeValidate(str, index) {

    const ports = str.split('-')
    const len = ports.length
    console.log(ports, len)
    if(len === 1) {
        if(!positiveIntegerReg.test(ports[0])) {
            return `端口${index ? `(${index})` : ''}格式错误，请输入正确的端口`
        }
        if(!portValidate(ports[0])) {
            return `端口${index ? `(${index})` : ''}错误，端口只能在1-65535之间，请输入正确的端口`
        }
        return true

    } else if(len === 2) {
        if(!positiveIntegerReg.test(ports[0])) {
            return `端口段${index ? `(${index})` : ''}起始端口格式错误，请输入正确的端口`
        }
        if(!portValidate(ports[0])) {
            return `端口段${index ? `(${index})` : ''}起始端口错误，端口只能在1-65535之间，请输入正确的端口`
        }
        if(!positiveIntegerReg.test(ports[1])) {
            return `端口段${index ? `(${index})` : ''}终止端口格式错误，请输入正确的端口`
        }
        if(!portValidate(ports[1])) {
            return `端口段${index ? `(${index})` : ''}终止端口错误，端口只能在1-65535之间，请输入正确的端口`
        }
        if(parseInt(ports[0]) > parseInt(ports[1])) {
            return '起始端口不能大于终止端口，请输入正确的端口段'
        }
        return true
    }
    return '请输入正确的端口（段）'
}

export const ipRangeValidate = str => {
    const ips = str.split('-')
    const len = ips.length
    if (len === 1) {
        if(!ipReg.test(ips[0])) {
            return 'IP地址格式错误，请输入正确的IP地址'
        }
        return true
        // return ipReg.test(ips[0])
    } else if (len === 2) {
        if(!ipReg.test(ips[0])) {
            return '起始IP地址格式错误，请输入正确的IP地址'
        }
        if(!ipReg.test(ips[1])) {
            return '结束IP地址格式错误，请输入正确的IP地址'
        }
        if(ipToNumber(ips[0]) > ipToNumber(ips[1])) {
            return '起始IP地址不能大于，请输入正确的IP地址段'
        }
        return true
        // return ipReg.test(ips[0]) && ipReg.test(ips[1]) && ipToNumber(ips[0]) < ipToNumber(ips[1])
    }
    return '请输入正确的IP地址（段）'
    // return false
}

// ip转成数字
export function ipToNumber(ip) {
    let num = 0
    if (ip == "") {
        return num
    }
    const aNum = ip.split(".")
    if (aNum.length != 4) {
        return num;
    }
    num += parseInt(aNum[0]) << 24;
    num += parseInt(aNum[1]) << 16;
    num += parseInt(aNum[2]) << 8;
    num += parseInt(aNum[3]) << 0;
    num = num >>> 0; //这个很关键，不然可能会出现负数的情况
    return num
}
// 数字转成ip
export function numberToIp(number) {
    let ip = ""
    if (number <= 0) {
        return ip
    }
    const ip3 = (number << 0) >>> 24
    const ip2 = (number << 8) >>> 24
    const ip1 = (number << 16) >>> 24
    const ip0 = (number << 24) >>> 24

    ip += ip3 + "." + ip2 + "." + ip1 + "." + ip0
    return ip
}
