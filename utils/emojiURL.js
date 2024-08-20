/**
 * 
 * @param {string} emoji 
 * @returns {string | null}
 */
exports.emojiURL = (emoji) => {
    if ((!emoji?.includes(':')) || !emoji) return null

    return `https://cdn.discordapp.com/emojis/${emoji.split(':')[2].slice(0, -1)}.png`
}