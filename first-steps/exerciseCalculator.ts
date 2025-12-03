
interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  value1: number;
  value2: number[];
}

const DescriptionOfRating = (rating: number): string => {
  if (rating === 3) {
    return 'good job';
  } else if (rating === 2) {
    return 'not too bad but could be better';
  } else {
    return 'try harder';
  }
};

const ratingScale = (average: number, target: number): number => {
  let rating = 0;
  if (average >= target) {
    rating = 3;
  } else if (average >= target / 2) {
    rating = 2;
  } else {
    rating = 1;
  }
  return rating;
};

const verifyArrayOfNumbers = (arrayNumbers: number[]): boolean => {
  return arrayNumbers.every((number) => !isNaN(number));
};
const parse_arguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const arrayNumbers = process.argv.slice(3).map(Number);
  if (!isNaN(Number(args[2])) && verifyArrayOfNumbers(arrayNumbers)) {
    return {
      value1: Number(args[2]),
      value2: arrayNumbers
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateExercises = (dailyExercises: number[], target: number): Result => {
  const periodLength = dailyExercises.length;

  const trainingDays = dailyExercises.filter((exercise) => exercise > 0).length;
  const average = dailyExercises.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;

  // let rating = 0;
  // if (average >= target) {
  //   rating = 3;
  // } else if (average >= target / 2) {
  //   rating = 2;
  // } else {
  //   rating = 1;
  // }

  const rating = ratingScale(average, target);
  const ratingDescription = DescriptionOfRating(rating);

  // let ratingDescription = '';
  // if (rating === 3) {
  //   ratingDescription = 'good job';
  // } else if (rating === 2) {
  //   ratingDescription = 'not too bad but could be better';
  // } else {
  //   ratingDescription = 'try harder';
  // }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};


try {
  const { value1, value2 } = parse_arguments(process.argv);
  console.log(calculateExercises(value2, value1));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
