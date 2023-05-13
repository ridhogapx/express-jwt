const express: any = require('express');
const dotenv: any = require('dotenv');
const jwt:any = require('jsonwebtoken');
const bodyParser = require('body-parser');

// Initialize Express
const app: any = express();

// Config .env
dotenv.config();

// Get SECRET variable from .env
process.env.SECRET;

// Generate token
const generateAccessToken = (email: string): string => {
    return jwt.sign({email : email}, process.env.SECRET, {
        expiresIn: '1800s'
    });
}

// HTTP Payload parser
const payloadParser: any = bodyParser.urlencoded({extended: false});

// Server port
const port: number = 7000;

// Express 
app.post('/api/user', payloadParser ,(req: any, res: any): void => {
    const email = req.body.email;
    const token = generateAccessToken(email);
    const response = {
        message: 'Successfull',
        token: token
    }

    res.json(response);
})

app.get('/api/auth', (req: any, res: any): void => {
    const authHeader = req.header('Authorization');
    

    jwt.verify(authHeader, process.env.SECRET as string, (err: any, result: any) => {
        if(err) console.log(err);
        const success = {
            message: 'Token is match!',
            result: result
        };

        res.json(success);

    })
})  

app.listen(port, (): void => {
    console.log(`Server running on port ${port}`);
})
