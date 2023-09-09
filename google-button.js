(function() {
  var target = document.currentScript;
  window.addEventListener('load', function() {
    calendar.schedulingButton.load({
      url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3kgOkZT76W15KQb-RB0EI3FPq3LG-SrYltV_H3cF2sHQS8w-Kz5xGHFJxLci2c6KNy1enecels?gv=true',
      color: '#fe6600',
      label: "Schedule an Estimate",
      target,
    });
  });
})();