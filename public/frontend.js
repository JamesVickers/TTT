//alert("hello");
function showModal() {
  $(".mobile-nav-modal")
    .removeClass("modal-hide")
    .addClass("modal-show");

  $("body").css("overflow", "hidden");
}

function hideModal() {
  $(".mobile-nav-modal")
    .removeClass("modal-show")
    .addClass("modal-hide");

  $("body").css("overflow", "visible");
}

$("#openMenu").on("click", function() {
  showModal();
});

$("#closeMenu").on("click", function() {
  hideModal();
});

//hide modal automatically if window is resized > 700px
$(window).resize(function() {
  if (window.matchMedia("(min-width: 700px)").matches) {
    hideModal();
  }
});

///change work button images from greyscale to color on hover
function switchButtonImage(id, url) {
  $("#" + id).attr("src", url);
}

$(".banner-img")
  .closest("div")
  .on("mouseover", function() {
    var target = $(this)
      .find(".banner-img")
      .attr("id")
      .replace("-button", "");
    var source = "/img/hex-" + target + "-button-yellow.png";
    $(this)
      .find(".banner-img")
      .attr("src", source);
  });
$(".banner-img")
  .closest("div")
  .on("mouseout", function() {
    var target = $(this)
      .find(".banner-img")
      .attr("id")
      .replace("-button", "");
    var source = "/img/hex-" + target + "-button-yellow-grey.png";
    $(this)
      .find(".banner-img")
      .attr("src", source);
  });
  