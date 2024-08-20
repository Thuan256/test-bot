exports.basecode = {
    /**
     * 
     * @param {string} id1 
     * @param {string} id2 
     * @returns {string}
     */
    encode: (id1, id2) => {
        const sorted = [id1, id2].sort()

        const combined = sorted.join('_');
        const encoded = Buffer.from(combined).toString('base64')
        return encoded;
    },
    /**
     * 
     * @param {string} id 
     * @returns {string[]}
     */
    decode: (id) => {
        const decoded = Buffer.from(id, 'base64').toString()
        const [id1, id2] = decoded.split('_');
        return [id1, id2];
    }
}

