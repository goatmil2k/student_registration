const app = require("./app");

const connectToDatabase = require("./src/db/connection");
require('dotenv').config();

const port = process.env.PORT;

connectToDatabase().then(() => {
    app.listen(port || 5000, () => {
        console.log(`Server is listening on port at http://localhost:${port}`);
    });
}).catch((err) => {
    console.log(err)
    throw new Error("An error occured while trying connect to the server");
})