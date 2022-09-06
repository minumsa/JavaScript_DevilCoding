/* 변수 호이스팅 TDZ(Temporable Dead Zone) */
// let과 const는 ES6부터 생김
// 그 이전에는 var를 사용했음

// var와 let은 크게 다르지 않다. 둘을 바꿔서 사용해도 문제가 생기지 않는다.
// 하지만 var는 한번 선언된 변수를 다시 선언할 수 있다.

var name = 'Mike';
console.log(name); // "Mike"

var name = 'Jane';
console.log(name); // "Jane"

// 같은 상황에서 let은 에러 발생

let name = 'Mike';
console.log(name); // "Mike"

let name = 'Jane';
console.log(name); // Uncaught SyntaxError: Identifier 'name' has already been declared (at (1) variable.js:16:5)

// var는 선언하기 전에 사용할 수 있다.

console.log(name); // undefined
var name = 'Mike';

// 위 코드는 다음과 같이 동작
// var로 선언한 모든 변수는 코드가 실제로 이동하진 않지만 최상위로 끌어올려진 것처럼 동작한다. 이를 호이스팅이라고 한다.
// 그런데 선언은 호이스팅되지만 할당은 호이스팅되지 않기 때문에 콘솔은 undefined로 찍힌다. 할당은 세 번째 줄에서 처리된다.

var name; // 호이스팅(hoisting)
console.log(name); // undefined
name = 'Mike'; // 할당

// 같은 상황에서 let은 오류 생김
// let은 호이스팅되지 않는 걸까? 아님
// 사실 let과 const도 호이스팅 됨
// 호이스팅은 스코프 내부 어디서든 변수 선언은 최상위에 선언된 것처럼 행동
// 그런데 왜 var처럼 동작하지 않고 에러가 발생할까?
// 바로 Temporal Dead Zone, 줄여서 TDZ 때문

console.log(name); // ReferenceError
let name = 'Mike';

/* 호이스팅(hoisting) */
// TDZ 영역에 있는 변수들은 사용할 수 없음
// let과 const는 TDZ의 영향을 받음
// 다시 말해, 할당하기 전에는 사용할 수 없음
// 이는 코드를 예측 가능하게 하고 잠재적 버그를 줄일 수 있음

console.log(name); // Temporal Dead Zone
const name = 'Mike'; // 함수 선언 및 할당
console.log(name); // 사용 가능

// 호이스팅 2
// 현재 이 코드는 문제가 없음

let age = 30;
function showAge() {
  console.log(age);
}

showAge();

// 이 코드는 문제 발생
// 많은 사람들이 여기서 오해하는 게 let은 호이스팅되지 않는구나, 하는 것이다. 호이스팅은 스코프 단위로 일어난다. 여기서 스코프는 함수 내부(console.log(age))이다.

let age = 30;
function showAge() {
  console.log(age); // Temporal Dead Zone
  let age = 20;
}

showAge();

/* 변수의 생성 과정 */
// 변수는 3단계 생성 과정을 거친다.
// 1. 선언 단계
// 2. 초기화 단계: undefined를 할당하는 단계
// 3. 할당 단계

// var
// 1. 선언 및 초기화 단계(동시에)
// 2. 할당 단계

// let
// 1. 선언 단계(호이스팅되면서 선언 단계 이루어짐)
// 2. 초기화 단계(실제 코드에 도달했을 때 돼서 reference error 발생하는 것)
// 3. 할당 단계

// const
// 1. 선언 + 초기화 + 할당
// let과 var는 선언만 해놓고 나중에 할당하는 것 허용
// let과 var는 나중에 값을 바꿀 수 있으므로 어쩌면 당연
// name과 age는 괜찮지만 const로 선언한 gender 부분에서 error 발생

let name;
name = "Mike";

var age;
age = 30;

const gender
gender = "male";
// Uncaught SyntaxError: Missing initializer in const declaration

/* 스코프(scope) */
// var: 함수 스코프(function-scoped)
// let, const: 블록 스코프(block-scoped)
// - 함수, if 문, for 문, while 문, try/catch 문 등
// 블록 스코프는 모든 코드블록 내에서 선언된 변수는 코드블록 내에서만 유효하며 외부에서는 접근할 수 없다는 의미
// 예) 함수, if 문, for 문

function add() {
  // Block-level 스코프
}
if() {
  // Block-level 스코프
}
for(let i = 0, i < 10; i++){
  // Block-level 스코프
}

// 예를 들어 if 문 안에서 var로 선언한 변수는 if 문 밖에서도 사용이 가능
// 하지만 let과 const는 이렇게 사용할 수 없음
// 중괄호 내부에서만 사용 가능
// 이를 블록 스코프라고 함

const age = 30;

if (age > 19) {
  var txt = '성인';
}

console.log(txt); // '성인'

// var도 함수 내에서 선언되면 함수 밖에서 사용할 수 없음
// var가 유일하게 벗어날 수 없는 스코프가 함수 스코프

function add(num1, num2) {
  var result = num1 + num2;
}

add(2, 3);

console.log(result);
// Uncaught ReferenceError: result is not defined
