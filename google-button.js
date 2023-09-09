(function() {
    var target = document.currentScript;
    window.addEventListener('load', function() {
      calendar.schedulingButton.load({
        url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3HS1Khx_LaueRVzDaEcXNxMau2cQqntCNxEfI9gqxpna3K7WboG8Hshi8mEgTyrjil4ra-PkN1?gv=true',
        color: '#fe6600',
        label: "Schedule an Estimate",
        target,
      });
    });
  })();