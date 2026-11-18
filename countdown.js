// Royale - Live Wedding Countdown Timer
(function () {
  'use strict';

  // Wedding Date & Time: 12th December 2026, 5:30 PM IST (UTC+05:30)
  var TARGET_MS = new Date('2026-12-12T17:30:00+05:30').getTime();

  var daysEl = document.getElementById('ryCountDays');
  var hoursEl = document.getElementById('ryCountHours');
  var minsEl = document.getElementById('ryCountMins');
  var secsEl = document.getElementById('ryCountSecs');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  function pad(num) {
    return num < 10 ? '0' + num : '' + num;
  }

  function update() {
    var now = Date.now();
    var diff = TARGET_MS - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    var totalSeconds = Math.floor(diff / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minsEl.textContent = pad(minutes);
    secsEl.textContent = pad(seconds);
  }

  update();
  setInterval(update, 1000);
})();
