Template.CalculatorResult.helpers({
  currentExpression: function () {
    return Session.get('expression');
  },
  calculations: function () {
    return Calculations.find();
  }
});

Template.CalculatorResult.onCreated(function () {
  var self = this;
  self.autorun(function () {
      self.subscribe('calculations');
  });
});

Template.CalculatorResult.events({
  'click .del': function (e, tmpl) {
    var exp = Session.get('expression');
    Session.set('expression', exp.substring(0, exp.length-1));
    e.preventDefault();
  }
});
