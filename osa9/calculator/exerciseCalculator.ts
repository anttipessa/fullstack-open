interface Results {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: String;
    target: number;
    average: number;
}

const calculateExercises = (a: Array<number>, target: number): Results => {
    const avg = a.reduce((sum, current) => sum + current, 0) / a.length;
    const days = a.filter(a => a != 0);
    let rating;
    let success = false;
    let ratingDescription;
    const score = target - avg;
    if (score > 1) {
        rating = 1;
        ratingDescription = 'thats awful, try harder';
    } else if (avg >= target) {
        rating = 3;
        ratingDescription = 'you´re a god';
        success = true;
    } else {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    }
    const result: Results = {
        periodLength: a.length,
        trainingDays: days.length,
        success,
        rating,
        ratingDescription,
        target,
        average: avg
    }
    return result;
}

interface exeValues {
    value1: Array<number>;
    value2: number;
}

const parseArgumentsAgain = (args: Array<string>): exeValues => {
    const days = args.filter(a => (a.match(/^\d+\.\d+$|^\d+$/) != null)).map(a => Number(a))
    days.shift()
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: days,
            value2: Number(args[2])
        }

    } else {
        throw new Error('Provided values were not numbers!');
    }
}


try {
    const { value1, value2 } = parseArgumentsAgain(process.argv);
    console.log(calculateExercises(value1, value2));
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}

