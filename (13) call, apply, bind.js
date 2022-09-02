/* call, apply, bind */
// 함수 호출 방식과 관계없이 this를 지정할 수 있음

/* call */
// call 메서드는 모든 함수에서 사용할 수 있으며, this를 특정 값으로 지정할 수 있다.

const mike = {
  name: 'Mike',
};

const tom = {
  name: 'Tom',
};

function showThisName() {
  console.log(this.name);
}

showThisName();
// 여기에서 this는 윈도우를 가리킴
// window.name은 빈 문자열

const mike = {
  name: 'Mike',
};

const tom = {
  name: 'Tom',
};

function showThisName() {
  console.log(this.name);
}

showThisName.call(mike); // 'Mike'
showThisName.call(tom); // 'Tom'
// 함수를 호출하면서 call을 사용하고 this로 사용할 개체를 넘기면 해당 함수가 주어진 개체의 메서드인 것처럼 사용할 수 있다. call의 첫 번째 매개변수는 this로 사용할 값이고 매개변수가 더 있으면 그 매개변수를 호출하는 함수로 전달된다.

function update(birthYear, occupation) {
  this.birthYear = birthYear;
  this.occupation = occupation;
}

update.call(mike, 1999, 'singer');
update.call(tom, 1984, 'dancer');
// 여기에서 mike는 this의 역할을 하는 것

console.log(mike);
console.log(tom);
// {name: 'Mike', birthYear: 1999, occupation: 'singer'}
// {name: 'Tom', birthYear: 1984, occupation: 'dancer'}

/* apply */
// apply는 함수 매개변수를 처리하는 방법만 제외하면 call과 완전히 같다.
// call은 일반적인 함수와 마찬가지로 매개변수를 직접 받는다.
// 반면 apply는 매개변수를 배열로 받는다.
// 결과는 동일

update.apply(mike, [1999, 'singer']);
update.apply(tom, [1984, 'dancer']);

console.log(mike);
console.log(tom);
// {name: 'Mike', birthYear: 1999, occupation: 'singer'}
// {name: 'Tom', birthYear: 1984, occupation: 'dancer'}

// apply는 배열 요소를 함수 매개변수로 사용할 때 유용하다.

const minNum = Math.min([3, 10, 1, 6, 4]);
const maxNum = Math.max(3, 10, 1, 6, 4);

console.log(minNum); // NaN
console.log(maxNum); // 10

// Spread Operator(스프레드 연산자 '...') 활용

const nums = [3, 10, 1, 6, 4];
const minNum = Math.min(...nums);
const maxNum = Math.max(...nums);

console.log(minNum); // 1
console.log(maxNum); // 10

const nums = [3, 10, 1, 6, 4];

const minNum = Math.min.apply(null, nums);
const maxNum = Math.max.apply(null, nums);
// apply는 두 번째 매개변수로 배열을 전달하면 그 요소들을 차례대로 인수로 사용한다.
// 그래서 첫 번째 매개변수를 null로 설정하는 것이다.

console.log(minNum); // 1
console.log(maxNum); // 10

const nums = [3, 10, 1, 6, 4];

const minNum = Math.min.call(null, ...nums);
const maxNum = Math.max.call(null, ...nums);
// call은 차례대로 매개변수가 들어가야 해서 스프레드 연산자를 써야 한다.

console.log(minNum); // 1
console.log(maxNum); // 10

// call과 apply는 이렇게 동작 방식은 같고 매개변수 받는 방법만 다르다.
// call은 순서대로 직접 받고 apply는 배열 형태로 받는다.
// 다시 말해 "a"pply는 "a"rray를 받는다. ("a"로 묶어서 외우기)

/* bind */
// this 값을 바꿀 수 있는 마지막 함수
// 함수의 this 값을 영구히 바꿀 수 있다.

const mike = {
  name: 'Mike',
};

function update(birthYear, occupation) {
  this.birthYear = birthYear;
  this.occupation = occupation;
}
// 이 update 함수를 이리저리 옮기면서 호출할 때 this 값을 항상 mike가 되게 하려면 bind를 사용하면 된다.

const updateMike = update.bind(mike);
// 여기에서 bind는 새로 바인딩한 함수를 하나 만든다. 그리고 이 함수는 항상 mike를 this로 받는다.

updateMike(1980, 'police');
console.log(mike);
// {name: 'Mike', birthYear: 1980, occupation: 'police'}

const user = {
  name: 'Mike',
  showName: function () {
    console.log(`hello, ${this.name}`);
  },
};

user.showName(); // 'hello, Mike'

let fn = user.showName;
fn(); // 'hello, '
// fn을 할당할 때 this를 잃어버려 name이 안 나옴
// 메서드는 마침표(.) 앞에 있는 게 this임

fn.call(user); // 'hello, Mike'
fn.apply(user); // 'hello, Mike'

let boundFn = fn.bind(user);
boundFn(); // 'hello, Mike'
