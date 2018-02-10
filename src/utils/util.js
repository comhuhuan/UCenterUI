/**
 * [exportFn 导出文件]
 * @param  {[type]} filepath [服务端导出文件的路径]
 * @param  {[type]} filename [服务端导出文件的名称]
 * @return {[type]}          [description]
 */
export function exportFn(filepath, filename) {
    const a = document.createElement('a')
    const baseUrl = '/act-idc-web/common/excel/exportDownload.do'
    a.download = filename
    a.href = `${baseUrl}?filePath=${filepath}&filename=${filename}`
    a.style.display = 'none'
    document.body.appendChild(a)
    // console.log(a.href)
    // window.location.href = a.href
    // window.open( a.href )
    a.click()
    document.body.removeChild(a)
}
