function placeAtom(atom, x, y){
  var left = x - atom.width()/2;
  var top = y - atom.height()/2;
  atom.css('left', left).css('top', top);
}

function createAtom(type){
  var atom = $('<div>').addClass('atom').attr('id', type);
  return atom;
}
