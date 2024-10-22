// * плавный скролл на якоря

// const { on } = require("gulp");

$("body").on("click", '[href*="#"]', function (e) {
  var fixed_offset = 100;
  if (!$(this.hash).length) return;
  $("html,body")
    .stop()
    .animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 2000);
  e.preventDefault();
});

/*phone mask */
$("[data-tel-input]").inputmask({
  mask: "+7 (999) 999-99-99",
  showMaskOnHover: false,
  placeholder: "_",
});

// * Вычисляет ширину полосы прокрутки
function scrollWidth() {
  const div = document.createElement("div");
  div.style.height = "50px";
  div.style.width = "50px";
  div.style.overflowY = "scroll";

  document.body.appendChild(div);

  const scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth;
}

// * Убирает прокрутку у body
function bodyFixed() {
  $(".body-wrapper").css({
    "padding-right": scrollWidth() + "px",
    overflow: "hidden",
  });
}

function clearInlineStyle(element) {
  element.removeAttr("style");
}
/* accordeon */
$(".accordeon__item").on("click", function () {
  $(this).toggleClass("active").find(".accordeon__body").slideToggle(300);
});

/* modals */

function showModal(modalParam) {
  let modal = $(`.modal[data-modal=${modalParam}]`);
  let bg = $(".modals");
  if (bg.is(":visible")) {
    modal.fadeIn(300);
  } else {
    $(".modals").fadeIn(300);
    modal.fadeIn(300);
    bodyFixed();
  }
}

function hideModal(modalParam) {
  let modal = $(`.modal[data-modal=${modalParam}]`);
  $(".modals").fadeOut(300);
  modal.fadeOut(300);
  clearInlineStyle($(".body-wrapper"));
}
function openSuccessModal() {
  showModal("thanks-modal");
}
function clearModalForm(form = null) {
  const forms =
    form !== null ? form.get() : document.querySelectorAll(".modal__form");
  if (form.length) {
    forms.forEach((form) => {
      form.reset();
      form.querySelectorAll(".custom-input.filled").forEach((input) => {
        input.classList.remove("filled");
      });
      let span = form.querySelector(".custom-input__span");
      if (span) {
        span.innerText = "Прикрепите ТЗ если есть";
      }
    });
  }
}
$(document).on("click", ".openmodal", function (e) {
  e.preventDefault();
  const modalId = $(this).attr("data-modal");
  showModal(modalId);
  if ($(this).parent().hasClass("mobile-menu__bottom")) {
    $(".mobile-menu").slideUp(300);
    $(".mobile-menu__dropdown").removeClass("active");
    $(".mobile-submenu").slideUp(300);
    $(".mobile-submenu2").slideUp(300);
    clearInlineStyle($(".body-wrapper"));
  }
});

$(".modal__close, .modal__close-btn").on("click", function () {
  let form = $(this).closest(".modal").find("form");
  const element = $(this);
  const modal = element.closest(".modal").attr("data-modal");
  hideModal(modal);
  clearModalForm(form);
});

