/* 세 수 중 최솟값 구하기 */

function solution(a, b, c) {
  let answer = a;

  if (answer > b) {
    answer = b;
  }

  if (answer > c) {
    answer = c;
  }

  return answer;
}

console.log(solution(2, 5, 1));