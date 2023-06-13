import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as jwt from 'jsonwebtoken';
import fs from 'fs';
import cors from "cors";

const app: Application = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.route('/api/login')
    .post(loginRoute);

app.get('/', (req: Request, res: Response) => {
    res.send("Bueas");
})

app.listen(port, () => {
    // tslint:disable-next-line
    console.log('server andando');
})

const RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key');

function validateEmailAndPassword() {
    return true;
}

function findUserIdForEmail(email: string) {
    return "5";
}

export function loginRoute(req: Request, res: Response) {

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