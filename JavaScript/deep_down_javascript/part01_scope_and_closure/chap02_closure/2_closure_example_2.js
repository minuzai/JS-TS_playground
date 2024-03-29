function outer() {
  var count = 0;
  return {
    increase: function () {
      return ++count;
    },
    decrease: function () {
      return --count;
    }
  };
}
var counter = outer();
console.log(counter.increase()); // 1
console.log(counter.increase()); // 2
console.log(counter.decrease()); // 1

var counter2 = outer();
console.log(counter2.increase()); // 1