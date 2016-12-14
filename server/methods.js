Meteor.methods({
  'calculate': function (calculation) {
    // We check for the existance of an expression
    if (calculation.expression) {
      var result = eval(calculation.expression);
      if (result)
        return Calculations.insert({
          expression: calculation.expression,
          result: result,
          createdAt: new Date(),
          sessionId: calculation.sessionId,
          sessionColor: calculation.sessionColor
        });
    }
  }
});
