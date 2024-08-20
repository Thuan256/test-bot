/**
 * 
 * @param {number} number 
 * @returns 
 */
exports.formatNumber = (number) => new Intl.NumberFormat('en-US').format(number)