/**
 * @typedef {Object} PickItem
 * @property {number} chance
 */

/**
 * @param {PickItem[]} items
 * @returns {PickItem}
 */
module.exports.randomItemPicker = (items) => {

    if (items.length === 1) return items.shift();

    const random = Math.random();
    let acc = 0

    for (let i = 0, item; item = items[i]; i++) {
        acc += item.chance / 100;
        if (random < acc) return item;
    }
}