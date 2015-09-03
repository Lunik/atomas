var APP = $('.app');
var LOAD = $('.load');
var GAME = $('.game');
var CIRCLE = $('.game .circle');
initGame();

function initGame(){
  $.getScript('app/src/js/adjust_css.js');
  $.getScript('app/src/js/atoms.js');
  $.getScript('app/src/js/mouse.js');

  setTimeout(newGame, 100);
}

function newGame(){
  showLoading();
  $('.circle-atom.atom').remove();
  var center = getCircleMiddle(CIRCLE);
  changeCenterAtom();
  placeAtom(CATOM, center.left - CATOM.width()/2, center.top - CATOM.height()/2);
  hideLoading();
}

function getCircleMiddle(circle){
  return {'left': circle.width()/2, 'top': circle.height()/2};
}

function showLoading(){
  LOAD.show();
}

function hideLoading(){
  LOAD.hide();
}
