Meteor.methods({
  'calculate': function (expression) {
    // TODO: check correctness
    if (expression) {
      var result = eval(expression);

      Calculations.insert({
        expression: expression,
        result: result,
        createdAt: new Date()
      });
    }
  }
});