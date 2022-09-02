/* Class: ES6에 추가된 스펙 */
// new를 통해 호출했을 때, 내부에서 정의된 내용으로 객체를 생성하는 것은 동일
// 일단 class라는 키워드를 사용하고, 내부에 constructor가 있음
// constructor는 객체를 만들어 주는 생성자 메서드
// new를 통해 생성하면 자동 실행

const User = function (name, age) {
  this.name = name;
  this.age = age;
  this.showName = function () {
    console.log(this.name);
  };
};

const mike = new User("Mike", 30);

class User2 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  // 객체를 초기화하기 위한 값이 위와 같이 정해짐
  // 이렇게 인수를 넘겨받을 수 있음
  // 이 경우 객체에 name과 age가 만들어지는 것
  showName() {
    console.log(this.name);
  }
}
// 이 showName()처럼 class를 정의한 메서드는 User2에 프로토타입이 저장됨

const tom = new User2("Tom", 19);

/* 생성자 함수에서 class와 동일하게 동작하도록 만들기 */

const User = function (name, age) {
  this.name = name;
  this.age = age;
  //   this.showName = function () {
  //     console.log(this.name);
  //   };
};

User.prototype.showName = function () {
  console.log(this.name);
};
// 이렇게 생성자 함수로도 구현 가능
// 그럼 단순히 문법 편의성을 위해 class가 탄생한 걸까?

const mike = new User("Mike", 30);
// new 없이 호출하면 콘솔 창에 에러 뜸
// class는 new 없이 실행 불가!

class User2 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  showName() {
    console.log(this.name);
  }
}

/* Class: 상속, extends */

class Car {
  constructor(color) {
    this.color = color;
    this.wheels = 4;
  }
  drive() {
    console.log("drive..");
  }
  stop() {
    console.log("STOP!");
  }
}

// Car를 상속해서 Bmw 만들기

class Bmw extends Car {
  park() {
    console.log("PARK");
  }
}

const z4 = new Bmw("blue");

console.log(z4);
// Bmw {color: 'blue', wheels: 4}
// color: "blue"
// wheels: 4
// [[Prototype]]: Car
// constructor: class Bmw
// park: ƒ park()
// [[Prototype]]: Object
// class 내부에서 선언한 메서드는 프로토타입 밑으로 들어감

/* Class: 메서드 오버라이딩(method overriding) */

class Car {
  constructor(color) {
    this.color = color;
    this.wheels = 4;
  }
  drive() {
    console.log("drive..");
  }
  stop() {
    console.log("STOP!");
  }
}

class Bmw extends Car {
  park() {
    console.log("PARK");
  }
  stop() {
    console.log("OFF");
  }
}

const z4 = new Bmw("blue");

console.log(z4.stop()); // "OFF"
// 이렇게 동일한 이름으로 메서드를 정의하면 덮어 쓰게 됨
// 만약 부모 메서드를 그대로 사용하면서 확장하려면?
// 그럴 때는 super라는 키워드를 사용하면 됨

// super 키워드
// super.메서드명 으로 부모 클래스에 정의된 메서드 사용 가능
// 이런 방식을 오버라이딩이라고 함

class Car {
  constructor(color) {
    this.color = color;
    this.wheels = 4;
  }
  drive() {
    console.log("drive..");
  }
  stop() {
    console.log("STOP!");
  }
}

class Bmw extends Car {
  park() {
    console.log("PARK");
  }
  stop() {
    super.stop();
    console.log("OFF");
  }
}

const z4 = new Bmw("blue");

console.log(z4.stop());
// "STOP!"
// "OFF"

/* 생성자 오버라이딩 */
// class에 constructor는 빈 객체로 만들어 주고 this로 해당 객체를 가리킴
// 반면 extends 써서 만든 자식 클래스는 빈 객체가 만들어지고 this에 할당하는 이 과정 생략
// 그래서 항상 super 키워드로 부모 클래스의 constructor를 실행해줘야 함

class Car {
  constructor(color) {
    // {}
    this.color = color;
    this.wheels = 4;
  }
  drive() {
    console.log("drive..");
  }
  stop() {
    console.log("STOP!");
  }
}

// class Bmw extends Car {
//   constructor() {
//     super();
//     this.navigation = 1;
//   }
//   park() {
//     console.log("PARK");
//   }
// }
//
// const z4 = new Bmw("blue");
//
// console.log(z4);
// Bmw {color: undefined, wheels: 4, navigation: 1}
// 생성할 때 color(blue)를 넣었지만 제대로 동작하기 위해서는 자식 클래스의 constructor에 동일한 인수 받는 작업을 해줘야 함
// 자식 생성자는 무조건 부모 생성자를 호출해야 함

class Bmw extends Car {
  constructor(color) {
    super(color);
    this.navigation = 1;
  }
  park() {
    console.log("PARK");
  }
}

const z4 = new Bmw("blue");

console.log(z4);
// Bmw {color: 'blue', wheels: 4, navigation: 1}