/* меню в подвале */
$(".footer__menu-item_drop").on("click", function () {
  $(this).find(".footer__submenu").slideToggle(300);
});
let initialPrice;
/* перключает теги*/
$(".tags__item").on("click", function () {
  /* для стр контакты */
  if ($(this).closest(".tags").hasClass("tags_route")) {
    let tab = $(this);
    let street = tab.attr("data-street");
    $(`.tab-content[data-street="${street}"]`)
      .addClass("active")
      .siblings()
      .removeClass("active");
  } else if ($(this).closest(".tags").hasClass("tags_calc")) {
    /* для стр tent */

    let dataPrice = $(this).attr("data-price");
    initialPrice = Number(dataPrice.replace(/\s+/g, ""));
    let dataType = $(this).attr("data-type");
    $(".calc__result-price span").text(
      dataPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    );
    $(".calc__result-block_options, .calc__result-block_comfort")
      .slideUp(300)
      .find("li")
      .remove();
    $(
      ".calc__variants-main .calc__options-item, .calc__variants-comfort .calc__options-item"
    )
      .removeClass("chosen")
      .find("input[type='checkbox']")
      .prop("checked", false);
    if (dataType == "arenda") {
      $(".calc__variants-days").slideDown(300);
    } else {
      $(".calc__variants-days").slideUp(300);
      /* ставит количесвто дней и цену по умолчанию при переключении на покупку*/
      setTimeout(function () {
        $(".calc__variants-days")
          .find(".calc__options-item:first")
          .addClass("chosen")
          .find("input[type='radio']")
          .prop("checked", true);
        $(".calc__variants-days")
          .find(".calc__options-item:first")
          .siblings()
          .removeClass("chosen");
        let mainPrice = Number(
          $(".calc__variants-days")
            .find(".calc__options-item:first")
            .addClass("chosen")
            .find("input[type='radio']")
            .attr("data-price")
        );
        $(".tags__item[data-rent]").attr("data-price", `${mainPrice}`);
      }, 300);
    }
  } else if ($(this).closest(".tags").hasClass("tags_product")) {
    /* для стр цены на продукцию*/
    let dataTabs = $(this).attr("data-tabs");
    $(`.price__tabs-wrapper[data-tabs="${dataTabs}"]`)
      .addClass("active")
      .siblings()
      .removeClass("active");
  } else if ($(this).closest(".tags").hasClass("tags_inner")) {
    /* для табов у шатров на стр цены на продукцию*/
    let dataTabs = $(this).attr("data-tabs");
    $(`.tabs-inner-wrapper[data-tabs="${dataTabs}"]`)
      .addClass("active")
      .siblings()
      .removeClass("active");
  }
  $(this).addClass("active").siblings().removeClass("active");
});
/* добавляет сактивынй пункт меню при переходе на стр*/
let pathname = window.location.pathname;
$(`.main-menu__item a[href='${pathname}']`)
  .closest(".main-menu__item")
  .addClass("active");

if (pathname == "/promo.html" || pathname == "/news.html") {
  $(".header__menu-link[data-drop='promo-news']").addClass("active");
}

$(document).on("click", ".show-more", function () {
  $(this).toggleClass("active");

  if ($(this).hasClass("active")) {
    $(this)
      .text("Скрыть")
      .parent()
      .find("p")
      // .addClass("show")
      .removeClass("hidden");
  } else {
    $(this).text("Подробнее").parent().find("p").addClass("hidden");
  }
});
$(document).ready(function () {
  let paragHeight = $(".template-top__content p").height();
  if (paragHeight > 150) {
    $(".template-top__content p")
      .addClass("hidden")
      .after(` <div class="show-more">Подробнее</div>`);
  }
});
/* чекбоксы для опций и доп опций*/
$(document).ready(function () {
  let optionsPrice = 0;
  initialPrice = Number(
    $(document)
      .find(".tags__item.active")
      .attr("data-price")
      .replace(/\s+/g, "")
  );
  /* выбор дней */
  $(".calc__options-item input[type='radio']").on("change", function () {
    let daysPrice = Number($(this).attr("data-price"));
    initialPrice = daysPrice;
    let finalPrice = initialPrice + optionsPrice;
    $(".tags__item[data-rent]").attr("data-price", `${daysPrice}`);
    if ($(this).is(":checked")) {
      $(this)
        .closest(".calc__options-item")
        .addClass("chosen")
        .siblings()
        .removeClass("chosen");
    }
    $(".calc__result-price span").text(
      finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    );
  });
  /* выбор опций */

  $(".calc__options-item input[type='checkbox']").on("change", function () {
    optionsPrice = 0;
    let checkbox = $(this);
    let checkboxId = checkbox.attr("id");
    let label = checkbox.closest(".calc__options-item");
    let parent = label.closest(".calc__variants");
    let dataBlock = parent.attr("data-block");
    let txt = label.find(".calc__options-title").text().trim();

    $(".calc__options-item input[type='checkbox']:checkbox").each(function () {
      if ($(this).is(":checked")) {
        optionsPrice += parseFloat($(this).val());
      }
    });
    if ($(this).is(":checked")) {
      $(`.calc__result-block[data-block=${dataBlock}]`)
        .slideDown(300)
        .find("ul")
        .append(`<li data-option="${checkboxId}">${txt}</li>`);
    } else {
      $(`.calc__result-block[data-block=${dataBlock}]`)
        .find(`li[data-option=${checkboxId}]`)
        .remove();
    }
    if ($(`.calc__result-block[data-block=${dataBlock}] ul li`).length == 0) {
      $(`.calc__result-block[data-block=${dataBlock}]`).slideUp(300);
    }
    let finalPrice = initialPrice + optionsPrice;
    $(".calc__result-price span").text(
      finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    );
  });
});

