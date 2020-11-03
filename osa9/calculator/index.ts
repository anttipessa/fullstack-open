import express from 'express';
const app = express();

import { calculateBmi } from "./bmiCalculator";

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    if (req.query.height === '' || req.query.weight === '') {
        return res.send({ error: 'malformatted parameters' });
    }
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = calculateBmi(height, weight);
    if (bmi === 'malformatted parameters') {
        return res.send({ error: 'malformatted parameters' });
    }
    const json = { weight, height, bmi };
    return res.send(json);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
