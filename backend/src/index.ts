import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as jwt from 'jsonwebtoken';
import fs from 'fs';
import cors from "cors";

const app: Application = express();
const port = 3000;

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.route('/api/login')
    .post(loginRoute);

app.get('/', (req: Request, res: Response) => {
    res.send("Bueas");
})
app.get('/test', (req: Request, res: Response) => {
    console.log(req.headers.authorization);
    res.send(JSON.stringify('OK'));
});

app.listen(port, () => {
    console.log('server andando');
})

const RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key');

function validateEmailAndPassword() {
    return true;
}

function findUserIdForEmail(email: string) {
    return email;
}

export function loginRoute(req: Request, res: Response) {

    const email = req.body.email;
    const password = req.body.password;

    if (validateEmailAndPassword()) {
        const userId = findUserIdForEmail(email);
        const expireTime = 600;

        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
            algorithm: 'HS256',
            expiresIn: expireTime,
            subject: userId,
        });

        res.send(JSON.stringify({
            jwt: jwtBearerToken,
            expiresIn: expireTime
        }));
    }
    else {
        // send status 401 Unauthorized
        res.sendStatus(401);
    }
}