const { consolelog } = require("my-utils");;
const mongoose = require('mongoose');

module.exports = {
    id: 'mongodb',
    aliases: ['mongodb', 'db'],
    path: '/mongodb.js',
    position: 1,
    reload_able: false,
    run: async () => {
        try {

            consolelog('MONGOOSE', `&aLoading databse...`);

            try {
                await mongoose.connect('mongodb+srv://mthunz:Thuan%40256%3C3@phonguoiviet.mmdj9qi.mongodb.net/pnv_database');
                consolelog('MONGOOSE', `&aConected to MongoDB!`);

            } catch (err) {
                console.error(err)
                consolelog('MONGOOSE', `&cFailed to connect to MongoDB...`);
                process.exit(1);
            }

        } catch (e) {
            console.error(e)
        }
    }
}