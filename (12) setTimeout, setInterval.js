// setTimeout / setInterval
// setTimeout은 일정 시간이 지난 후 함수를 실행
// setInterval은 일정 시간 간격으로 함수를 반복

// setTimeout

function fn() {
  console.log('3초');
}

setTimeout(fn, 3000); // 3000 = 3s

// 이 코드는 3초 후에 로그를 찍어줌

setTimeout(function () {
  console.log('3초');
}, 3000);

// 위 코드와 동일

const tId = function showName(name) {
  console.log(name);
};

setTimeout(showName, 3000, 'Mike'); // setTimeout(함수, 시간, 인수);

clearTimeout(tId);
// 예정된 시간을 없애기
// 3초가 지나기 전에 이 코드가 실행되므로 아무 일도 일어나지 않음

// setInterval

function showName(name) {
  console.log(name);
}
const tId = setInterval(showName, 3000, 'Mike'); // 'Mike' 'Mike' 'Mike'...

clearInterval(tId);
// 동작 중단하려면 이 코드 실행

// 참고: delay = 0 ?

setTimeout(function () {
  console.log(2);
}, 0);

console.log(1);

// delay 시간 0으로 줘도 바로 실행되진 않음
// 1이 먼저 찍이고 2가 나중에 찍힘
// 왜냐하면 현재 실행 중인 script가 종료된 이후 스케줄링 함수를 실행하기 때문
// 또한 브라우저는 4ms 정도의 대기 시간이 있음

// setInterval, clearInterval

let num = 0;

function showTime() {
  console.log(`안녕하세요. 접속하신 지 ${num++}초가 지났습니다.`);
  if (num > 5) {
    clearInterval(tId);
  }
}

const tId = setInterval(showTime, 1000);
