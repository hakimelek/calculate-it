var hashCode;
var intToRGB;

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
    if (e.which === 13) {
      var sessionId = Meteor.default_connection._lastSessionId;

      var calculation = {
        sessionId: sessionId,
        sessionColor: intToRGB(hashCode(sessionId)),
        expression: Session.get('expression')
      }

      return Meteor.call('calculate', calculation, function (error, response) {
        if (error) {
          $('.expression-text').css('animation', 'highlight 2s');
          setTimeout(function(){ $('.expression-text').css('animation', ''); }, 3000);
          throw error;
        }
        Session.set('expression', '');
      });
    }
  }
});

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
