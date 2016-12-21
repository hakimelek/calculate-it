// Function definition
var init;
var previousCharIsOperator;
var swapLastOperator;
var hashCode;
var intToRGB;
var getLastOperand;
var isOperator;

// Events for each button
Template.CalculatorPad.events({
  'click .one': function (e, tmpl) {
    var exp = Session.get('expression');
    var lastOperand = getLastOperand(exp);
    if (lastOperand[0] === 0)
      Session.set('expression', Session.set('expression').substr(0, exp.length-2));

    Session.set('expression', Session.get('expression')+'1')
    e.preventDefault();
  },
  'click .two': function (e, tmpl) {
    Session.set('expression', Session.get('expression')+'2');
    e.preventDefault();
  },
  'click .three': function (e, tmpl) {
    Session.set('expression', Session.get('expression')+'3');
    e.preventDefault();
  },
  'click .four': function (e, tmpl) {
    Session.set('expression', Session.get('expression')+'4');
    e.preventDefault();
  },
  'click .five': function (e, tmpl) {
    Session.set('expression', Session.get('expression')+'5');
    e.preventDefault();
  },
  'click .six': function (e, tmpl) {
    Session.set('expression', Session.get('expression')+'6');
    e.preventDefault();
  },
  'click .seven': function (e, tmpl) {
    Session.set('expression', Session.get('expression')+'7');
    e.preventDefault();
  },
  'click .eight': function (e, tmpl) {
    Session.set('expression', Session.get('expression')+'8');
    e.preventDefault();
  },
  'click .nine': function (e, tmpl) {
    Session.set('expression', Session.get('expression')+'9');
    e.preventDefault();
  },
  'click .zero': function (e, tmpl) {
    var exp = Session.get('expression');
    var lastOperand = getLastOperand(exp);
    if (lastOperand.indexOf('.') > -1 || lastOperand[0] !== '0')
      Session.set('expression', Session.get('expression')+'0');
    e.preventDefault();
  },

  // If the last char is an operator just swap it with the
  // clicked operator
  'click .minus': function (e, tmpl) {
    var exp = Session.get('expression');
    if (previousCharIsOperator(exp)) {
      exp = swapLastOperator(exp, '-');
      Session.set('expression', exp);
    }
    else {
      Session.set('expression', Session.get('expression')+'-');
    }
    e.preventDefault();
  },
  'click .plus': function (e, tmpl) {
    var exp = Session.get('expression');
    if (previousCharIsOperator(exp)) {
      exp = swapLastOperator(exp, '+');
      Session.set('expression', exp);
    }
    else {
      Session.set('expression', Session.get('expression')+'+');
    }
    e.preventDefault();
  },
  'click .over': function (e, tmpl) {
    var exp = Session.get('expression');
    if (previousCharIsOperator(exp)) {
      exp = swapLastOperator(exp, '/');
      Session.set('expression', exp);
    }
    else {
      Session.set('expression', Session.get('expression')+'/');
    }
    e.preventDefault();
  },
  'click .times': function (e, tmpl) {
    var exp = Session.get('expression');
    if (previousCharIsOperator(exp)) {
      exp = swapLastOperator(exp, '*');
      Session.set('expression', exp);
    }
    else {
      Session.set('expression', Session.get('expression')+'*');
    }
    e.preventDefault();
  },

  // If previous char is a dot, do not add a new one.
  'click .dot': function (e, tmpl) {
    var exp = Session.get('expression');
    var lastOperand = getLastOperand(exp);
    if (lastOperand.indexOf('.') === -1)
      Session.set('expression', Session.get('expression')+'.');
    e.preventDefault();
  },
  'click .equals': function (e, tmpl) {
    var sessionId = Meteor.default_connection._lastSessionId;

    var calculation = {
      sessionId: sessionId,
      sessionColor: intToRGB(hashCode(sessionId)),
      expression: Session.get('expression')
    }

    Meteor.call('calculate', calculation, function (error, response) {
      if (error) {
        $('.expression-text').css('animation', 'highlight 2s');
        setTimeout(function(){ $('.expression-text').css('animation', ''); }, 3000);
        throw error;
      }
      init();
    });
    e.preventDefault();
  },
});

Template.CalculatorPad.onCreated(function () {
  init();
  var self = this;
  self.autorun(function () {
  });
});

init = function () {
  Session.set('expression', '');
}

// Useful helper functions:

// Function for swaping the last char of the expression
// with a new character
swapLastOperator = function (exp, char) {
  return exp.substr(0, exp.length-1) + char + exp.substr(exp.length);
}

// Function for checking if the last character in the current
// expression is an operator
previousCharIsOperator = function (exp) {
  var lastChar = exp[exp.length-1];
  return isOperator(lastChar);
}

// Function that returns the last operand
getLastOperand = function (exp) {
  var lastChar = exp[exp.length-1];
  if (isOperator(lastChar)) return '';
  for (var i=exp.length-1; i>=0; i--) {
    if (isOperator(exp[i]))
      return exp.substr(i+1, exp.length-1);
  }
  return exp;
}

// Function that checks if the character is an operator
isOperator = function (char) {
  return (char === '-' || char === '*' || char === '/' || char === '+');
}

// Functions to compute hex color code for an arbitrary string
// http://stackoverflow.com/a/3426956/5325953
hashCode = function (str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
     hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  return hash;
}

intToRGB = function (i){
  var c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
}

export { init, isOperator };
