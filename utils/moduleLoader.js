const { Collection } = require("discord.js")
const { readdirSync } = require("node:fs")

/**
 * 
 * @param {string} dir 
 * @param {string} commandName 
 */
exports.moduleLoader = (dir, commandName) => {
    try {

        const modules = {};
        ['buttons', 'menus', 'modals', 'commands'].forEach(_ => modules[_] = new Collection())

        const folderPath = `${dir}/${commandName}-modules`

        for (const dir of readdirSync(folderPath)) {

            const modulePath = `${folderPath}/${dir}`

            for (const file of readdirSync(`${modulePath}`)) {

                if (file.endsWith('.js')) {

                    const filePath = `${modulePath}/${file}`
                    delete require.cache[require.resolve(filePath)]

                    const _module = require(filePath);
                    (_module.id) && modules[dir].set(_module.id, _module)
                } else {

                    const files = readdirSync(`${modulePath}/${file}`).filter(f => f.endsWith('.js'))

                    for (const _file of files) {

                        const filePath = `${modulePath}/${file}/${_file}`
                        delete require.cache[require.resolve(filePath)]

                        const _module = require(filePath);
                        (_module.id) && modules[dir].set(_module.id, _module)

                    }
                }
            }
        }

        return modules

    } catch (e) {
        console.error(e)
    }
}