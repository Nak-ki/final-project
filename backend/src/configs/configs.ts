import dotenv from "dotenv";

dotenv.config();

interface IConfig {
    PORT: string;
    HOST: string;
    FRONT_URL: string;
    MONGO_URI: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    JWT_ACCESS_LIFETIME: any;
    JWT_REFRESH_LIFETIME: any;
    JWT_ACTIVE_SECRET: string
    JWT_ACTIVE_LIFETIME: any
    JWT_RECOVERY_SECRET: string
    JWT_RECOVERY_LIFETIME: any
}

const config: IConfig = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    FRONT_URL: process.env.FRONT_URL,
    MONGO_URI: process.env.MONGO_URI,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_ACCESS_LIFETIME: process.env.JWT_ACCESS_LIFETIME,
    JWT_REFRESH_LIFETIME: process.env.JWT_REFRESH_LIFETIME,
    JWT_ACTIVE_SECRET: process.env.JWT_ACTIVE_SECRET,
    JWT_ACTIVE_LIFETIME: process.env.JWT_ACTIVE_LIFETIME,
    JWT_RECOVERY_SECRET: process.env. JWT_RECOVERY_SECRET,
    JWT_RECOVERY_LIFETIME: process.env. JWT_RECOVERY_LIFETIME

};

export { config };