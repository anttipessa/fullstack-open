import express from 'express';
const app = express();
app.use(express.json());

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

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
        return res.status(400).send({ error: 'malformatted parameters' });
    }
    const json = { weight, height, bmi };
    return res.send(json);
});

interface exerciseBody {
    daily_exercises: Array<number>;
    target: number;
}

app.post('/exercies', (req, res) => {
    try {
        const { daily_exercises, target }: exerciseBody = req.body as exerciseBody;
        if (!daily_exercises || !target) {
            return res.status(400).send({ error: 'parameters missing' });
        }
        if (Array.isArray(daily_exercises) === false || daily_exercises.some(isNaN)|| isNaN(Number(target)) === true) {
            return res.status(400).send({ error: 'malformatted parameters' });
        }
        const json = calculateExercises(daily_exercises, target);
        return res.json(json);
    } catch (e) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }
}
);

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
