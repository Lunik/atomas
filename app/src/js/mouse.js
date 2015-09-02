var MOUSE = { x: -1, y: -1 };
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

function createLine(x1,y1, x2,y2){
  var length = GAME.width()/2;
  var angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  var transform = 'rotate('+angle+'deg)';

  var line = $('<div>')
    .addClass('line')
    .css({
      'position': 'absolute',
      'transform': transform
    })
    .width(length)
    .offset({left: x1, top: y1});

  return line;
}
