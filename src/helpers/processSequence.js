import { allPass, andThen, compose, ifElse, length, otherwise, prop, tap, test } from 'ramda';
import Api from '../tools/api';

const api = new Api();

const getResult = prop('result');

const lessThenTen = (x) => x < 10;
const moreThenTwo = (x) => x > 2;
const shorterThenTen = compose(lessThenTen, length);
const longerThenTwo = compose(moreThenTwo, length);
const greaterThenZero = (x) => x > 0;
const isFloat = test(/^[0-9]*\.?[0-9]+$/);

const getFixed = (str) => Number(str).toFixed(0);
const getPowTwo = (x) => Math.pow(x, 2);
const reminderFromDivideByThree = (x) => x % 3;

const isValidate = allPass([longerThenTwo, shorterThenTen, isFloat, greaterThenZero]);

const getNumberUrl = api.get('https://api.tech/numbers/base');
const fetchToBinary = (number) => getNumberUrl({from: 10, to: 2, number});

const animalFetch = (id) => api.get(`https://animals.tech/${id}`)({});

const processSequence = ({value, writeLog, handleError, handleSuccess}) => {
  const logValue = tap(writeLog);
  const thenLogValue = andThen(logValue);
  const showError = () => handleError('ValidationError');


  const processContinuation = compose(
    otherwise(handleError),
    andThen(handleSuccess),
    andThen(getResult),
    andThen(animalFetch),
    thenLogValue,
    andThen(reminderFromDivideByThree),
    thenLogValue,
    andThen(getPowTwo),
    thenLogValue,
    andThen(length),
    thenLogValue,
    andThen(getResult),
    fetchToBinary,
    logValue,
    getFixed
  )

  compose(
    ifElse(isValidate, processContinuation, showError),
    logValue
  )(value);
 }

 export default processSequence;
