import expressApp from "./server";
import config from "./config/config";


const PORT = config.app.PORT


expressApp.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})


 