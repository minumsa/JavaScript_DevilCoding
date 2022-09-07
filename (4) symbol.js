/* property key : 문자형 */
// 객체 프로퍼티 키는 문자형으로 가능

const obj = {
  1: '1입니다.',
  false: '거짓',
};

Object.keys(obj); // ['1', 'false']

obj['1']; // "1 입니다."
obj['false']; // "거짓"

/* Symbol */
// 유일한 식별자 만들 때 사용
// 유일성 보장
// 전체 코드 중 딱 하나라는 것

const a = Symbol(); // new를 붙이지 않는다.
const b = Symbol();

console.log(a); // Symbol()
console.log(b); // Symbol()

a === b; // false
a == b; // false

// Symbol을 만들 때 설명을 붙여줄 수도 있음
// 설명을 붙여주면 디버깅할 때 편함
// 문자열을 전달해주면 되는데 이 문자열은 심볼 생성에는 어떠한 영향도 미치지 않음

const id = Symbol('id');
const id2 = Symbol('id');

console.log(id); // Symbol(id)
console.log(id2); // Symbol(id)

id === id2; // false
id === id2; // false

// Symbol을 객체의 key로 사용해보기
// 일단 id를 심볼로 만들고 객체에 사용
// Object.keys/values/entries는 key가 심볼형인 프로퍼티는 건너 뜀
// for, in 문도 마찬가지

const id = Symbol('id');
const user = {
  name: 'Mike',
  age: 30,
  [id]: 'myid',
};

console.log(user);
// {name: 'Mike', age: 30, Symbol(id): 'myid'}

Object.keys(user); // ['name', 'age'];

// 숨겨진 심볼을 어디에 쓸 수 있을까?
// 특정 개체에 원본 데이터는 건드리지 않고 속성을 추가 가능
// 다른 사람이 만든 개체에 자신만의 속성을 추가해서 덮어쓰면 안 됨
// 그렇다고 엄청 길고 이상한 이름 쓰는 것도 안 됨
// 내가 추가한 프로퍼티가 어디서 어떻게 튀어나올지 예측 불가능

const user = {
  name: 'Mike',
  age: 30,
};

const id = Symbol('id');
user[id] = 'myid';

// user.name = 'myname'; (X)
// user.a_key_no_one_used = 'hahaha'; (X)

/* Symbol.for() : 전역 심볼 */
// 이렇게 심볼은 이름이 같더라도 모두 다른 존재
// 그런데 가끔 전역변수처럼 이름이 같으면 같은 객체를 가리켜야 할 때가 있음
// 이럴 때 사용할 수 있는 것이 바로 Symbol.for()
// 이걸 이용하면 하나의 심볼만 보장받을 수 있음
// 없으면 만들고, 있으면 가져오기 때문
// Symbol 함수는 매번 다른 Symbol 값을 생성하지만,
// Symbol.for 메소드는 하나를 생성한 뒤 키를 통해 같은 Symbol을 공유
// for 없이 생성했을 때와 다름
// 이를 전역 심볼이라 부르고 코드 어디에서든 사용할 수 있음
// 이름 얻으려면 Symbol.keyFor() 이용하면 됨

const id1 = Symbol.for('id');
const id2 = Symbol.for('id');

id === id2; // true

Symbol.keyFor(id1); // "id"

/* description */
// 전역 심볼이 아닌 심볼은 keyFor를 사용할 수 없음
// 대신 description으로 저 이름을 알 수 있음

const id = Symbol('id 입니다.');
id.description; // "id 입니다."

/* 숨겨진 Symbol key 보는 법 */
// 사실 심볼을 완전히 숨길 수 있는 방법은 없음
// 그런데 사실 대부분의 라이브러리 내장함수 등은 이런 메소드들을 사용하지 않음
// 그러니까 걱정하지 말고 유일한 프로퍼티를 추가하고 싶을 때 심볼을 사용하면 됨

const id = Symbol('id');

const user = {
  name: 'Mike',
  age: 30,
  [id]: 'myid',
};

Object.getOwnPropertySymbols(user); // [Symbol(id)]
// 심볼들만 볼 수 있음

Reflect.ownKeys(user); // ["name", "age", Symbol(id)]
// 심볼형 key를 포함한 객체의 모든 key를 보여줌

/* 코드로 알아보기 */
// 다른 개발자들이 만들어 놓은 객체
const user = {
  name: 'Mike',
  age: 30,
};

// 내가 작업
// user.showName = function () {};
const showName = Symbol('show name');
user[showName] = function () {
  console.log(this.name);
};
// for, in 문에 걸리지 않음
// 이렇게 하면 원래 user에 그런 이름의 메서드가 있었는지 고민할 필요 없음
// 다른 사람들이 만들어둔 프로퍼티를 덮어쓰기 할 일도 없음
// 이런 게 심볼의 장점

user[showName](); // "Mike"

// 사용자가 접속하면 보는 메시지
for (let key in user) {
  console.log(`His ${key} is ${user[key]}.`);
}
// "His name is Mike."
// "His age is 30."
