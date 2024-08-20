/**
 * 
 * @param {number} min min value
 * @param {number} max max value
 * @returns {number}
 */
exports.randomNumber = (min, max) => {
    try {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } catch (e) {
        console.error(e)
    }
}
