/**
 * Created by pierremarsot on 26/04/2017.
 */
function typed() {
  $(".typed-text").typed({
    strings: ["First sentence.", "Second sentence."],
    typeSpeed: 0
  });
  $(".typed-text").each(function () {
    console.log('oo');
    var b = $(this);
    var c = b.attr("data-typed-strings") ? b.attr("data-typed-strings").split(",") : [];
    console.log(b);
    $(".typed-text").typed({
      strings: c,
      typeSpeed: 100,
      loop: !0,
      showCursor: !1
    });
  });
}