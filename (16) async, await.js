// async, await 사용하면 Promise에 then 메서드를 chain 형식으로 호출하는 것보다 가독성이 좋아짐

async function getName() {
  return 'Mike';
}

console.log(getName()); // Promise {<fulfilled>: 'Mike'}

getName().then((name) => {
  console.log(name); // "Mike"
});

// return 값이 Promise면 그대로 반환

async function getName() {
  return Promise.resolve('Tom');
}

getName().then((name) => {
  console.log(name); // "Tom"
});

// 만약 함수 내부에서 예외가 발생하면 rejected 상태의 Promise 반환

async function getName() {
  // return Promise.resolve('Tom');
  throw new Error('err..');
}

getName().then((name) => {
  console.log(name); // Uncaught (in Promise) Error: err..
});

getName().catch((err) => {
  console.log(err); // Error: err..
});

/* await */
// await 키워드는 async 함수 내부에서만 사용할 수 있음
// 일반 함수에서 사용하면 에러 발생

function getName(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(name);
    }, 1000);
  });
}

// await 키워드 오른쪽에는 Promise가 오고 그 Promise가 처리될 때까지 기다림
// 그래서 이 코드는 1초 후에 Mike가 찍힘
// result에 getName에서 resolve된 값을 기다렸다가 넣어주는 것

async function showName() {
  const result = await getName('Mike');
  console.log(result);
}

console.log('시작');
showName();

/* 저번 시간에 Promise 배울 때 사용했던 코드 */

const f1 = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('1번 주문 완료');
    }, 1000);
  });
};

const f2 = (message) => {
  console.log(message);
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('2번 주문 완료');
    }, 3000);
  });
};

const f3 = (message) => {
  console.log(message);
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('3번 주문 완료');
    }, 2000);
  });
};

f1()
  .then((res) => f2(res))
  .then((res) => f3(res))
  .then((res) => console.log(res))
  .catch(console.log);

/* 위 코드를 async, await으로 바꾸기 */
// 해당 변수의 데이터들이 기다렸다가 들어가는 게 명확하게 보임
// Promise와 then을 쓰는 것보다 가독성 좋음
// 대부분의 상황에서 async, await이 더 효과적일 수 있음

const f1 = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('1번 주문 완료');
    }, 1000);
  });
};

const f2 = (message) => {
  console.log(message);
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('2번 주문 완료');
    }, 3000);
  });
};

const f3 = (message) => {
  console.log(message);
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('3번 주문 완료');
    }, 2000);
  });
};

console.log('시작');
async function order() {
  const result1 = await f1();
  const result2 = await f2(result1);
  const result3 = await f3(result2);
  console.log(result3);
  console.log('종료');
}
order();

// f1()
//   .then((res) => f2(res))
//   .then((res) => f3(res))
//   .then((res) => console.log(res))
//   .catch(console.log);

// 동일하게 실행됨
// 시작
// 1번 주문 완료
// 2번 주문 완료
// 3번 주문 완료
// 종료

/* rejected의 경우 */
// Promise는 그냥 catch를 썼는데 async, await 함수에서는 try, catch문으로 감싸면 됨

const f1 = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('1번 주문 완료');
    }, 1000);
  });
};

const f2 = (message) => {
  console.log(message);
  return new Promise((res, rej) => {
    setTimeout(() => {
      // res('2번 주문 완료');
      rej(new Error('err..'));
    }, 3000);
  });
};

const f3 = (message) => {
  console.log(message);
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('3번 주문 완료');
    }, 2000);
  });
};

console.log('시작');
async function order() {
  try {
    const result1 = await f1();
    const result2 = await f2(result1);
    const result3 = await f3(result2);
    console.log(result3);
  } catch (e) {
    console.log(e);
  }
  console.log('종료');
}
order();

// 시작
// 1번 주문 완료
// Error: err..
// 종료

// Promise, all 사용하는 경우
// 이렇게 async, await 함수 내부에서도 비동기 함수를 병렬로 실행 가능

const f1 = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('1번 주문 완료');
    }, 1000);
  });
};

const f2 = (message) => {
  console.log(message);
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('2번 주문 완료');
      // rej(new Error('err..'));
    }, 3000);
  });
};

const f3 = (message) => {
  console.log(message);
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('3번 주문 완료');
    }, 2000);
  });
};

console.log('시작');
async function order() {
  try {
    const result = await Promise.all([f1(), f2(), f3()]);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
  console.log('종료');
}
order();

// 시작
// undefined
// undefined
// (3) ['1번 주문 완료', '2번 주문 완료', '3번 주문 완료']
// 종료
