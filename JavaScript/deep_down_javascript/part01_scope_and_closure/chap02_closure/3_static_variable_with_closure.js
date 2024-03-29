var countFactory = (function () {
  var staticCount = 0;
  return function () {
    var localCount = 0;

    return {
      increase: function () {
        return {
          static: ++staticCount,
          local: ++localCount,
        };
      },
      decrease: function () {
        return {
          static: --staticCount,
          local: --localCount,
        }
      }
    };
  };
}());
var counter = countFactory(), counter2 = countFactory();
console.log(counter.increase());
console.log(counter.increase());
console.log(counter2.decrease());
console.log(counter.increase());