/* toString() */
// 우리가 실생활에서 사용하는 10진수
// 개발을 하다 보면 2진수나 색상 표현을 위해 16진수가 필요할 때가 있음

let num = 10;

num.toString(); // "10"
num.toString(2); // "1010"

let num2 = 255;

num2.toString(16); // "ff"

/* Math */
// 자바스크립트에는 수학과 관련된 프로퍼티와 메소드를 가지고 있는 Math라는 내장 객체가 있음
// 대표적 프로퍼티의 예로 Math.PI가 있는데 원주율을 보여줌

// Math.PI
Math.PI; // 3.141592653589793

// Math.ceil() : 올림
let num1 = 5.1;
let num2 = 5.7;

Math.ceil(num1); // 6
Math.ceil(num2); // 6

// Math.floor() : 내림
let num1 = 5.1;
let num2 = 5.7;

Math.floor(num1); // 5
Math.floor(num2); // 5

// Math.round() : 반올림
let num1 = 5.1;
let num2 = 5.7;

Math.floor(num1); // 5
Math.floor(num2); // 6

// 소수점 자리수
// 그런데 작업을 하다 보면 소수점까지 표현해야 할 때가 더 많음
// 요구사항 : 소수점 둘째자리까지 표현(셋째 자리에서 반올림)

let userRate = 30.1234;

userRate * 100; // 3012.34
// 100을 곱하고

Math.round(userRate * 100); // 3012
// 반올림

Math.round(userRate * 100) / 100; // 30.12
// 다시 100으로 나눔
// 소수점 둘째 자리까지 표현!

// toFixed() : 숫자를 인수로 받아 그 숫자 만큼 소수점 이하 개수에 반영
// 훨씬 간단

let userRate = 30.1234;

userRate.toFixed(2); // "30.12"
userRate.toFixed(0); // "30"
userRate.toFixed(6); // "30.123400"
// 만약 0이거나 기존 소수점 개수보다 크면 나머지 0으로 채움

// 그런데 toFixed()는 문자열을 반환한다는 점 주의
// 그래서 반환받은 이후 Number()를 이용해 숫자로 변환 후 작업하는 경우가 많음
userRate.toFixed(2); // "30.12"
Number(userRate.toFixed(2)); // 30.12

// isNaN()
// NaN(Not a Number)인지 아닌지 판단
// isNaN만이 NaN인지 아닌지 판단 가능
// 헷갈리지만 외워 두어야 함

let x = Number('x'); // NaN

x == NaN; // false
x === NaN; // false
NaN == NaN; // false
// NaN은 신기하게도 자기 자신과도 같지 않다고 판단

isNaN(x); // true
isNaN(3); // false

// parselnt() : 문자열을 숫자로 바꿈
// Number()와 다른 점은 문자가 혼용되어 있어도 동작한다는 점
// Number()는 NaN을 반환하지만 parseInt()는 읽을 수 있는 부분까지는 읽고 문자를 만나면 숫자를 반환
// 그래서 parseInt()는 숫자로 시작하지 않으면 parseInt()는 NaN을 반환
// 그런데 parseInt()는 두 번째 인수를 받아서 진수를 지정할 수 있음

let margin = '10px';

parseInt(margin); // 10
Number(margin); // NaN

// 숫자로 시작하지 않는 경우

let redColor = 'f3';
parseInt(redColor); // NaN

// 진수 지정

let redColor = 'f3';
parseInt(redColor); // NaN

let redColor = 'f3';
parseInt(redColor, 16); // NaN
// f로 시작했지만 두 번째 인수에 16을 전달해 16진수로 바꿈

parseInt('11', 2); // 3

// parseFloat()
// parseFloat()는 parseInt()와 동일하게 동작하지만 부동소수점을 반환함
// parseInt()는 소수점 이하는 무시하고 정수만 반환

let padding = '18.5%';

parseInt(padding); // 18

parseFloat(padding); // 18.5

// Math.random()
// 0 ~ 1 사이 무작위 숫자 생성
// 범위는 0부터 1 사이의 무작위 숫자
Math.random(); // 0.26027823967117425

// 1 ~ 100 사이 임의의 숫자를 뽑고 싶다면?

Math.floor(Math.random() * 100) + 1;
// 1. Math.random()으로 숫자를 생성 - 0.6789
// 2. 100을 곱함 - 67.89
// 3. Math.floor()를 이용해 소수점 이하 버림 - 67
// 4. 1을 더해줌(랜덤 숫자가 0.0~가 나올 수 있어서) - 68

// Math.max() / Math.min()
Math.max(1, 4, -1, 5, 10, 9, 5.54); // 10
Math.min(1, 4, -1, 5, 10, 9, 5.54); // -1

// Math.abs() : 절대값
// abs는 absolute의 약자
Math.abs(-1); // 1

// Math.pow(n, m) : 제곱
// pow는 power의 약자
Math.pow(2, 10); // 1024

// math.sqrt() : 제곱근
// sqrt는 square root의 약자
math.sqrt(16); // 4
