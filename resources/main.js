function rotateDisc(deg, offset) {
  var logo = document.getElementById('mainlogo');
  logo.style.transform = 'rotate(' + deg + 'deg)';
  logo.style.marginLeft = offset + '%';
  console.log((deg/180) + '%');
}

var math = {};

math.smoothStep2 = function(t) {
  return 1 - Math.pow(1-t, 2);
};

math.smoothStep6 = function(t) {
  return 1 - Math.pow(1-t, 6);
};

math.smoothEnd2 = function(t) {
  console.log('t', t);
  return Math.pow(t, 2);
};

math.linear = function(x) {
  return x;
}

math.rangeMap = function(inVal, inStart, inEnd, outStart, outEnd, easingFn) {
  easingFn = easingFn || math.linear;
  if (inVal < inStart) inVal = inStart;
  if (inVal > inEnd) inVal = inEnd;
  var out = inVal - inStart;
  out /= (inEnd - inStart);
  out = easingFn(out);  // in range 0,1
  out *= (outEnd - outStart);
  return out + outStart;
};

function handleScroll(scroll) {
  //console.log('scroll', scroll);
  var winHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  var offset = scroll.pageY || window.pageYOffset;
  rotateDisc(
    math.rangeMap(offset, 0, winHeight/1.5, 0, 360, math.linear),
    0 /* don't move to the right */
    );
};

window.onscroll = handleScroll;
document.addEventListener("touchmove", function(event) {
  console.log('touchmove');
});
