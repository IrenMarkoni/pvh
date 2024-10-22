/* btns animation */
// * The function of adding a loader to the button
function addBtnLoader(btn) {
  btn
    .attr("disabled", "disabled")
    .css("width", btn.outerWidth() + "px")
    .css("height", btn.outerHeight() + "px")
    .html(
      '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>'
    );
}
// * The function of removing the loader from the button
function removeBtnLoader(btn, btnOld) {
  btn.removeAttr("disabled").removeAttr("style").html(btnOld);
}

function submitForm(form) {
  const fd = new FormData();
  ajaxPost("https://jsonplaceholder.typicode.com/users", fd)
    .then((response) => response.json())
    .then((data) => {
      $(".modals").fadeIn(300);
      openSuccessModal();
      form.reset();
    })
    .catch((error) => console.log(error));
}

/* пошаговая форма */
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("steps-form__tab");
  if (x.length) {
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
      document.getElementById("prevBtn").style.display = "none";
    } else {
      document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == x.length - 1) {
      document.getElementById("nextBtn").innerHTML = "Отправить";
      document.getElementById("nextBtn").classList.remove("primary-btn_arrow");

      document.getElementById("agreement").style.display = "block";
      document.querySelector(".steps__line").classList.add("hide");
    } else {
      document.getElementById("nextBtn").innerHTML = "Далее";
      document.getElementById("agreement").style.display = "none";
      document.querySelector(".steps__line").classList.remove("hide");
    }
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n);
  }
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("steps-form__tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    // document.getElementById("regForm").submit();
    var form = document.getElementById("regForm");
    submitForm(form);

    var listOfSteps = document.querySelectorAll(".step");

    listOfSteps.forEach(function (element, index) {
      if (index === 0) {
        element.classList.add("active");
        element.classList.remove("finish");
      } else {
        element.classList.remove("active");
        element.classList.remove("finish");
      }
    });
    var listOfTabs = document.querySelectorAll(".steps-form__tab");
    listOfTabs.forEach(function (element, index) {
      if (index === 0) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    });
    // var listOfInputs = document.querySelectorAll(".steps-form__tab input");
    // listOfInputs.forEach(function (element, index) {
    //   element.value = "";
    // });
    document.querySelector(".steps__line").classList.remove("hide");

    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("steps-form__tab");
  y = x[currentTab].querySelectorAll("input[required]");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
    // document.getElementsByClassName("step")[currentTab].innerHTML = "";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
  x[n].classList.remove("finish");
  // x[n].innerHTML = n + 1;
}

function ajaxPost(url, data, headers = {}, params = {}) {
  return fetch(url, {
    method: "POST",
    body: data,
    headers: headers,
    ...params,
  });
}

$("form:not(.search__form, .mobile-search__form)").on("submit", function (e) {
  e.preventDefault();
  const form = $(this);
  const btn = form.find("button[type=submit]");
  const btnHtml = btn.html();
  const fd = new FormData();
  addBtnLoader(btn);
  ajaxPost("https://jsonplaceholder.typicode.com/users", fd)
    .then((response) => response.json())
    .then((data) => {
      clearModalForm(form);
      removeBtnLoader(btn, btnHtml);
      if (form.hasClass("modal__form")) {
        let modal = form.closest(".modal");
        modal.fadeOut(300);
        setTimeout(function () {
          openSuccessModal();
        }, 300);
      } else {
        $(".modals").fadeIn(300);
        openSuccessModal();
      }
    })
    .catch((error) => console.log(error));
});
