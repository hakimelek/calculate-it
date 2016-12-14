Template.CalculatorHistory.helpers({
  calculations: function () {
    return Calculations.find();
  }
});

Template.CalculatorHistory.onCreated(function () {
  var self = this;
  self.autorun(function () {
      self.subscribe('calculations');
  });
});

Template.CalculatorHistory.events({

});
