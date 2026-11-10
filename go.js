// /reserve moved to /goa (NETPIX Goa app, 2026-11-10). Keeps old links working: the FB post, old Discord
// "Approve / decline" links (owner.html?r=ID) and the owner setup link (#k=...). Same origin, so the phone's saved
// registration + owner key carry over. Also removes the old /reserve service worker + its caches.
(function () {
  var page = /owner\.html$/.test(location.pathname) ? 'owner.html' : '';
  var hash = location.hash || (page ? '' : '#overnight');     // old customer link = the overnight request
  var target = '/goa/' + page + location.search + hash;
  var go = function () { location.replace(target); };
  try {
    if (!('serviceWorker' in navigator)) return go();
    var t = setTimeout(go, 1500);
    navigator.serviceWorker.getRegistrations().then(function (regs) {
      return Promise.all(regs.filter(function (r) { return /\/reserve\/$/.test(r.scope); }).map(function (r) { return r.unregister(); }));
    }).then(function () {
      return window.caches ? caches.keys().then(function (ks) {
        return Promise.all(ks.filter(function (k) { return k.indexOf('reserve-v-') === 0; }).map(function (k) { return caches.delete(k); }));
      }) : null;
    }).then(function () { clearTimeout(t); go(); }, function () { clearTimeout(t); go(); });
  } catch (e) { go(); }
})();
