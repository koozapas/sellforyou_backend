declare namespace NodeJS {
    export interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        APP_SECRET: string;
        APP_REFRESH_SECRET: string;
        PORT?: string;
        AWS_ACCESS_KEY: string;
        AWS_SECRET_ACCESS_KEY: string;
        AWS_BUCKET: string;
        CODE_SECRET: string;
        X_NCP_APIGW_API_KEY_ID: string;
        X_NCP_APIGW_API_KEY: string;
        REDIS_SECRET: string;
        REDIS_PORT: string;
        REDIS_HOST: string;
    }
}
