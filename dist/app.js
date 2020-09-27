"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// deps
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_graphql_1 = require("express-graphql");
const mongoose_1 = __importDefault(require("mongoose"));
// local
const schema_1 = require("./graphql/schema");
const resolvers_1 = require("./graphql/resolvers");
const auth_1 = require("./graphql/middleware/auth");
// helpers
const app = express_1.default();
app.use(body_parser_1.default.json());
// @ts-ignore
app.use(auth_1.isAuth);
// @ts-ignore
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
app.use('/graphql', express_graphql_1.graphqlHTTP({
    schema: schema_1.schema,
    rootValue: resolvers_1.resolvers,
    graphiql: true,
}));
// env vars
const dbName = encodeURI(process.env.MONGO_DB || '');
const PORT = process.env.PORT || 3000;
mongoose_1.default
    .connect(
// `mongodb+srv://${userName}:${userPwd}@cluster0.wn6yq.mongodb.net/${dbName}?retryWrites=true`,
`//mongodb://localhost:27017/${dbName}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => {
    app.listen(PORT);
})
    .then(() => {
    console.log(`Server started at http://localhost:${PORT}`);
    console.log(`Please see graphql environment at http://localhost:${PORT}/graphql`);
})
    .catch((err) => {
    console.log(err);
});
// todo replace gender with enum Gender
// todo add fragments
//# sourceMappingURL=app.js.map