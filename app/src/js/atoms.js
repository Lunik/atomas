var DATOMS = $('.circle .atoms');
var ATOMS = []; //array atoms
var CATOMS = []; //jquery selector atoms
var CATOM = $('.center-atom.atom');

initAtoms();

function initAtoms(){
  $.get('app/src/js/aatoms.js');
  //placeAtoms();
}

function createAtomDiv(type){
  var atom = getAtomFromId(type);
  var $atom = $('<div>').addClass('atom circle-atom').attr('id', type).css('background-color', atom.color).html('<div class="atom-id">'+atom.id+'</div><div class="atom-name">'+atom.name+'</div>');
  return $atom;
}

function placeAtom(atom, x, y, angle){
  var left = x;
  var top = y;
  atom.css('left', left).css('top', top).attr('angle', angle);
}

function placeAtoms(){
  var diffAngle = 360 / ATOMS.length;
  var currentAngle = 0;
  for (var i = 0; i < ATOMS.length; i++) {
    placeAtom(CATOMS[i], adjustCS(Math.cos(toRadian(currentAngle))), adjustCS(Math.sin(toRadian(currentAngle))), currentAngle);
    currentAngle += diffAngle;
  }
}

function addAtom(type,pos){
  if(ATOMS.length < 20){
    ATOMS.splice(pos, 0, type);
    var atom = createAtomDiv(type);
    CATOMS.push(atom);
    DATOMS.append(atom);
    placeAtoms();
    changeCenterAtom();
  } else {

  }
}

function adjustCS(cs){
  return (cs * CIRCLE.width()/2) + CIRCLE.width()/2 - CATOM.width()/2;
}

function toRadian(angle){
  return angle * Math.PI / 180;
}

function getAtomFromId(id){
  for(var i=0; i<AATOMS.length; i++){
    if(id === AATOMS[i].id){
      return AATOMS[i];
    }
  }
  return {};
}

function maxAtoms(list){
  var max = list[0];
  if(list.length <= 1){
    return max;
  } else {
    for(var i=1; i<list.length; i++){
      if(getAtomFromId(max).num < getAtomFromId(list[i]).num){
        max = list[i];
      }
    }
    return max;
  }
}

function minAtoms(list){
  var min = list[0];
  if(list.length <= 1){
    return min;
  } else {
    for(var i=1; i<list.length; i++){
      if(getAtomFromId(min).num > getAtomFromId(list[i]).num){
        min = list[i];
      }
    }
    return min;
  }
}

function randAtom(){
  if(ATOMS.length){
    var num = Math.floor((getAtomFromId(maxAtoms(ATOMS)).num + getAtomFromId(minAtoms(ATOMS)).num)/2);
    var min = num-2;
    if(min <= 0) num = 1;
    var max = num+2;
    if(max >= AATOMS.length) num = AATOMS.length-1;
    var x = Math.floor((Math.random() * (max-min)) + min);
    return AATOMS[x];
  } else {
    return AATOMS[0];
  }
}

function changeCenterAtom(){
  var atom = randAtom();
  CATOM.attr('id',atom.id).css('background-color', atom.color).html('<div class="atom-id">'+atom.id+'</div><div class="atom-name">'+atom.name+'</div>');
}
