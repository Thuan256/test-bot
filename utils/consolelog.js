/**
 * 
 * @param {string} module
 * @param {string} content
 */
exports.consolelog = (module, content) => {
    var str = `&f[&b${module}&f]&r ${content}`
    var color = new Map([
        ['c', '31'],
        ['e', '33'],
        ['a', '32'],
        ['f', '37'],
        ['b', '36'],
        ['d', '35'],
        ['r', '0'],
        ['l', '1'],
        ['u', '4']
    ])
    str += '&r'
    color.forEach((b, a) => {
        str = str.replaceAll(`&${a}`, `\x1b[${b}m`)
    })
    console.log(str)
}