// const express = require('express');
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  const height = Number(_req.query.height);
  const weight = Number(_req.query.weight);
  const bmi = calculateBmi(height, weight);
  if (isNaN(height) || isNaN(weight)) {
    res.send({ error: 'malformatted parameters' });
  }
  res.send({ weight, height, bmi });
});

app.post('/exercises', (_req, res) => {
  const { daily_exercises, target } = _req.body;
  if (daily_exercises.length === 0 || !target) {
    res.status(400).send({ error: 'parameters missing' });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (isNaN(Number(target)) || daily_exercises.some(isNaN)) {
    res.status(400).send({ error: 'malformatted parameters' });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(daily_exercises, target);
  res.send(result);
});

const PORT = 3030;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});