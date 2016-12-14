Template.CalculatorExpression.helpers({
  currentExpression: function () {
    return Session.get('expression');
  }
});

Template.CalculatorExpression.onCreated(function () {
  var self = this;
  self.autorun(function () {

  });
});

Template.CalculatorExpression.events({
  'click .del': function (e, tmpl) {
    var exp = Session.get('expression');
    Session.set('expression', exp.substring(0, exp.length-1));
    e.preventDefault();
  },

  'keyup input.expression-text': function (e, tmpl) {
    Session.set('expression', tmpl.find('.expression-text').value);
  },

  'keypress input.expression-text': function (e, tmpl) {
    if (e.which !== 13) return;
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
      Session.set('expression', '');
    });

    e.preventDefault();
  }
});
