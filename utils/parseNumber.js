const { randomNumber } = require("./randomNumber")

/**
 * 
 * @param {string} text 
 */
exports.parseNumber = (text) => {
    try {
        text = String(text)
        
        if (!text) return;
        return text.includes('~') ? randomNumber(...text.split('~').map(i => parseInt(i))) : parseInt(text)
    } catch (e) {
        console.error(e)
    }
}