import { config } from 'dotenv'
config()

import { nexusPrisma } from 'nexus-plugin-prisma'
import { makeSchema } from 'nexus'
import { join } from 'path'
import * as modelTypes from './graphql'
import { ApolloServer } from 'apollo-server-express'
import express from 'express';
import { permissions } from './utils/rules'
import { isDev } from './utils/constants'
import { createContext } from './utils/helpers'
import { applyMiddleware } from 'graphql-middleware'
import * as HTTP from 'http'
import * as fs from 'fs';
import { graphqlUploadExpress } from 'graphql-upload'
import { iamportCallbackHandler } from './callback/payment'
import { addJobCallbackHandler, jsonToXmlUploader,dataProvider } from './callback'
import multer from 'multer'
import { runScheduler } from './schedule'
// import { translateCallbackHandler } from './callback/translate'

import { PrismaClient } from '@prisma/client'

export const schema = makeSchema({
    types: [modelTypes],
    sourceTypes: {
        modules: [{ module: join(__dirname, 'types.ts'), alias: "upload" }],
        headers: [
            'import { FileUpload } from "./types"',
        ],
    },
    outputs: {
        typegen: join(__dirname, 'typegen.ts'),
        schema: join(__dirname, 'schema.graphql'),
    },
    contextType: { module: join(__dirname, 'types.ts'), export: "Context" },
    plugins: [
        nexusPrisma({
            shouldGenerateArtifacts: true,
            paginationStrategy: 'prisma',
            experimentalCRUD: true,
        })
    ],
})

const apollo = new ApolloServer({
    schema: applyMiddleware(schema, permissions),
    context: createContext,
    playground: isDev() === true ? (process.env.CUSTOM_ENDPOINT ? {
        endpoint: process.env.CUSTOM_ENDPOINT,
        subscriptionEndpoint: process.env.CUSTOM_ENDPOINT
    } : true) : false,
    uploads: false,
    tracing: false,
    debug: false,
})

const app = express();
app.use("/graphql", graphqlUploadExpress({ maxFieldSize: 100000000, maxFileSize: 100000000, maxFiles: 1000, }));
app.use(express.json({ limit: '100mb' }));

const http = HTTP.createServer(app);

app.use(express.static(join(__dirname, 'static')));

app.use("/playauto/*", multer().any());
app.route("/playauto/add_job_callback*").post((req, res) => addJobCallbackHandler(req, res));

app.use("/callback/*", multer().any());
app.route("/callback/iamport_pay_result*").post((req, res) => iamportCallbackHandler(req, res));
// app.route("/callback/translate*").post((req, res) => translateCallbackHandler(req, res));
app.route("/callback/xml_upload*").post((req, res) => jsonToXmlUploader(req, res));

app.use("/api/*",multer().any());
app.route("/api/dataProvider*").get((req,res) => dataProvider(req,res));

const PORT = process.env.PORT || 3000

apollo.applyMiddleware({ app })
apollo.installSubscriptionHandlers(http)

http.listen(PORT, () => {
    console.log(`[🚀] GraphQL service ready at http://localhost:${PORT}/graphql`)
})

if(process.env.PORT === "8980"){
runScheduler();
}