// $(".calc__options-item input[type='checkbox']").on("change", function () {
//   let checkbox = $(this);
//   let checkboxId = checkbox.attr("id");
//   let label = checkbox.closest(".calc__options-item");
//   let parent = label.closest(".calc__variants");
//   let dataBlock = parent.attr("data-block");
//   let txt = label.find(".calc__options-title").text().trim();
//   let price = Number(
//     label.find(".calc__options-price span").text().replace(/\s+/g, "")
//   );
//   let mainPrice = Number(
//     $(".calc__result-price span").text().replace(/\s+/g, "")
//   );
//   if (checkbox.is(":checked")) {
//     let sum = mainPrice + price;
//     $(".calc__result-price span").text(
//       sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
//     );
//     $(`.calc__result-block[data-block=${dataBlock}]`)
//       .slideDown(300)
//       .find("ul")
//       .append(`<li data-option="${checkboxId}">${txt}</li>`);
//   } else {
//     // label.removeClass("chosen");
//     let substr = mainPrice - price;
//     $(".calc__result-price span").text(
//       substr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
//     );
//     $(`.calc__result-block[data-block=${dataBlock}]`)
//       .find(`li[data-option=${checkboxId}]`)
//       .remove();
//     if ($(`.calc__result-block[data-block=${dataBlock}] ul li`).length == 0) {
//       $(`.calc__result-block[data-block=${dataBlock}]`).slideUp(300);
//     }
//   }
// });
/* поиск в шапке десктоп*/
$(".search__open").on("click", function () {
  $(".search__form").addClass("active");
  $(".search__input").focus();
});
$(".search__close").on("click", function () {
  $(".search__form").removeClass("active");
  $(".search__input").blur();
});

/* поиск в шапке мобила*/
$(".mobile-search__open").on("click", function () {
  // $(".mobile-search__form").addClass("active");
  $(this).hide();
  $(".mobile-search__form").slideDown(300);
  $(".mobile-search__input").focus();
});
$(document).click(function (e) {
  if (!$(e.target).closest(".mobile-search").length) {
    $(".mobile-search__open").show();
    $(".mobile-search__form").slideUp(300);
    $(".mobile-search__input").blur();
  }
});

/* mobile menu */
$(".burger").on("click", function () {
  $(".mobile-menu").slideDown(300);
  bodyFixed();
});
$(".mobile-menu__close").on("click", function () {
  $(".mobile-menu").slideUp(300);
  $(".mobile-menu__dropdown").removeClass("active");
  $(".mobile-submenu").slideUp(300);
  $(".mobile-submenu2").slideUp(300);
  clearInlineStyle($(".body-wrapper"));
});
$(".mobile-menu__dropdown a").on("click", function () {
  $(this)
    .closest(".mobile-menu__dropdown")
    .toggleClass("active")
    .find(".mobile-submenu")
    .slideToggle(300);
});
$(".mobile-submenu li").on("click", function () {
  $(this).find(".mobile-submenu2").slideToggle(300);
});

