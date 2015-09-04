var MOUSE = { x: -1, y: -1, angle: 0};
var GAMECENTER = {
  w: Math.round(GAME.innerWidth()/2 + GAME.offset().left),
  h: Math.round(GAME.innerHeight()/2 + GAME.offset().top)
};
var LINE = $('.game .line');

$(document).mousemove(function(event) {
  MOUSE.x = event.pageX;
  MOUSE.y = event.pageY;
  $('.line').remove();
  GAME.append(createLine(GAMECENTER.w, GAMECENTER.h, MOUSE.x, MOUSE.y));
});

$(document).mousedown(function(event){
  /*if (CATOM.attr('id') == '-') {
    console.log('-');
  }*/

  MOUSE.angle = parseFloat(Math.floor(MOUSE.angle));
  var angles = [];
  $('.circle-atom.atom').each(function(index){
    angles.push(parseFloat(this.getAttribute('angle')));
  });
  if(angles.length > 1){
    angles.push(MOUSE.angle);
    angles.sort(sortNumber);
    addAtom(CATOM.attr('id'),angles.indexOf(MOUSE.angle));
  }
  else {
    addAtom(CATOM.attr('id'),0);
  }

});
function createLine(x1,y1, x2,y2){
  var length = GAME.width()/2;
  var angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  if(angle > 0){
    MOUSE.angle = parseFloat(angle);
  } else {
    MOUSE.angle = parseFloat(angle + 360);
  }
  var transform = 'rotate('+angle+'deg)';

  var line = $('<div>')
    .addClass('line')
    .attr('angle', angle)
    .css({
      'position': 'absolute',
      'transform': transform
    })
    .width(length)
    .offset({left: x1, top: y1});

  return line;
}

function sortNumber(a,b) {
    return a - b;
}
