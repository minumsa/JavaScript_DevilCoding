// arr.sort()
// 배열 재정렬, 배열 자체가 변경되니 주의
// 인수로 정렬 로직을 담은 함수를 받음

let arr = [1, 5, 4, 2, 3];
arr.sort();
console.log(arr); // (5) [1, 2, 3, 4, 5]

let arr = ['a', 'c', 'd', 'e', 'b'];
arr.sort();
console.log(arr); // (5) ['a', 'b', 'c', 'd', 'e']

let arr = [27, 8, 5, 13];
arr.sort();
console.log(arr); // (4) [13, 27, 5, 8]

let arr = [27, 8, 5, 13];

arr.sort((a, b) => {
  console.log(a, b);
  return a - b;
  // 8 27 ... 8, 27, 5, 13
  // 5 8 ... 5, 8, 27, 13
  // 13 5 ... 5, 8, 27, 13
  // 13 8 ... 5, 8, 27, 13
  // 13 27 ... 5, 8, 13, 27
});

console.log(arr); // (4) [5, 8, 13, 27]

// 배열의 모든 수 합치기
// for, for of, forEach

let arr = [1, 2, 3, 4, 5];

let result = 0;
arr.forEach((num) => {
  // result = result + num;
  result += num;
});

console.log(result); // 15

// arr.reduce()
// 인수로 함수를 받음
// (누적 계산값, 현재값) => { return 계산값 };

let arr = [1, 2, 3, 4, 5];

const result = arr.reduce((prev, cur) => {
  return prev + cur;
}, 0);

console.log(result); // 15

let userList = [
  { name: 'Mike', age: 30 },
  { name: 'Tom', age: 10 },
  { name: 'Jane', age: 27 },
  { name: 'Sue', age: 26 },
  { name: 'Harry', age: 42 },
  { name: 'Steve', age: 60 },
];

let result = userList.reduce((prev, cur) => {
  if (cur.age > 19) {
    prev.push(cur.name);
  }
  return prev;
}, []);

console.log(result); // (5) ['Mike', 'Jane', 'Sue', 'Harry', 'Steve']

let userList = [
  { name: 'Mike', age: 30 },
  { name: 'Tom', age: 10 },
  { name: 'Jane', age: 27 },
  { name: 'Sue', age: 26 },
  { name: 'Harry', age: 42 },
  { name: 'Steve', age: 60 },
];

let result = userList.reduce((prev, cur) => {
  if (cur.age > 19) {
    prev += cur.age;
  }
  return prev;
}, 0);

console.log(result); // 185

let userList = [
  { name: 'Mike', age: 30 },
  { name: 'Tom', age: 10 },
  { name: 'Jane', age: 27 },
  { name: 'Sue', age: 26 },
  { name: 'Harry', age: 42 },
  { name: 'Steve', age: 60 },
];

let result = userList.reduce((prev, cur) => {
  if (cur.name.length === 3) {
    prev.push(cur.name);
  }
  return prev;
}, []);

console.log(result); // (2) ['Tom', 'Sue']

// arr.reduceRight()
// arr.reduce와 기능 동일
// 배열 우측부터 연산 수행
