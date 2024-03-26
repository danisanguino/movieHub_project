import dotenv from 'dotenv';

type TsConfig = {
    [key:string]: EnviromentConfig
} 

type EnviromentConfig = {
    app: AppConfig
}

type AppConfig = {
    PORT: string | number
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
        }
    },
    production: {
        app: {
            PORT: process.env.PORT || 8081
        }
    }
}  

export default CONFIG[ENV]
