(function () {
  var form = document.querySelector("[data-survey-form]");
  if (!form) {
    return;
  }

  var stepOne = form.querySelector('[data-survey-step="1"]');
  var stepTwo = form.querySelector('[data-survey-step="2"]');
  var nextButton = form.querySelector("[data-next-step]");
  var submitButton = form.querySelector("[data-submit-button]");
  var submittedAt = form.querySelector("[data-submitted-at]");
  var submitError = form.querySelector("[data-submit-error]");
  var surveyHero = document.querySelector("[data-survey-hero]");
  var successCard = document.querySelector("[data-survey-success]");
  var submitButtonText = submitButton ? submitButton.textContent : "";

  var showElement = function (element) {
    if (element) {
      element.hidden = false;
    }
  };

  var hideElement = function (element) {
    if (element) {
      element.hidden = true;
    }
  };

  var getQuestions = function (step) {
    return Array.from(step.querySelectorAll("[data-question]"));
  };

  var getInputs = function (question) {
    return Array.from(question.querySelectorAll("input, textarea, select"));
  };

  var getError = function (question) {
    return question.querySelector("[data-field-error]");
  };

  var setQuestionError = function (question, message) {
    var error = getError(question);
    question.classList.add("invalid");
    getInputs(question).forEach(function (input) {
      input.setAttribute("aria-invalid", "true");
      if (error && error.id) {
        input.setAttribute("aria-describedby", error.id);
      }
    });

    if (error) {
      error.textContent = message;
      error.hidden = false;
    }
  };

  var clearQuestionError = function (question) {
    var error = getError(question);
    question.classList.remove("invalid");
    getInputs(question).forEach(function (input) {
      input.removeAttribute("aria-invalid");
      input.removeAttribute("aria-describedby");
    });

    if (error) {
      error.textContent = "";
      error.hidden = true;
    }
  };

  var getChecked = function (question) {
    return getInputs(question).filter(function (input) {
      return input.checked;
    });
  };

  var emailLooksValid = function (value) {
    return value.indexOf("@") !== -1 && value.indexOf(".") !== -1;
  };

  var validateQuestion = function (question) {
    clearQuestionError(question);

    var type = question.getAttribute("data-type");
    var required = question.getAttribute("data-required") === "true";
    var inputs = getInputs(question);
    var message = question.getAttribute("data-error") || "Please complete this question.";

    if (type === "radio") {
      if (required && getChecked(question).length === 0) {
        setQuestionError(question, message);
        return false;
      }
      return true;
    }

    if (type === "checkbox") {
      var checkedCount = getChecked(question).length;
      var minimum = Number(question.getAttribute("data-min") || 0);
      var maximum = Number(question.getAttribute("data-max") || 0);

      if (required && checkedCount < minimum) {
        setQuestionError(question, message);
        return false;
      }

      if (maximum && checkedCount > maximum) {
        setQuestionError(question, question.getAttribute("data-max-error") || message);
        return false;
      }

      return true;
    }

    if (type === "email") {
      var email = inputs[0] ? inputs[0].value.trim() : "";
      if (email && !emailLooksValid(email)) {
        setQuestionError(question, message);
        return false;
      }
      return true;
    }

    if (required) {
      var field = inputs[0];
      if (!field || !field.value.trim()) {
        setQuestionError(question, message);
        return false;
      }
    }

    return true;
  };

  var focusQuestion = function (question) {
    var firstInput = question.querySelector("input, textarea, select");
    if (firstInput) {
      firstInput.focus();
      return;
    }
    question.focus();
  };

  var validateStep = function (step) {
    var questions = getQuestions(step);
    var firstInvalid = null;
    var isValid = true;

    questions.forEach(function (question) {
      if (!validateQuestion(question)) {
        isValid = false;
        if (!firstInvalid) {
          firstInvalid = question;
        }
      }
    });

    return {
      isValid: isValid,
      firstInvalid: firstInvalid
    };
  };

  var showStepError = function (stepNumber) {
    var banner = form.querySelector('[data-step-error="' + stepNumber + '"]');
    showElement(banner);
    return banner;
  };

  var hideStepError = function (stepNumber) {
    hideElement(form.querySelector('[data-step-error="' + stepNumber + '"]'));
  };

  var goToStepTwo = function () {
    hideElement(stepOne);
    showElement(stepTwo);
    window.scrollTo({ top: 0, behavior: "smooth" });

    var heading = document.getElementById("part-2-heading");
    if (heading) {
      heading.focus({ preventScroll: true });
    }
  };

  var showSuccess = function () {
    hideElement(surveyHero);
    hideElement(form);
    showElement(successCard);
    window.scrollTo({ top: 0, behavior: "smooth" });

    var heading = successCard ? successCard.querySelector("h2") : null;
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
  };

  nextButton.addEventListener("click", function () {
    hideStepError("1");
    var result = validateStep(stepOne);

    if (result.isValid) {
      goToStepTwo();
      return;
    }

    var banner = showStepError("1");
    if (banner) {
      banner.focus();
    }
    focusQuestion(result.firstInvalid);
  });

  form.addEventListener("input", function (event) {
    var question = event.target.closest("[data-question]");
    if (question) {
      clearQuestionError(question);
    }
    hideStepError("1");
    hideStepError("2");
    hideElement(submitError);
  });

  form.addEventListener("change", function (event) {
    var question = event.target.closest("[data-question]");
    if (question) {
      clearQuestionError(question);
      validateQuestion(question);
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    hideStepError("2");
    hideElement(submitError);

    var result = validateStep(stepTwo);
    if (!result.isValid) {
      var banner = showStepError("2");
      if (banner) {
        banner.focus();
      }
      focusQuestion(result.firstInvalid);
      return;
    }

    if (submittedAt) {
      submittedAt.value = new Date().toISOString();
    }

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json"
      }
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Submission failed");
        }
        showSuccess();
      })
      .catch(function () {
        showElement(submitError);
        submitError.focus();
        submitButton.disabled = false;
        submitButton.textContent = submitButtonText;
      });
  });
})();
