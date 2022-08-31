// // 어휘적 환경(Lexical Environment)

// // 자바스크립트는 어휘적 환경을 갖는다. 코드가 선언되면 script 내에서 선언한 변수들이 Lexical 환경에 올라간다. (이때, let으로 선언된 변수도 hoisting된다. 다만 초기화가 되어있지 않아 사용할 수는 없다.) 그에 비해 함수 선언문은 변수와 달리 바로 초기화되어 사용할 수 있다.

// let one;
// one = 1;

// function addOne(num) {
//   console.log(one + num);
// }

// // 전역(외부) Lexical 환경
// // one: 초기화 X(사용 불가)
// // addOne: function(사용 가능)

// addOne(5); // 함수가 넘겨받은 지역변수와 매개변수 저장

// // 내부 Lexical 환경 => 외부 Lexical 환경에 대한 참조를 가짐
// // num: 5

// function makeAdder(x) {
//   return function (y) {
//     return x + y;
//   };
// }

// // 이 함수는 자신이 y를 가지고 있고 상위함수인 makeAdder의 매개변수 x에 접근 가능

// const add3 = makeAdder(3);
// console.log(add3(2)); // 5

// // add3 함수가 생성된 이후에도 상위함수인 makeAdder의 x에 접근 가능
// // 이런 것을 Closure라고 하며 Closure는 함수와 렉시컬 환경의 조합
// // 이는 함수가 생성될 당시의 외부 변수를 기억하며 생성된 이후에도 계속 접근 가능

// const add10 = makeAdder(10);
// console.log(add10(5)); // 15
// console.log(add3(1)); // 4

// // 전역 Lexical 환경
// // makeAdder: function
// // add3: 초기화 X

// // makeAdder Lexical 환경
// // x: 3

// // 익명함수 Lexical 환경
// // y: 2

function makeCounter() {
  let num = 0;

  return function () {
    return num++;
  };
}

let counter = makeCounter();

console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter()); // 2
