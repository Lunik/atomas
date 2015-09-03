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
  console.log(MOUSE.angle);
});

$(document).mousedown(function(event){
  MOUSE.angle = Math.floor(MOUSE.angle);
  var angles = [];
  $('.circle-atom.atom').each(function(index){
    angles.push(this.getAttribute('angle'));
  });
  if(angles.length > 1){
    for(var i=0; i<angles.length; i++){
      console.log(MOUSE.angle+'/'+angles[i]+'/'+angles[i+1]);
      if(MOUSE.angle >= angles[i] && MOUSE.angle <= angles[i+1]){
        addAtom(CATOM.attr('id'),i);
        return 1;
      }
      console.log(i);
    }
  }
  else {
    addAtom(CATOM.attr('id'),0);
    return 1;
  }


});
function createLine(x1,y1, x2,y2){
  var length = GAME.width()/2;
  var angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  if(angle > 0){
    MOUSE.angle = angle;
  } else {
    MOUSE.angle = 180 + Math.abs(angle);
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
