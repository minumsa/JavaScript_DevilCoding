/* promise */
// 상점은 작업이 완료되거나 실패했을 때 소비자에게 알려줌
// 이럴 때 사용할 수 있는 것이 바로 promise

const pr = new Promise((resolve, reject) => {
  // code
});
// 여기에서 resolves는 성공, reject는 실패한 경우 실행되는 함수
// 이렇게 어떤 일이 완료됐을 때 실행되는 함수를 callback 함수라 부름

// new Promise
// state: pending(대기)
// result: undefined
// new Promise 생성자가 반환하는 promise 개체는 state와 result를 property로 갖는다.
// state는 초기에 pending이었다가 resolve가 호출되면(성공하면) fulfilled(이행됨)가 된다. 이때 result는 resolve 함수로 전달된 값(value)이다. 반면 reject(error)가 호출되면(실패하면) rejected(거부됨)가 된다. 이때 result는 reject 함수로 전달된 error이다.

// 판매자 코드
// 판매자는 주문을 받으면 3초 동안 뭔가를 하고 성공인지 실패인지 알려준다.

const pr = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("OK");
  }, 3000);
});
// 3초가 걸리도록 setTimeout 이용
// 이 코드는 state가 pending(대기)이었다가 3초 후 fulfilled(이행됨)으로 바뀐다. result는 undefined였다가 'OK'로 바뀐다.

const pr = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("error.."));
  }, 3000);
});
// 실패를 가정한 코드
// 이 코드는 state가 pending(대기)이었다가 3초 후 rejected(거부됨)으로 바뀐다. result는 undefined였다가 error로 바뀐다.

// 소비자 코드
// then을 이용해서 resolve와 reject를 처리할 수 있다.

const pr = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("OK");
    }, 3000);
  });

  pr.then(
    function (result) {
        console.log(result + '가지러 가자.');
    }
    // 첫 번째 인수 - 이행되었을 때 실행
    // result에는 "OK"라는 값이 들어옴
    function (err) {
        console.log('다시 주문해주세요..');
    }
    // 두 번째 인수 - 거부되었을 때 실행
    // error에는 error 값이 들어옴
  )

// resolve로 실행되었기에 이 상황에서 두 번째 함수는 실행되지 않음

/* catch: then 대체 가능 1 */
// catch는 에러가 발생한 경우, 즉 reject인 경우에만 실행 가능
// 두 번째로 전달했던 함수를 .catch 안으로 넣어준 것 - 동일하게 동작
// .catch 사용하는 편이 가독성 더 좋고 첫 번째 함수 실행하면서 나는 에러도 잡아줄 수 있음

const pr = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("OK");
  }, 3000);
});

pr.then(function (result) {
  console.log(result + "가지러 가자.");
}).catch(function (err) {
  console.log("다시 주문해주세요..");
});

/* finally: then 대체 가능 2 */
// finally는 이행이든 거부든 처리가 완료되면 항상 실행됨
// 로딩 화면 같은 걸 없앨 때 유용

const pr = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve("OK");
    reject(new Error("err...."));
  }, 1000);
});

console.log("시작");

pr.then(result => {
  console.log(result);
})
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    console.log("끝");
  });
// 시작
// promise.js:94 Error: err....
//     at promise.js:84:12
// promise.js:97 끝
// 이행되었든 거부되었든 끝이라는 로그는 항상 뜨게 됨

// 여러 가지 작업..
// 총 3개의 상품 주문
// 함수가 총 3개가 있고, 1-2-3번 주문순
// promise 사용하지 않고 만들기

const f1 = callback => {
  setTimeout(function () {
    console.log("1번 주문 완료");
    callback();
  }, 1000);
};

const f2 = callback => {
  setTimeout(function () {
    console.log("2번 주문 완료");
    callback();
  }, 3000);
};

const f3 = callback => {
  setTimeout(function () {
    console.log("3번 주문 완료");
    callback();
  }, 2000);
};

console.log("시작");
f1(function () {
  f2(function () {
    f3(function () {
        console.log("끝");
    });
  });
});
// 시작
// 1번 주문 완료
// 2번 주문 완료
// 3번 주문 완료
// 이렇게 depth가 깊어지면서 계속 callback으로 호출하는 것을 callback 지옥이라고 부름

// 이 부분을 promise로 해결
// 1-2-3 주문순, 동작은 동일

const f1 = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("1번 주문 완료");
    }, 1000);
  });
};

const f2 = message => {
  console.log(message);
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("2번 주문 완료"); // 실패
    }, 3000);
  });
};

const f3 = message => {
  console.log(message);
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("3번 주문 완료");
    }, 2000);
  });
};

/* 프로미스 체이닝(Promises chaining) */
console.time("시작");
f1()
  .then(res => f2(res))
  .then(res => f3(res))
  .then(res => console.log(res))
  .catch(console.log)
  .finally(() => {
    console.timeEnd("시작");
  });
// 시작
// 1번 주문 완료
// xxx
// 끝(3번 시도 x, finally 실행)
// 시작: 6004.39697265625 ms

/* Promise.all */
// 한꺼번에 시작하고 모두 이행되면 값 사용 가능, 시간 절약
// rej(ecj)되면 실패했다고 뜨고 어떤 데이터도 얻지 못함(Uncaught (in promise) 2번 주문 완료) - 주의 필요
// Promise.all은 하나의 정보라도 누락되면 페이지를 보여주면 안 되는 경우 사용
// 다 보여주거나, 안 보여주거나
console.time("x");
Promise.all([f1(), f2(), f3()]).then(res => {
  console.log(res);
  console.timeEnd("x");
});
// ['1번 주문 완료', '2번 주문 완료', '3번 주문 완료']
// x: 3003.40380859375 ms

/* Promise.race */
// 사용법은 Promise.all과 동일
// 차이점은 Promise.all은 모든 작업이 완료될 때까지 기다리지만 Promise.race는 말 그대로 경주
// 하나라도 1등으로 완료되면 끝냄
console.time("x");
Promise.race([f1(), f2(), f3()]).then(res => {
  console.log(res);
  console.timeEnd("x");
});
// 1번 주문 완료
// promise.js:210 x: 1000.85107421875 ms
// 1번이 먼저 완료되어 2번 무시됨
// 용량 큰 이미지 로딩할 때 그중 하나라도 완료되면 그 이미지 보여줄 때 이런 방식 사용하면 됨