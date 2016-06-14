var create = document => {
  var thrustElem = document.querySelector('#thrust');
  var timeElem = document.querySelector('#time');
  var levelElem = document.querySelector('#level');
  var svg = document.querySelector('svg');
  return {thrustElem, timeElem, levelElem, svg}
}

export {create}
