/* ============================================================
   Areeba's 23rd — behaviour
   Nothing here needs editing; all the words live in config.js
   ============================================================ */

(function () {
  "use strict";

  /* config.js declares BIRTHDAY_CONFIG with `const`, which lives in the global
     lexical scope rather than on `window` — so read the binding directly. */
  var CFG = (typeof BIRTHDAY_CONFIG !== "undefined" && BIRTHDAY_CONFIG)
    ? BIRTHDAY_CONFIG
    : (window.BIRTHDAY_CONFIG || {});
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var rand = function (min, max) { return Math.random() * (max - min) + min; };
  var pick = function (arr) { return arr[Math.floor(Math.random() * arr.length)]; };


  /* ══════════════ 0. text from the config ══════════════ */

  if (CFG.pageTitle) { document.title = CFG.pageTitle; }

  function setText(sel, value) {
    var el = $(sel);
    if (el && value) { el.textContent = value; }
  }

  setText("#heroNote",    CFG.heroSubtitle);
  setText("#galleryTitle", CFG.galleryTitle);
  setText("#gallerySub",   CFG.gallerySubtitle);
  setText("#wishTitle",    CFG.wishTitle);
  setText("#signoff",      CFG.signoff);

  /* Line 2 of the hero is painted with a gold gradient clipped to the text,
     which would also flatten any emoji into a silhouette — so emoji get their
     own span that opts back out of the clipping and keeps its real colours. */
  setGradientText($("#heroLine2"), CFG.heroLine2 || "");

  function setGradientText(el, text) {
    if (!el) { return; }

    var re;
    try {
      re = new RegExp("\\p{Extended_Pictographic}(?:\\uFE0F|\\u200D\\p{Extended_Pictographic})*", "gu");
    } catch (err) {
      el.textContent = text;   // older browser: plain text is fine
      return;
    }

    el.textContent = "";
    var last = 0, m;
    while ((m = re.exec(text)) !== null) {
      if (m.index > last) {
        el.appendChild(document.createTextNode(text.slice(last, m.index)));
      }
      var span = document.createElement("span");
      span.className = "emoji";
      span.textContent = m[0];
      el.appendChild(span);
      last = m.index + m[0].length;
    }
    if (last < text.length) {
      el.appendChild(document.createTextNode(text.slice(last)));
    }
  }

  /* the wish — blank lines become separate paragraphs */
  var wishBody = $("#wishBody");
  if (wishBody && CFG.wish) {
    String(CFG.wish).trim().split(/\n\s*\n/).forEach(function (para) {
      var p = document.createElement("p");
      p.textContent = para.trim().replace(/\s*\n\s*/g, " ");
      wishBody.appendChild(p);
    });
  }


  /* ══════════════ 1. hero title, letter by letter ══════════════ */

  (function animateTitle() {
    var host = $("#heroLine1");
    if (!host) { return; }

    var text = CFG.heroLine1 || "";
    host.setAttribute("aria-label", text);

    if (reduceMotion) { host.textContent = text; return; }

    var i = 0;
    text.split(" ").forEach(function (word, w, words) {
      var wordEl = document.createElement("span");
      wordEl.className = "word";

      chars(word).forEach(function (ch) {
        var s = document.createElement("span");
        s.className = "ch";
        s.textContent = ch;
        s.style.animationDelay = (0.45 + i * 0.045).toFixed(3) + "s";
        wordEl.appendChild(s);
        i++;
      });

      host.appendChild(wordEl);
      if (w < words.length - 1) { host.appendChild(document.createTextNode(" ")); }
    });

    /* split into real characters so emoji stay in one piece */
    function chars(str) {
      if (typeof Intl !== "undefined" && Intl.Segmenter) {
        var seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
        return Array.from(seg.segment(str), function (s) { return s.segment; });
      }
      return Array.from(str);
    }
  }());


  /* ══════════════ 2. balloons, confetti, hearts ══════════════ */

  if (!reduceMotion) {
    var pastels = ["#FFB6C1", "#E6CFEC", "#FFD700", "#FFC9D4", "#D8BBE4", "#FFE0A3", "#F7B6C9"];

    /* balloons */
    (function () {
      var host = $("#balloons");
      if (!host) { return; }
      for (var i = 0; i < 9; i++) {
        var b = document.createElement("span");
        b.className = "balloon";
        b.style.setProperty("--w", rand(34, 62).toFixed(0) + "px");
        b.style.setProperty("--c", pick(pastels));
        b.style.setProperty("--dur", rand(16, 28).toFixed(1) + "s");
        b.style.setProperty("--delay", rand(-18, 6).toFixed(1) + "s");
        b.style.left = rand(3, 93).toFixed(1) + "%";
        host.appendChild(b);
      }
    }());

    /* confetti */
    (function () {
      var host = $("#confetti");
      if (!host) { return; }
      var count = window.innerWidth < 640 ? 34 : 60;
      for (var i = 0; i < count; i++) {
        var c = document.createElement("span");
        var shape = pick(["", "confetti--round", "confetti--ribbon"]);
        c.className = "confetti " + shape;
        c.style.setProperty("--w", rand(5, 10).toFixed(1) + "px");
        c.style.setProperty("--h", (shape === "confetti--round" ? rand(5, 10) : rand(9, 18)).toFixed(1) + "px");
        c.style.setProperty("--c", pick(pastels));
        c.style.setProperty("--dur", rand(7, 15).toFixed(1) + "s");
        c.style.setProperty("--delay", rand(-15, 2).toFixed(1) + "s");
        c.style.setProperty("--x", rand(-70, 70).toFixed(0) + "px");
        c.style.setProperty("--spin", rand(360, 1080).toFixed(0) + "deg");
        c.style.left = rand(-2, 100).toFixed(1) + "%";
        host.appendChild(c);
      }
    }());

    /* drifting hearts + stars */
    (function () {
      var host = $("#floaties");
      if (!host) { return; }
      var glyphs = ["💕", "✨", "🎈", "💖", "⭐", "🌸", "🤍", "💫"];
      for (var i = 0; i < 16; i++) {
        var f = document.createElement("span");
        f.className = "floaty";
        f.textContent = pick(glyphs);
        f.style.setProperty("--s", rand(14, 30).toFixed(0) + "px");
        f.style.setProperty("--dur", rand(14, 26).toFixed(1) + "s");
        f.style.setProperty("--delay", rand(-24, 4).toFixed(1) + "s");
        f.style.setProperty("--x", rand(-90, 90).toFixed(0) + "px");
        f.style.left = rand(2, 95).toFixed(1) + "%";
        host.appendChild(f);
      }
    }());

    /* sparkles around the wish card */
    (function () {
      var host = $("#sparkles");
      if (!host) { return; }
      var glyphs = ["✨", "💗", "🤍", "⭐", "💕"];
      for (var i = 0; i < 18; i++) {
        var s = document.createElement("span");
        s.className = "sparkle";
        s.textContent = pick(glyphs);
        s.style.setProperty("--s", rand(11, 22).toFixed(0) + "px");
        s.style.setProperty("--dur", rand(4, 9).toFixed(1) + "s");
        s.style.setProperty("--delay", rand(-8, 2).toFixed(1) + "s");
        s.style.left = rand(2, 95).toFixed(1) + "%";
        s.style.top  = rand(4, 92).toFixed(1) + "%";
        host.appendChild(s);
      }
    }());
  }


  /* ══════════════ 3. the slideshow ══════════════ */

  var gallery   = $("#gallery");
  var slidesBox = $("#slides");
  var dotsBox   = $("#dots");
  var prevBtn   = $("#prevBtn");
  var nextBtn   = $("#nextBtn");
  var emptyMsg  = $("#galleryEmpty");

  var photos  = Array.isArray(CFG.photos) ? CFG.photos.slice() : [];
  var slides  = [];
  var dots    = [];
  var index   = 0;
  var timer   = null;
  var visible = false;
  var paused  = false;
  var DURATION = Math.max(1500, CFG.slideDuration || 4000);

  /* load every listed photo, keep only the ones that actually exist */
  Promise.all(photos.map(loadImage)).then(function (results) {
    buildSlideshow(results.filter(Boolean));
  });

  function loadImage(src) {
    return new Promise(function (resolve) {
      var img = new Image();
      img.onload  = function () { resolve(src); };
      img.onerror = function () { resolve(null); };
      img.src = src;
    });
  }

  function buildSlideshow(ok) {
    if (!gallery || !slidesBox) { return; }

    if (!ok.length) {
      gallery.classList.add("is-empty");
      if (emptyMsg) { emptyMsg.hidden = false; }
      if (prevBtn)  { prevBtn.hidden = true; }
      if (nextBtn)  { nextBtn.hidden = true; }
      return;
    }

    ok.forEach(function (src, i) {
      var s = document.createElement("div");
      s.className = "slide";
      s.style.setProperty("--img", 'url("' + src.replace(/"/g, "%22") + '")');
      s.setAttribute("role", "img");
      s.setAttribute("aria-label", "Photo " + (i + 1) + " of " + ok.length);
      slidesBox.appendChild(s);
      slides.push(s);

      if (dotsBox) {
        var d = document.createElement("button");
        d.type = "button";
        d.className = "dot";
        d.setAttribute("role", "tab");
        d.setAttribute("aria-label", "Photo " + (i + 1));
        d.addEventListener("click", function () { go(i, true); });
        dotsBox.appendChild(d);
        dots.push(d);
      }
    });

    /* single photo? no need for controls */
    if (ok.length < 2) {
      if (prevBtn) { prevBtn.hidden = true; }
      if (nextBtn) { nextBtn.hidden = true; }
      if (dotsBox) { dotsBox.hidden = true; }
    }

    go(0, false);
    restart();

    /* let the first photo softly tint the hero behind the gradient */
    var heroBack = document.createElement("div");
    heroBack.className = "hero__photo";
    heroBack.style.backgroundImage = 'url("' + ok[0].replace(/"/g, "%22") + '")';
    var hero = $("#hero");
    if (hero) {
      hero.insertBefore(heroBack, hero.firstChild);
      requestAnimationFrame(function () { heroBack.classList.add("is-on"); });
    }
  }

  function go(next, manual) {
    if (!slides.length) { return; }
    index = (next + slides.length) % slides.length;

    slides.forEach(function (s, i) {
      s.classList.toggle("is-active", i === index);
    });
    dots.forEach(function (d, i) {
      d.classList.toggle("is-active", i === index);
      d.setAttribute("aria-selected", i === index ? "true" : "false");
    });

    if (manual) { restart(); }
  }

  function restart() {
    clearInterval(timer);
    if (slides.length < 2) { return; }
    timer = setInterval(function () {
      if (visible && !paused && !document.hidden) { go(index + 1, false); }
    }, DURATION);
  }

  if (prevBtn) { prevBtn.addEventListener("click", function () { go(index - 1, true); }); }
  if (nextBtn) { nextBtn.addEventListener("click", function () { go(index + 1, true); }); }

  if (gallery) {
    ["mouseenter", "focusin"].forEach(function (e) {
      gallery.addEventListener(e, function () { paused = true; });
    });
    ["mouseleave", "focusout"].forEach(function (e) {
      gallery.addEventListener(e, function () { paused = false; });
    });

    /* swipe on touch screens */
    var x0 = null, y0 = null;
    gallery.addEventListener("touchstart", function (e) {
      x0 = e.changedTouches[0].clientX;
      y0 = e.changedTouches[0].clientY;
    }, { passive: true });
    gallery.addEventListener("touchend", function (e) {
      if (x0 === null) { return; }
      var dx = e.changedTouches[0].clientX - x0;
      var dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
        go(index + (dx < 0 ? 1 : -1), true);
      }
      x0 = y0 = null;
    }, { passive: true });
  }

  /* arrow keys, but only while the slideshow is on screen */
  document.addEventListener("keydown", function (e) {
    if (!visible || !slides.length) { return; }
    if (e.key === "ArrowRight") { go(index + 1, true); }
    if (e.key === "ArrowLeft")  { go(index - 1, true); }
  });


  /* ══════════════ 4. the special photo ══════════════ */

  (function () {
    var img = $("#specialPhoto");
    if (!img) { return; }
    img.addEventListener("error", function () { img.setAttribute("data-missing", ""); });
    img.src = CFG.specialPhoto || "public/images/special.jpg";
  }());


  /* ══════════════ 5. music tied to the gallery page only ══════════════
     No button to press — the song simply plays while "Memories We Made"
     is on screen, and fades out the moment you scroll away from it. */

  var enterGalleryAudio = function () {};
  var exitGalleryAudio  = function () {};

  (function () {
    if (!CFG.music) { return; }
    var badge = $("#nowPlaying");
    var audio = new Audio(CFG.music);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "auto";

    var wantsToPlay = false;  // is the gallery section currently in view?
    var blocked = false;      // browser refused autoplay — retry after a tap

    var fade = null;
    function fadeTo(target, done) {
      clearInterval(fade);
      fade = setInterval(function () {
        var step = target > audio.volume ? 0.05 : -0.05;
        var next = audio.volume + step;
        if ((step > 0 && next >= target) || (step < 0 && next <= target)) {
          audio.volume = target;
          clearInterval(fade);
          if (done) { done(); }
        } else {
          audio.volume = Math.min(1, Math.max(0, next));
        }
      }, 40);
    }

    function tryPlay() {
      if (!wantsToPlay) { return; }
      audio.play().then(function () {
        blocked = false;
        fadeTo(0.5);
        if (badge) { badge.classList.add("is-on"); }
      }).catch(function () {
        blocked = true;  // most likely: no user gesture yet on this page load
      });
    }

    /* the moment the visitor taps/clicks anywhere, retry a blocked play —
       covers browsers that won't allow audio until the very first gesture */
    document.addEventListener("click", function () {
      if (blocked) { tryPlay(); }
    });

    enterGalleryAudio = function () { wantsToPlay = true; tryPlay(); };
    exitGalleryAudio = function () {
      wantsToPlay = false;
      fadeTo(0, function () { audio.pause(); });
      if (badge) { badge.classList.remove("is-on"); }
    };
  }());


  /* ══════════════ 6. side nav + scroll reveals ══════════════ */

  if ("IntersectionObserver" in window) {

    /* only now is it safe to start the reveals hidden */
    if (!reduceMotion) { document.documentElement.classList.add("js-reveal"); }

    var navDots = Array.prototype.slice.call(document.querySelectorAll(".sidenav__dot"));
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.target.id === "gallery") {
          if (entry.isIntersecting && !visible) { enterGalleryAudio(); }
          if (!entry.isIntersecting && visible) { exitGalleryAudio(); }
          visible = entry.isIntersecting;
        }
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          navDots.forEach(function (d) {
            d.classList.toggle("is-active", d.dataset.target === entry.target.id);
          });
        }
      });
    }, { threshold: [0.25, 0.55] });

    document.querySelectorAll(".section").forEach(function (s) { spy.observe(s); });

    var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    reveals.forEach(function (el, i) { el.style.transitionDelay = (i * 0.12).toFixed(2) + "s"; });

    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          revealer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

    reveals.forEach(function (el) { revealer.observe(el); });

    /* Safety net: if the observer hasn't fired for something that is already
       on screen a moment after load, show it anyway. The wish must never be
       left invisible. */
    window.setTimeout(function () {
      reveals.forEach(function (el) {
        if (el.classList.contains("is-in")) { return; }
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) { el.classList.add("is-in"); }
      });
    }, 2500);

  } else {
    visible = true;
    if (CFG.music) { enterGalleryAudio(); }
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-in"); });
  }

}());
