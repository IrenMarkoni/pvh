const certificates = new Swiper(".i-certificates__slider", {
  spaceBetween: 28,
  slidesPerView: 4,
  breakpoints: {
    1200: {
      spaceBetween: 28,
      slidesPerView: 4,
    },
    800: {
      spaceBetween: 16,
      slidesPerView: 3.5,
    },
    660: {
      slidesPerView: 2.3,
    },
    400: {
      slidesPerView: 1.5,
    },
    320: {
      slidesPerView: 1.05,
      spaceBetween: 16,
    },
  },
  pagination: {
    el: ".i-certificates .swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  navigation: {
    nextEl: ".i-certificates .swiper-button-next",
    prevEl: ".i-certificates .swiper-button-prev",
  },
});

const heroSlider = new Swiper(".hero__slider", {
  spaceBetween: 0,
  slidesPerView: 1,
  autoplay: {
    delay: 4000,
  },
  breakpoints: {
    // 992: {
    //   spaceBetween: 28,
    // },
    // 700: {
    //   slidesPerView: 1.09,
    //   spaceBetween: 12,
    // },
    // 320: {
    //   slidesPerView: 1.06,
    //   spaceBetween: 12,
    // },
  },
  pagination: {
    el: ".hero__slider .swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  navigation: {
    nextEl: ".hero__slider .swiper-button-next",
    prevEl: ".hero__slider .swiper-button-prev",
  },
});
const productionSlider = new Swiper(".production__slider", {
  spaceBetween: 28,
  slidesPerView: 4,
  breakpoints: {
    1200: {
      spaceBetween: 28,
      slidesPerView: 4,
    },
    800: {
      slidesPerView: 3.5,
    },
    660: {
      slidesPerView: 2.5,
    },
    500: {
      slidesPerView: 2,
    },
    320: {
      slidesPerView: 1.15,
      spaceBetween: 16,
    },
  },
  pagination: {
    el: ".production__slider .swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  navigation: {
    nextEl: ".production__slider .swiper-button-next",
    prevEl: ".production__slider .swiper-button-prev",
  },
});

/* start: слайдер в превью товара по наведению курсора в пк и обычный слайдер в мобиле*/
(function ($) {
  $.fn.HvrSlider = function () {
    return this.each(function () {
      var el = $(this);
      if (el.find(".swiper-slide").length > 1) {
        var hvr = $("<div>", {
          class: "hvr",
          append: [
            $("<div>", {
              class: "hvr__images",
              append: $("<div>", {
                class: "hvr__sectors",
              }),
            }),
            $("<div>", {
              class: "hvr__dots",
            }),
          ],
          insertAfter: el,
          prepend: el,
        });
        var hvrImages = $(".hvr__images", hvr);
        var hvrImage = $(".swiper-slide", hvr);
        var hvrSectors = $(".hvr__sectors", hvr);
        var hvrDots = $(".hvr__dots", hvr);
        el.prependTo(hvrImages);
        hvrImage.each(function () {
          hvrSectors.prepend('<div class="hvr__sector"></div>');
          hvrDots.append('<div class="hvr__dot"></div>');
        });
        $(".hvr__dot:first", hvrDots).addClass("hvr__dot--active");
        var setActiveEl = function (el) {
          hvrImage.hide().eq(el.index()).show();
          $(".hvr__dot", hvrDots)
            .removeClass("hvr__dot--active")
            .eq(el.index())
            .addClass("hvr__dot--active");
        };
        $(".hvr__sector", hvrSectors).hover(function () {
          setActiveEl($(this));
        });
        hvrSectors.on("touchmove", function (e) {
          var position = e.originalEvent.changedTouches[0];
          var target = document.elementFromPoint(
            position.clientX,
            position.clientY
          );
          if ($(target).is(".hvr__sector")) {
            setActiveEl($(target));
          }
        });
      }
    });
  };
})(jQuery);

if ($(window).width() > 992) {
  $(".images .swiper-wrapper").HvrSlider();
} else {
  const gallerySwiper = new Swiper(".images", {
    spaceBetween: 0,
    slidesPerView: 1,
    pagination: {
      el: ".images .swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    // navigation: {
    //   nextEl: ".card-gallery .swiper-button-next",
    //   prevEl: ".card-gallery .swiper-button-prev",
    // },
  });
}
/* end */

const productSwiper = new Swiper(".product__slider", {
  spaceBetween: 0,
  slidesPerView: 1,
  pagination: {
    el: ".product__slider .swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  navigation: {
    nextEl: ".product__slider .swiper-button-next",
    prevEl: ".product__slider .swiper-button-prev",
  },
});
if ($(window).width() < 992) {
  const othersSlider = new Swiper(".others__slider", {
    spaceBetween: 16,
    slidesPerView: 2,
    breakpoints: {
      800: {
        slidesPerView: 2.5,
      },
      600: {
        slidesPerView: 2,
      },
      320: {
        slidesPerView: 1.15,
      },
    },
    pagination: {
      el: ".others__slider .swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });
}
