const mongoose = require('mongoose');
const dotenv = require('dotenv');
// dotenv.config({ path: './.env' })
const app = require('./app');

dotenv.config();
const DB = process.env.DATABASE;

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        // useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Database connetion successful'));

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`App is listening on port ${port}....`);
});