/* открыть/скрыть форму в слайдере на главной стр*/
// if ($(window).width() < 660) {
//   $(".hero__slide-form h4").on("click", function () {
//     $(this)
//       .closest(".hero__slide-form")
//       .find(".callback-form__hide")
//       .slideToggle(300);
//   });
// }
$(document).ready(function () {
  if ($(window).width() < 660) {
    $(".hero__slide-form h4")
      .addClass("openmodal")
      .attr("data-modal", "callback");
  }
});

/* таблица в прайсе*/

$(document).ready(function () {
  // if ($(window).width() < 760) {
  //   $(".price-table_complect tr:nth-child(n+3) td:nth-child(1)").after(
  //     `<tr class="hidden-head"><td>СТАНДАРТ</td><td>ЛЮКС</td></tr>`
  //   );
  // } else {
  //   $(".hidden-head").remove();
  // }
  $(".price__note_drop").on("click", function () {
    $(this)
      .toggleClass("active")
      .next(".price-table_dropdown")
      .slideToggle(300);
  });
});

$(document).ready(function () {
  $(".product__info-table .table__col").each(function () {
    let element = $(this);
    let txt = element.html();
    element.empty().append(`<span>${txt}</span>`);
  });
});
/* переход на нужный таб в прайсе из меню */
$(document).ready(function () {
  var searchParams = location.href.split(location.host)[1];
  $(".tags_product")
    .find(`.tags__item[data-tabs="${searchParams}"]`)
    .trigger("click");
  if (searchParams.indexOf("tabInner") >= 0) {
    var vars = [],
      hash;
    var hashes = window.location.href
      .slice(window.location.href.indexOf("?") + 1)
      .split("&");
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split("=");
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    let firstTab = "/prices/?" + hashes[0];
    let secondTab = hashes[1];
    $(".tags_product")
      .find(`.tags__item[data-tabs="${firstTab}"]`)
      .trigger("click");
    $(".tags_inner")
      .find(`.tags__item[data-tabs="${secondTab}"]`)
      .trigger("click");
  }
});
/* прижимает подвал книзу старницы, если контента мало*/
if ($(window).width() > 992) {
  let footerHeight = $(".footer").height();
  let windowHeight = $(window).height();
  let mainHeight = $(".main").height();
  let headerHeight = $(".header").height();
  let freeHeight = windowHeight - footerHeight - headerHeight;
  if (mainHeight < freeHeight) {
    $(".main").attr("style", `height: ${freeHeight - mainHeight}px`);
  }
}
/* считает высоту отступа от фиксированной шапки для основного контента */

$(document).ready(function () {
  let headerHeight;
  let mainContent = $(".main");
  if ($(window).width() > 1265) {
    headerHeight = $(".header").height() + 28;
  } else {
    headerHeight = $(".header").height();
  }
  mainContent.attr("style", `margin-top:${headerHeight}px`);
});
$(function () {
  let header = $(".header");

  $(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
      header.addClass("fixed");
    } else {
      header.removeClass("fixed");
    }
  });
});
$(document).ready(function () {
  let rowsLength = $(".price-table_hidden tr").length;
  if (rowsLength > 10) {
    $(".price-table_hidden tr:nth-child(n + 10)")
      .addClass("row-to-hide")
      .hide();
  }
  $(".price-table_hidden").after(
    `<a class="primary-btn price-table-more">Показать еще</a>`
  );
  $(document).on("click", ".price-table-more", function () {
    $(this).prev(".price-table_hidden").toggleClass("opened");
    if ($(this).prev(".price-table_hidden").hasClass("opened")) {
      $(this).text("Скрыть");
      $(this).prev(".price-table_hidden").find(".row-to-hide").show();
    } else {
      $(this).text("Показать еще");
      $(this).prev(".price-table_hidden").find(".row-to-hide").hide();
    }
  });
  const ps = new PerfectScrollbar(".tags_product", {
    wheelSpeed: 0.5,
    wheelPropagation: true,
    // minScrollbarLength: 20,
    swipeEasing: true,
  });
});
