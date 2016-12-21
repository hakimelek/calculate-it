Template.CalculatorHistory.helpers({
  calculations: function () {
    return Calculations.find({}, {sort: {createdAt: 1}});
  }
});

Template.CalculatorHistory.onCreated(function () {
  var self = this;
  self.autorun(function () {
      self.subscribe('calculations');
  });
});
