const _ = require('lodash')

/**
 * 
 * @param {string} text 
 */
exports.parseNumber = (text) => {
    try {
        text = String(text)
        
        if (!text) return;
        return text.includes('~') ? _.random(...text.split('~').map(i => parseInt(i))) : parseInt(text)
    } catch (e) {
        console.error(e)
    }
}