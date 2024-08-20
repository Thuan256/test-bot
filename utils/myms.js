/**
 * 
 * @typedef {Object} MyMsOptions
 * @property {boolean} long 
 * @property {Object} except
 * @property {boolean} except.d
 * @property {boolean} except.h
 * @property {boolean} except.m
 * @property {boolean} except.s
 */

/**
 * @param {string | number} time 
 * @param {MyMsOptions} options
 * @return {string | number | false} 
 */
module.exports.myms = (time, options) => {
    let timeStr = String(time).trim();
    const timeValue = Number(timeStr);
    const timeRegex = /^(?:(\d+))?(?:(\d+d))?(?:(\d+h))?(?:(\d+m))?(?:(\d+s))?$/;

    if (!timeRegex.test(timeStr)) return false;

    const timeUnits = {
        d: 86400000,
        h: 3600000,
        m: 60000,
        s: 1000,
    };

    const timeKeys = Object.keys(timeUnits);
    const timeOptions = timeKeys.map(i => !!options?.except?.[i])
    const timeLongKeys = ['ngày', 'giờ', 'phút', 'giây'];

    let timeInMs = isNaN(timeValue) ? 0 : timeValue

    if (isNaN(timeValue)) {
        let regex = /(\d+)(d|h|m|s)/g;
        let match;

        while ((match = regex.exec(timeStr))) {
            const [_, value, unit] = match;
            const unitValue = timeUnits[unit]

            if (unitValue) timeInMs += (unitValue * value);
        }
        return timeInMs
    }

    let timeArray = timeKeys.map((key) => {
        const unitValue = timeInMs / timeUnits[key];
        timeInMs %= timeUnits[key];
        return Math.floor(unitValue);
    });

    const filteredTimeArray = timeArray.map((value, index) => (value > 0 && !timeOptions[index]) ? value : 0)

    timeArray = filteredTimeArray.join('') === '0000' ? timeArray : filteredTimeArray

    const timeStringArray = timeArray.reduce((acc, value, index) => {
        if (value > 0) acc.push(((options?.long) ? `${value} ${timeLongKeys[index]}` : `${value}${timeKeys[index]}`));
        return acc
    }, [])

    return timeStringArray.join(' ')
};