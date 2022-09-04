/* Generator */
// 함수의 실행을 중간에 멈췄다가 재개할 수 있는 독특한 기능
// Generator 함수 실행하면 Generator 객체가 반환됨
// Generator 객체는 next() 메서드가 있음

function* fn() {
  console.log(1);
  yield 1;
  console.log(2);
  yield 2;
  console.log(3);
  console.log(4);
  yield 3;
  return 'finish';
}

const a = fn();

// 이렇게 Generator 함수 실행하면 Generator 객체만 반환되고 함수 본문 코드는 실행되지 않음

console.log(a); // fn {<suspended>}
console.log(a.next());
// 1
// {value: 1, done: false}
console.log(a.next());
// 2
// {value: 2, done: false}
console.log(a.next());
// 3
// 4
// {value: 3, done: false}
console.log(a.next());
// {value: 'finish', done: true}

// Generator는 next() 메서드 외에 return(과 throw() 메서드도 가지고 있음
// 동일한 코드에서 실행하다가 중간에 return() 메서드를 호출하면?
// 그 즉시 done 속성 값이 true로 바뀜
// 이후 next는 얻을 수 없고 done은 그대로 true

console.log(a.next());
// 1
// {value: 1, done: false}
console.log(a.next());
// 2
// {value: 2, done: false}
console.log(a.return('END'));
// {value: 'END', done: true}
console.log(a.next());
// {value: undefined, done: true}

// throw()도 마찬가지로 done을 true로 바꿈
// try, catch 문으로 코드를 감싼 뒤 a.next()를 하다가 throw()를 쓰면 catch문에 있는 내용이 실행됨

function* fn() {
  try {
    console.log(1);
    yield 1;
    console.log(2);
    yield 2;
    console.log(3);
    console.log(4);
    yield 3;
    return 'finish';
  } catch (e) {
    console.log(e);
  }
}

const a = fn();

console.log(a.next());
// 1
// {value: 1, done: false}
console.log(a.next());
// 2
// {value: 2, done: false}
console.log(a.throw(new Error('err..')));
// Error: err..
// {value: undefined, done: true}

// Generator
// iterable
// - Symbol.iterator 메서드가 있다.
// - Symbol.iterator는 iterator를 반환해야 한다.

// iterator
// - next 메서드를 가진다.
// - next 메서드는 value와 done 속성을 가진 객체를 반환한다.
// - 작업이 끝나면 done은 true가 된다.

// 의문점? 배열도 반복이 가능한데 배열 공부할 땐 저런 내용 들어본 적 없음
// 배열은 반복 가능한 개체
// iterable은 for of 이용해서 순회할 수 있음

function* fn() {
  yield 4;
  yield 5;
  yield 6;
}

const a = fn();

// 콘솔 창
/* a[Symbol.iterator]() === a */
// true
// Generator에 Symbol.iterator 메서드를 실행한 값이 자기 자신이란 것
// 즉 Generator는 iterator 객체라는 것

/*
for (let num of a) {
  console.log(num);
}
*/
// 4
// 5
// 6
// undefined
// 값들이 잘 나옴
// for of문이 시작되면 symbol.iterator를 호출하고 없으면 에러 발생
// 반환된 iterator에 next 메서드 호출하면서 done이 true가 될 때까지 반복
// 문자열도 가능

/* next() 메서드에 인수 전달 */

function* fn() {
  const num1 = yield '첫 번째 숫자를 입력해주세요';
  console.log(num1);

  const num2 = yield '두 번째 숫자를 입력해주세요';
  console.log(num2);

  return num1 + num2;
}

const a = fn();

console.log(a.next());
// {value: '첫 번째 숫자를 입력해주세요', done: false}
// 첫 번째에서 멈춤
// value는 yield 오른쪽에 있는 값

console.log(a.next(2));
// 2
// {value: '두 번째 숫자를 입력해주세요', done: false}
// next에 인수 넣으면 방금 인수로 넣은 숫자는 num1에 저장, yield 두 번째에서 멈춤
// 마찬가지로 yield 오른쪽 값이 value로 나옴

console.log(a.next(4));
// 4
// {value: 6, done: true}
// 두 번째 숫자를 입력하면 num2에 4가 들어가면서 value가 4가 되고, done이 true로 바뀜
// 이렇게 Generator는 외부로부터 값을 입력받을 수도 있음

/* Generator는 미리 값을 만들어 두지 않음 */
// 메모리 관리 측면에서 효율적
// 필요한 순간에만 연산해서 값을 주기 때문에 이런 코드도 가능
// 다음과 같이 while, true 문을 사용해 무한 반복자를 만들어도 브라우저가 뻗지 않음
// next()를 호출할 때마다 값을 주기 때문
// Generator 함수를 사용하지 않았다면 break가 없는 while, true 문은 사용하면 안 됨
// Generator는 필요한 값만 그때그때 생성
// 일반적인 함수로 어떤 값을 구할 때는 모든 값을 미리 계산해놔야 함
// 그리고 쓸지 안 쓸지 정해지지 않은 상황에서도 그 값을 유지해야 함
// 그런데 Generator를 사용하면 필요한 순간까지 계산 미룰 수 있음

// function* fn() {
//   let index = 9;
//   while (true) {
//     yield index++;
//   }
// }

// const a = fn();

/* Generator - yield*를 이용 */
// yield* 배열을 이용해 다른 Generator를 부르기
// 이렇게 Generator 함수가 2개 있는 상황
// gen2에서 yield 배열을 하고 gen1, 즉 다른 generator 함수를 호출하고 있음
// 요약해서 Generator는 다른 작업을 하다가 다시 돌아와 next() 해주면 진행이 멈췄던 부분부터 이어서 실행 => 예) Redux Saga

function* gen1() {
  yield 'W';
  yield 'o';
  yield 'r';
  yield 'l';
  yield 'd';
}
function* gen2() {
  yield 'Hello,';
  yield* gen1();
  yield '!';
}

console.log(...gen2());
// 구조분해 할당(...) 사용
// Hello, W o r l d !
