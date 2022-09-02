/* prototype */
// prototype 사용하면 중복 코드 줄이기 가능

const user = {
  name: 'Mike',
};

console.log(user.name); // "Mike"
console.log(user.hasOwnProperty('name')); // true
console.log(user.hasOwnProperty('age')); // false

// 상속

const car = {
  wheels: 4,
  drive() {
    console.log('drive..');
  },
};

const bmw = {
  color: 'red',
  navigation: 1,
};

const benz = {
  color: 'black',
};

const audi = {
  color: 'blue',
};

bmw.__proto__ = car;

const x5 = {
  color: 'white',
  name: 'x5',
};

x5.__proto__ = bmw;

console.log(x5.name); // "x5"
console.log(x5.color); // "white"
console.log(x5.navigation); // 1

/* 생성자 함수 이용 */

// const car = {
//   wheels: 4,
//   drive() {
//     console.log('drive..');
//   },
// };

const Bmw = function (color) {
  this.color = color;
};

Bmw.prototype.wheels = 4;
Bmw.prototype.drive = function () {
  console.log('drive..');
};
Bmw.prototype.navigation = 1;
Bmw.prototype.stop = function () {
  console.log('STOP!');
};

const x5 = new Bmw('red');
const z4 = new Bmw('blue');

// x5.__proto__ = car;
// z4.__proto__ = car;
// _: 언더스코어

console.log(x5.wheels); // 4
console.log(x5.stop()); // STOP!

// instanceof
// 생성자함수가 새로운 객체 만들어낼 때 그 객체는 생성자의 인스턴스라고 불림
// 자바스크립트는 이를 편리하게 확인할 수 있는 instance 연산자가 있음
// intanceof를 이용해 객체와 생산자를 비교할 수 있고 이는 해당 객체가 그 생성자로부터 생성된 것인지를 판단해 true 혹은 false로 반환

// 콘솔 창
// z4 instance of Bmw // true
// z4.constructor === Bmw // true

// 다른 방식으로 코드 간소화한 형태
// 이 형태로 하면 콘솔 창에서 constructor가 false로 나옴

const Bmw = function (color) {
  this.color = color;
};

Bmw.prototype = {
  // constructor: Bmw,
  wheels: 4,
  drive() {
    console.log('drive..');
  },
  navigation: 1,
  stop() {
    console.log('STOP!');
  },
};

// z4.constructor === Bmw // false
// 이를 방지하기 위해 prototype을 덮어쓰지 말고 위처럼 하나씩 property를 추가하는 게 좋음
// 혹은 constructor를 수동으로 명시해도 괜찮음
// 이렇게 자바스크립트는 명확한 constructor를 보장하지 않음
// 개발자에 의해 언제든지 수정될 수 있다는 점 염두에 두기

// 다른 예
// 이 자동차의 색상은 맘대로 변경 가능

const Bmw = function (color) {
  this.color = color;
};

const x5 = new Bmw('red');

// 아무나 색상을 변경하게 되면 곤란하므로 closure를 이용해 다음과 같이 코드를 변경하면 됨
// 이렇게 바꾸면 초기에 세팅한 컬러 값을 얻을 수만 있고 바꿀 수 있는 방법은 없음
// color 함수가 생성될 당시의 콘텍스트를 기억하는 것

const Bmw = function (color) {
  const c = color;
  this.getcolor = function () {
    console.log(c);
  };
};

const x5 = new Bmw('red');
