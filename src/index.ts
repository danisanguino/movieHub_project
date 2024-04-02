import expressApp from "./server";
import config from "./config/config";
import prisma from "./db/client";
import connect from "./db/db"


const PORT = config.app.PORT


connect().then(() => {
    expressApp.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} and is connected to Atlas data base`);
    });
});

