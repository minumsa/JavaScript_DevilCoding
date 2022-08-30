// 인수 전달

function showName(name) {
  console.log(name);
}

showName('Mike'); // 'Mike'
showName('Mike', 'Tom'); // 'Mike'
// 자바스크립트에서 함수에 넘겨주는 인수의 개수는 제약 없음
// 인수 개수 정해놓고 함수 만들어도 실제 호출할 때 정확히 그 개수 맞출 필요도 없음

showName(); // undefined => 이렇게 아무것도 전달하지 않아도 작동되긴 함

// arguments
// 함수로 넘어온 모든 인수에 접근
// 함수 내에서 이용 가능한 지역 변수
// length / index
// 배열 아니고 Array 형태의 객체
// 배열의 내장 메서드 없음(forEach, map 사용 불가능)

function showName(name) {
  console.log(arguments.length); // 2
  console.log(arguments[0]); // 'Mike'
  console.log(arguments[1]); // 'Tom'
}

showName('Mike', 'Tom');

// 나머지 매개변수(Rest parameters)

function showName(...names) {
  console.log(names);
}

showName(); // []
// 아무것도 전달하지 않으면 undefined가 아닌 빈 배열 출력
showName('Mike'); // ['Mike']
showName('Mike', 'Tom'); // ['Mike', 'Tom']

// 나머지 매개변수는 전달받은 모든 수를 더해야 함

function add(...numbers) {
  let result = 0;
  numbers.forEach((num) => (result += num));
  console.log(result);
}

add(1, 2, 3); // 6
add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10); // 55

// arr.reduce() 사용

function add(...numbers) {
  let result = numbers.reduce((prev, cur) => prev + cur);
  console.log(result);
}

add(1, 2, 3); // 6
add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10); // 55

// user 객체를 만들어 주는 생성자 함수 만들기
// 생성자 함수는 첫 글자 대문자로 작성해야 함

function User(name, age, ...skill) {
  this.name = name;
  this.age = age;
  this.skill = skill;
}

const user1 = new User('Mike', 30, 'html', 'css');
const user2 = new User('Tom', 20, 'JS', 'React');
const user3 = new User('Jane', 10, 'English');

console.log(user1); // User {name: 'Mike', age: 30, skill: Array(2)}
console.log(user2); // User {name: 'Tom', age: 20, skill: Array(2)}
console.log(user3); // User {name: 'Jane', age: 10, skill: Array(1)}

// 전개 구문(Spread syntax): 배열

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

let result = [...arr1, ...arr2];

console.log(result); // (6) [1, 2, 3, 4, 5, 6]

// 중간에 삽입도 가능
// 원래 중간 삽입은 arr.push() / arr.splice() / arr.concat() 등 이용해야 해서 복잡하지만 전개 구문 사용하면 편리함

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

let result = [0, ...arr1, ...arr2, 7, 8, 9];
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// 전개 구문(Spread syntax): 객체

let user = { name: 'Mike' };
let mike = { ...user, age: 30 };

console.log(mike); // {name: 'Mike', age: 30}

// 전개 구문(Spread syntax): 복제

let arr = [1, 2, 3];
let arr2 = [...arr]; // [1, 2, 3]

let user = { name: 'Mike', age: 30 };
let user2 = { ...user }; // 별개의 user2로 복제

user2.name = 'Tom'; // user2를 바꿔도 user에 영향 미치지 않음

console.log(user.name); // "Mike"
console.log(user2.name); // "Tom"

// 전개 구문
// arr1을 [4, 5, 6, 1, 2, 3]으로

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

// arr2.reverse().forEach((num) => {
//   arr1.unshift(num);
// });

arr1 = [...arr2, ...arr1]; // 위 함수보다 훨씬 간결

console.log(arr1); // [4, 5, 6, 1, 2, 3]

// 같은 방식으로 객체에서도 사용 가능

let user = { name: 'Mike' };
let info = { age: 30 };
let fe = ['JS', 'React'];
let lang = ['Korean', 'English'];

user = Object.assign({}, user, info, {
  skills: [],
});

console.log(user);
// {name: 'Mike', age: 30, skills: Array(0)}
// {user, age, skills 빈 배열}

// fe와 lang을 forEach로 돌며 삽입

let user = { name: 'Mike' };
let info = { age: 30 };
let fe = ['JS', 'React'];
let lang = ['Korean', 'English'];

// user = Object.assign({}, user, info, {
//   skills: [],
// });

// fe.forEach((item) => {
//   user.skills.push(item);
// });

// lang.forEach((item) => {
//   user.skills.push(item);
// });

user = {
  ...user,
  ...info,
  skills: [],
};

user.skills = [...fe, ...lang];

console.log(user); // {name: 'Mike', age: 30, skills: Array(4)}
