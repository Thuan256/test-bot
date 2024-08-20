const { formatNumber } = require("./formatNumber")
const { parseNumber } = require("./parseNumber")
/**
 * 
 * @param {number} a 
 * @param {number} b 
 * @returns {string}
 */
exports.processString = (a, b) => {

    const _a = a
    const _b = b
    a = formatNumber(parseNumber(a))
    b = formatNumber(parseNumber(b))

    return (_a >= _b) ? `**${a}**/**${b}**` : `${a}/**${b}**`
}