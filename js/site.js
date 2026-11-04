// Nav border on scroll
(function () {
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Fade-in on scroll
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  // Publication filter + search
  var list = document.querySelector('.pubs');
  if (!list) return;
  var items = Array.prototype.slice.call(list.querySelectorAll('.pub'));
  var chips = document.querySelectorAll('.chip');
  var input = document.getElementById('q');
  var empty = document.querySelector('.empty');
  var topic = 'all';

  function apply() {
    var q = (input.value || '').trim().toLowerCase();
    var shown = 0;
    items.forEach(function (li) {
      var okTopic = topic === 'all' || li.dataset.topic === topic;
      var okText = !q || li.textContent.toLowerCase().indexOf(q) !== -1;
      li.hidden = !(okTopic && okText);
      if (!li.hidden) shown++;
    });
    empty.hidden = shown !== 0;
  }
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      chips.forEach(function (x) { x.classList.remove('on'); x.setAttribute('aria-pressed', 'false'); });
      c.classList.add('on'); c.setAttribute('aria-pressed', 'true');
      topic = c.dataset.topic; apply();
    });
  });
  input.addEventListener('input', apply);
})();
