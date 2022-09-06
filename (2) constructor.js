/* 객체 리터럴 */
// 개발을 하다 보면 비슷한 객체를 여러 개 만들어야 하는 경우 생김
// 예를 들어 회원, 상품 등..
// 그럴 때 쓸 수 있는 것이 바로 생성자 함수
// 객체에 대한 개념 잘 잡고 있어야 이후 프로토타입, 상속, 클래스에 대해 학습할 수 있음
// 이해 안 되는 부분 있으면 꼭 복습하기!

let user = {
  name: 'Mike',
  age: 30,
};

/* 생성자 함수 */
// 생성자 함수는 보통 첫 글자를 대문자로
// User라는 함수를 만들고 이름과 나이를 인자로 받아 this에 넣어주고 있음
// 그리고 new 연산자를 사용해 함수를 호출
// 각각 다른 변수명을 이용해 함수를 호출
// 전달하는 값도 각각 다르게 전달했음
// 생성자 함수는 붕어빵 틀이나 와플 팬과 비슷한 역할
// 필요한 재료들을 넣고 찍어주는 개념(여기에서는 이름, 나이)

function User(name, age) {
  this.name = name;
  this.age = age;
}

let user1 = new User('Mike', 30);
let user2 = new User('Jane', 22);
let user3 = new User('Tom', 17);

// 동작 방식

function User(name, age) {
  // this = {}
  this.name = name;
  this.age = age;
  // return this;
}

new 함수명();
// new 함수명(); 실행하면 일단 빈 객체(this = {})를 만들고 this에 할당한다. 함수 본문을 실행하면서 this에 property들을 추가한다. 마지막으로 this를 반환한다. 실제로 저 두 줄은 코드에 없다. new를 붙여 실행하는 순간 저 방식으로 알고리즘이 동작한다. 이렇게 객체를 만들면 일일이 객체 리터럴을 쓰는 것보다 훨씬 빠르고 일관성 있게 객체로 만들 수 있다. 스펙이 변경되어도 저 생성자 함수만 고치면 되는 것. 코드를 살펴 보면 생성자 함수라고 해서 특별한 건 없다. 어떤 함수라도 new를 붙여서 실행하면 저 알고리즘이 동일하게 동작한다. 그래서 (구분을 위해) 생성자 함수는 첫 글자를 대문자로 하는 게 관례이다.

// 메서드를 추가한 예
// 모든 User에게는 sayName이라는 메서드가 있어서 자신의 이름을 말하는 기능이 있음
// this로 할당된 객체에 sayName을 추가하고 user를 하나 더 만듦
// user5에 sayName을 호출하면 이름을 알려줌
// 객체와 메서드를 알고 있으면 어렵지 않게 이해 가능

function User(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function () {
    console.log(this.name);
  };
}

let user5 = new User('Han', 40);
user5.sayName(); // 'Han'
// user5.sayName()을 호출했을 때 sayName() 함수의 this는 바로 점 앞의 user5
// 그래서 this.name은 user5의 name이 되는 것

/* 생성자 함수: 상품 객체를 생성해 보자 */
// 일반 함수 만들 때와 동일하게 하면 됨

function Item(title, price) {
  // this = {};
  this.title = title;
  this.price = price;
  this.showPrice = function () {
    console.log(`가격은 ${price}원 입니다.`);
  };

  // return this;
}

const item1 = new Item('인형', 3000);
const item2 = new Item('가방', 4000);
const item3 = new Item('지갑', 9000);
const item4 = Item('스티커', 1000);

console.log(item1, item2, item3, item4);
// Item {title: '인형', price: 3000, showPrice: ƒ}
// Item {title: '가방', price: 4000, showPrice: ƒ}
// Item {title: '지갑', price: 9000, showPrice: ƒ}
// undefined => new를 안 붙이면 그냥 함수가 실행
// 이 함수는 사실 return해주는 것이 아무것도 없으므로 undefined 반환하고 그 값이 item4로 들어가게 되는 것
// 생성자 함수는 잊지 말고 new를 붙여줘야 함

item3.showPrice();
// showPrice 메서드 호출
// 가격은 9000원 입니다.
