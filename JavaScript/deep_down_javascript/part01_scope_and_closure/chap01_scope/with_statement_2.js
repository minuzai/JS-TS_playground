with (document.getElementById('myDiv').style) {
  background = 'yellow';
  color = 'red';
  border = '1px solid black';
}

var r = 10, a, x, y;
with (Math) {
  a = PI * r * r;
  x = r * cos(PI);
  y = r * sin(PI / 2);
}

function toString(string) {
  console.log(string);
}
with ({ nickname: '30ml' }) {
  with (window) {
    toString('Hello, ' + nickname);
  }
}