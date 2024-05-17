import dotenv from 'dotenv';

type TsConfig = {
    [key:string]: EnviromentConfig
} 

type EnviromentConfig = {
    app: AppConfig,
    db: DbConfig,
    cloudinary: CloudinaryConfig
}

type AppConfig = {
    PORT: string | number
}

type DbConfig = {
    URI: string
}

type CloudinaryConfig = {
    CLOUD_NAME: string,
    API_KEY: string,
    API_SECRET: string
}

if(process.env.NODE_ENV === "production"){
    dotenv.config({path: ".env.production"})
}else {
    dotenv.config({path: ".env.development"})
}


const ENV = process.env.NODE_ENV ?? "development";

const CONFIG: TsConfig = {
    development: {
        app: {
            PORT: process.env.PORT || 3051
        },
        db: {
            URI: process.env.MONGODB_URI || "mongodb://localhost:27017"
        },
        cloudinary: {
            CLOUD_NAME: process.env.CLOUD_NAME || "Error",
            API_KEY: process.env.API_KEY || "Error",
            API_SECRET: process.env.API_SECRET || "Error"
        },
    },
    production: {
        app: {
            PORT: process.env.PORT || 8081
        },
        db: {
            URI: process.env.MONGODB_URI || "mongodb://localhost:27017"
        },
        cloudinary: {
            CLOUD_NAME: process.env.CLOUD_NAME || "Error",
            API_KEY: process.env.API_KEY || "Error",
            API_SECRET: process.env.API_SECRET || "Error"
        },
    }
}  

export default CONFIG[ENV]
