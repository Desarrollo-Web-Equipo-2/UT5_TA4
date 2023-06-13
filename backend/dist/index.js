"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRoute = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const jwt = __importStar(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
// const whitelist = ['http://localhost:4200'];
// app.use(cors({origin: whitelist}));
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.route('/api/login')
    .post(loginRoute);
app.get('/', (req, res) => {
    res.send("Bueas");
});
app.listen(port, () => {
    // tslint:disable-next-line
    console.log('server andando');
});
const RSA_PRIVATE_KEY = fs_1.default.readFileSync('./demos/private.key');
function validateEmailAndPassword() {
    return true;
}
function findUserIdForEmail(email) {
    return "5";
}
function loginRoute(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    if (validateEmailAndPassword()) {
        const userId = findUserIdForEmail(email);
        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: 120,
            subject: userId
        });
        // send the JWT back to the user
        // TODO - multiple options available
        res.send(jwt);
    }
    else {
        // send status 401 Unauthorized
        res.sendStatus(401);
    }
}
exports.loginRoute = loginRoute;
//# sourceMappingURL=index.js.map