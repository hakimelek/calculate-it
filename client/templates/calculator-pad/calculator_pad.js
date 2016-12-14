var init;
var previousCharIsOperator;
var swapLastOperator;

Template.CalculatorPad.helpers({

});

Template.CalculatorPad.events({
  'click .one': function (e, tmpl) {
    Session.set('expression', Session.get('expression')+'1');
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

    if (Session.get('expression') === '0') {}
    Session.set('expression', Session.get('expression')+'0');
    e.preventDefault();
  },
  'click .minus': function (e, tmpl) {
    var exp = Session.get('expression');
    if (previousCharIsOperator(exp)) {
      console.log('yo');
      exp = swapLastOperator(exp, '-');
      Session.set('expression', exp);
    }
    else {
      Session.set('expression', Session.get('expression')+'-');
    }
    e.preventDefault();
  },
  'click .plus': function (e, tmpl) {
    Session.set('expression', Session.get('expression')+'+');
    e.preventDefault();
  },
  'click .over': function (e, tmpl) {
    Session.set('expression', Session.get('expression')+'/');
    e.preventDefault();
  },
  'click .times': function (e, tmpl) {
    Session.set('expression', Session.get('expression')+'*');
    e.preventDefault();
  },
  'click .dot': function (e, tmpl) {
    Session.set('expression', Session.get('expression')+'.');
    e.preventDefault();
  },
  'click .C': function (e, tmpl) {
    init();
    e.preventDefault();
  },
  'click .equals': function (e, tmpl) {
    Meteor.call('calculate', Session.get('expression'), function (error, response) {
      if (error) {

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

swapLastOperator = function (exp, char) {
  return exp.substr(0, exp.length-1) + char + s.substr(exp.length);
}

previousCharIsOperator = function (exp) {
  var lastChar = exp[length-1];
  return lastChar === '-' || lastChar === '*' || lastChar === '/' || lastChar === '+';
}