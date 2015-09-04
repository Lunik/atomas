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
  if(atom == -1){
    atom = getSatomFromId(type);
  }
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
    CATOMS.splice(pos, 0, atom);
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
  return -1;
}

function getSatomFromId(id){
  for(var i=0; i<SATOMS.length; i++){
    if(id === SATOMS[i].id){
      return SATOMS[i];
    }
  }
  return -1;
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
    if(min <= 0) min = 1;
    var max = num+2;
    if(max >= AATOMS.length) max = AATOMS.length-1;
    var x = Math.floor((Math.random() * (max-min)) + min);
    return AATOMS[x];
  } else {
    return AATOMS[0];
  }
}

function randSatom(){
  /*var x = Math.floor((Math.random() * (SATOMS.length-0)) + 0);
  return SATOMS[x];*/
  return SATOMS[0];
}

function changeCenterAtom(){
  var atom;
  if(ATOMS.length < 8){
    atom = randAtom();
  } else {
    var max = ATOMS.length - 8;
    if((Math.random() * (max - 0))){
      atom = randSatom();
    } else {
      atom = randAtom();
    }
  }
  CATOM.attr('id',atom.id).css('background-color', atom.color).html('<div class="atom-id">'+atom.id+'</div><div class="atom-name">'+atom.name+'</div>');
}

function removeAtom(pos){
  ATOMS.splice(pos,1);
  CATOMS[pos].remove();
  CATOMS.splice(pos,1);
  placeAtoms();
}

function fusionAtoms(){
  var i = 0;
  while (ATOMS[i] != '+') {
    i++;
  }

  var before = i-1;
  var after = i+1;
  if(before < 0) before = ATOMS.length - 1;
  if(after >= ATOMS.length) after = 0;

  if(ATOMS[i] == '+'){
    while(ATOMS[before] == ATOMS[after]){
      console.log(before+'/'+i+'/'+after);
      var a = ATOMS[before];
      removeAtom(after);
      removeAtom(i);
      removeAtom(before);
      addAtom('O',before);
      i = before;
      if(before == 0){
        after--;
      } else if (after == 0){
        before--;
      } else {
        before--;
        after--;
      }
    }

  } else if (ATOMS[i] == '++') {

  }
}
