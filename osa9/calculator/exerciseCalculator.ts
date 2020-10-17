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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1] , 2));