// 배열 구조 분해

let [x, y] = [1, 2];

console.log(x); // 1
console.log(y); // 1

let users = ['Mike', 'Tom', 'Jane'];
let [user1, user2, user3] = users;
// let user1 = users[0];
// let user2 = users[1];
// let user3 = users[2];

console.log(user1); // 'Mike'
console.log(user2); // 'Tom'
console.log(user3); // 'Jane'

let str = 'Mike-Tom-Jane';
let [user1, user2, user3] = str.split('-');

console.log(user1); // 'Mike'
console.log(user2); // 'Tom'
console.log(user3); // 'Jane'

// 배열 구조 분해: 기본값

let [a, b, c] = [1, 2];
// c => undefined

let [a = 3, b = 4, c = 5] = [1, 2];
// 각 변수에 기본값 주면 undefined 방지 가능

console.log(a); // 1
console.log(b); // 2
console.log(c); // 5

// 배열 구조 분해: 일부 반환값 무시

let [user1, , user2] = ['Mike', 'Tom', 'Jane', 'Tony'];

console.log(user1); // 'Mike'
console.log(user2); // 'Jane'

// 배열 구조 분해: 바꿔치기

let a = 1;
let b = 2;

let c = a;
a = b;
b = c;

[a, b] = [b, a];

// 객체 구조 분해

let user = { name: 'Mike', age: 30 };
let { name, age } = user;
// let { age, name } = user; => 순서 바꿔도 동일하게 동작

console.log(name); // 'Mike'
console.log(age); // 30

// 객체 구조 분해: 새로운 변수 이름으로 할당

let user = { name: 'Mike', age: 30 };
// let { name, age } = user; => 아래처럼 확장 가능
let { name: userName, age: userAge } = user;

console.log(userName); // 'Mike'
console.log(userAge); // 30

// 객체 구조 분해: 기본값

let user = { name: 'Mike', age: 30 };
// let { name, age, gender } = user; => gender가 undefined로 나옴
let { name, age, gender = 'male' } = user;

let user = {
  name: 'Jane',
  age: 18,
  gender: 'female',
};

let { name, age, gender = 'male' } = user;

console.log(gender); // female
