/* Computed Property */
// a라는 변수와 user라는 객체

let a = 'age';

const user = {
  name: 'Mike',
  age: 30,
  // [a] : 30도 가능
  // 이렇게 대괄호로 묶으면 a라는 문자열이 아니라 변수 a에 할당된 문자열이 들어가게 됨
  // 이를 computed property(계산된 프로퍼티)라고 함
};

// 이렇게 식 자체를 넣는 것도 가능

const user = {
  [1 + 4]: 5,
  ['안녕' + '하세요']: 'Hello',
};

console.log(user);
// {5: 5, 안녕하세요: 'Hello'}

/* Methods */
// 객체에서 사용할 수 있는 몇 가지 메서드 소개

// Object.assign(): 객체 복제
// user라는 객체가 있을 때 이렇게 cloneUser를 만들어서 넣어주면 복제가 되는 걸까? 안 됨
// user 변수에는 객체 자체가 들어가는 게 아니라 객체가 저장되어 있는 메모리 주소인 객체에 대한 참조 값이 저장됨
// 그러니까 cloneUser를 만들어 user를 넣으면 객체가 복사되면서 들어가는 게 아니라 그 참조 값만 복사됨
// 이때 cloneUser의 이름을 바꾸면 user의 이름도 바뀜
// 하나의 변수를 두 변수가 접근하고 있는 것

const user = {
  name: 'Mike',
  age: 30,
};

const cloneUser = user;

// 동일하게 복제하려면?
// Object.assign 메서드를 써야 함
// 여기에서 빈 객체는 초기 값
// 두 번째 매개변수부터 들어온 객체들이 초기 값에 병합됨
// 이렇게 하면 빈 객체에 user가 병합되므로 복제되는 것

const newUser = object.assign({}, user);

newUser.name = 'Tom';

console.log(user.name); // "Mike"
// newUser의 이름을 바꿔도 user에는 변화가 없음
// 같은 객체가 아닌 것(newUser != user)

// { } + { name : 'Mike', age : 30 } =

// {
//   name : 'Mike',
//   age : 30,
// }

// 초기 값 관련 추가 예
// 이렇게 하면 성별 값만 있는 객체가 user를 병합하는 것
// 또한 총 3개의 프로퍼티를 갖게 됨

Object.assign({ gender: 'male' }, user);
// gender : "male",
// name : "Mike",
// age : 30,

// 만약 병합하는데 키가 같다면?
// 덮어쓰게 됨!

Object.assign({ name: 'Tom' }, user);
// name : "Tom", (X)
// name : "Mike",
// age : 30,

// 두 개 이상의 객체도 합칠 수 있음

const user = {
  name: 'Mike',
};
const info1 = {
  age: 30,
};
const info2 = {
  gender: 'male',
};

Object.assign(user, info1, info2);

// Object.keys() : 키 배열 반환
// 객체를 Object.keys()의 인수로 반환
// 그러면 이 key들이 배열로 만들어져 반환됨

const user = {
  name: 'Mike',
  age: 30,
  gender: 'male',
};

Object.keys(user);
// ["name", "age", "gender"]

// Object.values() : 값 배열 반환

const user = {
  name: 'Mike',
  age: 30,
  gender: 'male',
};

Object.values(user);
// ["Mike", "30", "male"]

// Object.entries() : 키/값 배열 반환
// 키와 값을 쌍으로 묶어 반환해줌

const user = {
  name: 'Mike',
  age: 30,
  gender: 'male',
};

Object.entries(user);
// [
//   ["name", "Mike"],
//   ["age", 30],
//   ["gender", "male"]
// ]
// 배열 안에 각 키와 값이 들어 있는 배열 3개가 들어 있음

// Object.fromEntries() : 키/값 배열을 객체로
// Object.entries()와 반대 기능
// 키/값을 쌍으로 묶은 배열들을 묶어주면 반대로 객체로 만들어줌

const arr = [
  ['name', 'Mike'],
  ['age', 30],
  ['gender', 'male'],
];

Object.fromEntries(arr);

/* 배운 내용 활용 */

let n = 'name';
let a = 'age';

const user = {
  [n]: 'Mike',
  [a]: 30,
  [1 + 4]: 5,
};

console.log(user);
// {5: 5, name: 'Mike', age: 30}

// 좀더 실용적인 함수 활용한 예제
// 어떤 게 key가 될지 모르는 객체 만들 때 유용

function makeObj(key, val) {
  return {
    [key]: val,
  };
}

const obj = makeObj('나이', 33);

console.log(obj);
// {나이: 33}

// 객체 메서드

const user = {
  name: 'Mike',
  age: 30,
};

const user2 = Object.assign({}, user);
user2.name = 'Tom';

console.log(user); // {name: 'Mike', age: 30}
console.log(user2); // {name: 'Tom', age: 30}

// user의 key 값 찍기

const user = {
  name: 'Mike',
  age: 30,
};

const result = Object.keys(user);

console.log(result); // ['name', 'age']

// from entries
// 배열 안에 배열이 있고 앞이 키, 뒤가 값

let arr = [
  ['mon', '월'],
  ['tue', '화'],
];

const result = Object.fromEntries(arr);

console.log(result); // {mon: '월', tue: '화'}
