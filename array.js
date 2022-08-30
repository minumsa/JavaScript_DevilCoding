// arr.splice(n, m, x): n번째 요소부터 m개 지움

let arr = [1, 2, 3, 4, 5];
arr.splice(1, 2);
console.log(arr); // [1, 4, 5]

let arr = [1, 2, 3, 4, 5];
arr.splice(1, 3, 100, 200);
console.log(arr); // [1, 100, 200, 5]

let arr = ['나는', '철수', '입니다'];
arr.splice(1, 0, '대한민국', '소방관');
console.log(arr); // ["나는", "대한민국", "소방관", "철수", "입니다"]

// arr.slice(n, m): n부터 m까지 반환

let arr = [1, 2, 3, 4, 5];
arr.slice(1, 4); // [2, 3, 4]

let arr2 = arr.slice();
console.log(arr2); // [1, 2, 3, 4, 5]

// arr.concat(arr2, arr3...): 합쳐서 새 배열 반환

let arr = [1, 2];
arr.concat([3, 4]); // [1, 2, 3, 4]
arr.concat([3, 4], [5, 6]); // [1, 2, 3, 4, 5, 6]
arr.concat([3, 4], 5, 6); // [1, 2, 3, 4, 5, 6]

// arr.forEach(fn): 배열 반복

let users = ['Mike', 'Tom', 'Jane'];
users.forEach((name, index) => {
  console.log(`${index + 1}. ${name}`);
});

// 1. Mike
// 2. Tom
// 3. Jane

// arr.indexOf / arr.lastIndexOf

let arr = [1, 2, 3, 4, 5, 1, 2, 3];

arr.indexOf(3); // 2 => 3 몇 번째?
arr.indexOf(3, 3); // 7 => 3부터 3 몇 번째?
arr.lastIndexOf(3); // 7 => 끝에서부터 3 몇 번째?

// arr.includes(): 포함하는지 확인

let arr = [1, 2, 3];

arr.includes(2); // true
arr.includes(8); // false

// arr.find(fn) / arr.findIndex(fn)

let arr = [1, 2, 3, 4, 5];

const result = arr.find((item) => {
  return item % 2 === 0;
});

console.log(result); // 2

let userList = [
  { name: 'Mike', age: 30 },
  { name: 'Jane', age: 27 },
  { name: 'Tom', age: 10 },
];

const result = userList.find((user) => {
  if (user.age < 19) {
    return true;
  }
  return false;
});

console.log(result); // {name: 'Tom', age: 10}

let userList = [
  { name: 'Mike', age: 30 },
  { name: 'Jane', age: 27 },
  { name: 'Tom', age: 10 },
];

const result = userList.findIndex((user) => {
  if (user.age < 19) {
    return true;
  }
  return false;
});

console.log(result); // 2

// arr.filter(fn): 만족하는 모든 요소를 배열로 반환

let arr = [1, 2, 3, 4, 5, 6];

const result = arr.filter((item) => {
  return item % 2 === 0;
});

console.log(result); // (3) [2, 4, 6]

// arr.reverse(): 역순으로 재정렬

let arr = [1, 2, 3, 4, 5];

arr.reverse(); // [5, 4, 3, 2, 1]

// arr.map(fn): 함수를 받아 특정 기능 시행하고 새로운 배열 반환

let userList = [
  { name: 'Mike', age: 30 },
  { name: 'Jane', age: 27 },
  { name: 'Tom', age: 10 },
];

let newUserList = userList.map((user, index) => {
  return Object.assign({}, user, {
    id: index + 1,
    isAdult: user.age > 19,
  });
});

console.log(newUserList);
// 0: {name: 'Mike', age: 30, id: 1, isAdult: true}
// 1: {name: 'Jane', age: 27, id: 2, isAdult: true}
// 2: {name: 'Tom', age: 10, id: 3, isAdult: false}
// length: 3
// [[Prototype]]: Array(0)

// join: 배열을 합쳐 문자열 만들기

let arr = ['안녕', '나는', '철수야'];
let result = arr.join();
console.log(result); // 안녕,나는,철수야

let arr = ['안녕', '나는', '철수야'];
let result = arr.join(' ');
console.log(result); // 안녕 나는 철수야

let arr = ['안녕', '나는', '철수야'];
let result = arr.join('-');
console.log(result); // 안녕-나는-철수야

// split: 문자열을 나눠 배열로 만들기

const users = 'Mike,Jane,Tom,Tony';
const result = users.split(','); // ',' 기준으로 나누기
console.log(result); // ['Mike', 'Jane', 'Tom', 'Tony']

// Array.isArray(): 배열인지 아닌지 확인하기

let user = {
  name: 'Mike',
  age: 30,
};

let userList = ['Mike', 'Tom', 'Jane'];

console.log(typeof user); // object
console.log(typeof userList); // object

console.log(Array.isArray(user)); // false
console.log(Array.isArray(userList)); // true
