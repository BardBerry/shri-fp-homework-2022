/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import { identity } from "lodash";
import { allPass, anyPass, compose, converge, count, countBy, equals, filter, find, prop, values } from "ramda";

const isWhite = (x) => x === 'white';
const isRed = (x) => x === 'red';
const isGreen = (x) => x === 'green';
const isBlue = (x) => x === 'blue';
const isOrange =  (x) => x === 'orange';
const isNotWhite = (x) => x !== 'white';

const greaterThenTwo = (x) => x >= 2;
const greaterThenThree = (x) => x >= 3;

const getCircle = prop('circle');
const getStar = prop('star');
const getTriangle = prop('triangle');
const getSquare = prop('square');

//star
const isRedStar = compose(isRed, getStar);
const isOrangeStar = compose(isOrange, getStar);
const isGreenStar = compose(isGreen, getStar);
const isBlueStar = compose(isBlue, getStar);

//square
const isGreenSquare = compose(isGreen, getSquare);
const isOrangeSquare = compose(isOrange, getSquare);

//triangle
const isWhiteTriangle = compose(isWhite, getTriangle);
const isGreenTriangle = compose(isGreen, getTriangle);

//circle
const isWhiteCircle = compose(isWhite, getCircle);
const isBlueCircle = compose(isBlue, getCircle);

//color counters
const countGreen = count(isGreen);
const countRed = count(isRed);
const countOrange = count(isOrange);

const redEqualsBlue = ({blue, red}) => blue === red;
const squareEqualsTriangle = converge(equals, [getSquare, getTriangle])

const groupIdentity = countBy(identity);
const getColorsCount = compose(groupIdentity, values);

const isTwoGreen = compose(equals(2), countGreen, values);
const isOneRed = compose(equals(1), countRed, values);

const squareIsNotWhite = compose(isNotWhite, getSquare);
const trueIfExist = (x) => Boolean(x);
const findGreaterThenThree = compose(trueIfExist, greaterThenThree)

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([isRedStar, isGreenSquare, isWhiteCircle, isWhiteTriangle]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(greaterThenTwo, countGreen, values);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = compose(redEqualsBlue, getColorsCount);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([isBlueCircle, isRedStar, isOrangeSquare]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = compose(findGreaterThenThree, values, getColorsCount, filter(isNotWhite), values)

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([isOneRed, isTwoGreen, isGreenTriangle]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(equals(4), countOrange, values);

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = anyPass([isOrangeStar, isGreenStar, isBlueStar]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(equals(4), countGreen, values);

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([squareIsNotWhite, squareEqualsTriangle]);
