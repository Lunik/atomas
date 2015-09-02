var APP = $('.app');
var LOAD = $('.load');
var GAME = $('.game');
var CIRCLE = $('.game .circle');
var ATOMS = [];
var CATOM = $('.center-atom .atom');
initGame();

function initGame(){
  $.getScript('app/src/js/adjust_css.js');
  $.getScript('app/src/js/atoms.js');
  $.getScript('app/src/js/mouse.js');

  setTimeout(newGame, 100);
}

function newGame(){
  showLoading();
  var center = getCircleMiddle(CIRCLE);
  placeAtom(CATOM, center.left, center.top);
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
