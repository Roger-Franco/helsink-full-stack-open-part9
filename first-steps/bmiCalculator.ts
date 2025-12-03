interface MultiplyValues {
  height: number,
  weight: number
}

const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const bmiResult = (bmi: number) => {
  if (bmi < 18.5) {
    return "Underweight range";
  } else if (bmi < 25) {
    return "Normal range";
  } else {
    return "Overweight range";
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  if (require.main !== module) {
    try {
      if (isNaN(Number(height)) || isNaN(Number(weight))) {
        throw new Error('malformatted parameters!');
      }
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      return bmiResult(bmi);
    } catch (error: unknown) {
      let errorMessage = 'Something bad happened.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      return errorMessage;
    }
  } else {
    return bmiResult(weight / ((height / 100) * (height / 100)));
  }
  // const heightInMeters = height / 100;
  // const bmi = weight / (heightInMeters * heightInMeters);
  // bmiResult(bmi: number)
  // if (bmi < 18.5) {
  //   return "Underweight range";
  // } else if (bmi < 25) {
  //   return "Normal range";
  // } else {
  //   return "Overweight range";
  // }
};

if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(height, weight);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}

