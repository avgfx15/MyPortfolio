// Mouse Circle

const mouseCircle = document.querySelector(".mouseCircle");
const mouseDot = document.querySelector(".mouseDot");

let mouseCircleBool = true;

const mouseCircleFun = (x, y) => {
  mouseCircleBool && (mouseCircle.style.cssText = `top:${y}px; left:${x}px`);

  mouseDot.style.cssText = `top:${y}px; left:${x}px`;
};

// Animated Circles

const circles = document.querySelectorAll(".circle");
const designer = document.querySelector(".designer");

let mx;
let my;
const z = 100;

const animatedCircle = (e, x, y) => {
  if (x < mx) {
    circles.forEach((circle) => {
      circle.style.left = `${z}px`;
    });
    designer.style.left = `${z}px`;
  } else if (x > mx) {
    circles.forEach((circle) => {
      circle.style.left = `-${z}px`;
    });
    designer.style.left = `-${z}px`;
  }

  if (y < my) {
    circles.forEach((circle) => {
      circle.style.top = `${z}px`;
    });
    designer.style.top = `${z}px`;
  } else if (y > my) {
    circles.forEach((circle) => {
      circle.style.top = `-${z}px`;
    });
    designer.style.top = `-${z}px`;
  }

  mx = e.clientX;
  my = e.clientY;
};
// End Of Animated Circles

let hoveredElementPosition = [];

document.body.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;

  mouseCircleFun(x, y);
  animatedCircle(e, x, y);

  // Sticky Element
  const hoveredElement = document.elementFromPoint(x, y);

  if (hoveredElement.classList.contains("sticky")) {
    if (hoveredElementPosition.length < 1) {
      hoveredElementPosition = [
        hoveredElement.offsetTop,
        hoveredElement.offsetLeft,
      ];
    }

    hoveredElement.style.cssText = `top: ${y}px; left: ${x}px`;
    if (
      hoveredElement.offsetTop <= hoveredElementPosition[0] - 100 ||
      hoveredElement.offsetTop >= hoveredElementPosition[0] + 100 ||
      hoveredElement.offsetLeft <= hoveredElementPosition[1] - 100 ||
      hoveredElement.offsetLeft >= hoveredElementPosition[1] + 100
    ) {
      hoveredElement.style.cssText = " ";
      hoveredElementPosition = [];
    }
    hoveredElement.onmouseleave = () => {
      hoveredElement.style.cssText = " ";
      hoveredElementPosition = [];
    };
  }
  // End Of Sticky Element

  // Mouse Circle Transform

  const mouseCircleTransform = (hoveredElement) => {
    if (hoveredElement.classList.contains("pointerEnter")) {
      hoveredElement.onmousemove = () => {
        mouseCircleBool = false;
        mouseCircle.style.cssText = `
        width : ${hoveredElement.getBoundingClientRect().width}px; 
        height : ${hoveredElement.getBoundingClientRect().height}px; 
        top : ${hoveredElement.getBoundingClientRect().top}px; 
        left : ${
          hoveredElement.getBoundingClientRect().left
        }px; opacity : 1; transform : translate(0, 0); animation: none; border-radius : ${
          getComputedStyle(hoveredElement).borderRadius
        }; transition : width 0.5s, height 0.5s, top 0.5s, left 0.5s, transform 0.5s, border-radius 0.5s`;
      };

      hoveredElement.onmouseleave = () => {
        mouseCircleBool = true;
      };

      document.onscroll = () => {
        if (!mouseCircleBool) {
          mouseCircle.style.top = `${
            hoveredElement.getBoundingClientRect().top
          }px`;
        }
      };
    }
  };
  mouseCircleTransform(hoveredElement);
  // End Of Mouse Circle Transform
});

document.body.addEventListener("mouseleave", () => {
  mouseCircle.style.opacity = "0";
  mouseDot.style.opacity = "0";
});
// End of Mouse Circle

// Main Button (mainBtn)
const mainBtns = document.querySelectorAll(".mainBtn");

mainBtns.forEach((mainBtn) => {
  let ripple;

  mainBtn.addEventListener("mouseenter", (e) => {
    const left = e.clientX - e.target.getBoundingClientRect().left;
    const top = e.clientY - e.target.getBoundingClientRect().top;

    ripple = document.createElement("div");
    ripple.classList.add("ripple");
    ripple.style.left = `${left}px`;
    ripple.style.top = `${top}px`;

    mainBtn.prepend(ripple);
  });

  mainBtn.addEventListener("mouseleave", () => {
    mainBtn.removeChild(ripple);
  });
});
// End Of Main Button (mainBtn)

// Progress Bar
const sections = document.querySelectorAll("section");
const progressBar = document.querySelector(".progressBar");
const halfCircles = document.querySelectorAll(".halfCircle");
const halfCircleTop = document.querySelector(".halfCircleTop");
const progressBarCircle = document.querySelector(".progressBarCircle");

const progressBarFunction = (bigImgWrapper = false) => {
  let pageHeight = 0;
  let scrolledPortion = 0;
  const pageViewPortHeight = window.innerHeight;
  if (!bigImgWrapper) {
    pageHeight = document.documentElement.scrollHeight;
    scrolledPortion = window.pageYOffset;
  } else {
    pageHeight = bigImgWrapper.firstElementChild.scrollHeight;
    scrolledPortion = bigImgWrapper.scrollTop;
  }
  const scrollPortionDegree =
    (scrolledPortion / (pageHeight - pageViewPortHeight)) * 360;
  // console.log(scrollPortionDegree);

  halfCircles.forEach((el) => {
    el.style.transform = `rotate(${scrollPortionDegree}deg)`;

    if (scrollPortionDegree >= 180) {
      halfCircles[0].style.transform = "rotate(180deg)";
      halfCircleTop.style.opacity = 0;
    } else {
      halfCircleTop.style.opacity = 1;
    }
  });

  const scrollBool = scrolledPortion + pageViewPortHeight === pageHeight;
  // ProgressBr Click

  progressBar.addEventListener("click", (e) => {
    e.preventDefault();

    if (!bigImgWrapper) {
      const sectionPosition = Array.from(sections).map((section) => {
        return scrolledPortion + section.getBoundingClientRect().top;
      });

      const position = sectionPosition.find((sectionPosition) => {
        return sectionPosition > scrolledPortion;
      });
      scrollBool ? window.scrollTo(0, 0) : window.scrollTo(0, position);
    } else {
      scrollBool
        ? bigImgWrapper.scrollTo(0, 0)
        : bigImgWrapper.scrollTo(0, bigImgWrapper.scrollHeight);
    }
  });

  // End Of ProgressBr Click

  // Arrow Rotation
  if (scrollBool) {
    progressBarCircle.style.transform = "rotate(180deg)";
  } else {
    progressBarCircle.style.transform = "rotate(0deg)";
  }
  // End Of Arrow Rotation
};
// End Of Progress Bar

// Navigation
// Menu Icon

const menuIcon = document.querySelector(".menuIcon");
const navbar = document.querySelector(".navbar");

const scrollFunction = () => {
  menuIcon.classList.add("showMenuIcon");
  navbar.classList.add("hideNavbar");

  // Progress Bar Function

  progressBarFunction();
  // End Of Progress Bar Function

  if (window.scrollY === 0) {
    menuIcon.classList.remove("showMenuIcon");
    navbar.classList.remove("hideNavbar");
  }
};

document.addEventListener("scroll", scrollFunction);

menuIcon.addEventListener("click", () => {
  menuIcon.classList.remove("showMenuIcon");
  navbar.classList.remove("hideNavbar");
});
// End Of Menu Icon

// End Of Navigation

// About Me Text

const aboutMeText = document.querySelector(".aboutMeText");

const aboutMeTextContent =
  "I am a designer & I am creating awards winning websites with the best user experience & I do not talk much, just contact me. :)";

Array.from(aboutMeTextContent).forEach((char) => {
  const span = document.createElement("span");
  span.textContent = char;

  aboutMeText.appendChild(span);

  span.addEventListener("mouseenter", (e) => {
    e.target.style.animation = "aboutMeTextAnim 10s infinite";
  });
});
// End Of About Me Text

// Section 3 Project Page setup

// Projects

const section_3 = document.querySelector(".section_3");
const container = document.querySelector(".container");
const projects = document.querySelectorAll(".project");
const projectHideBtn = document.querySelector(".projectHideBtn");

// Project move upword on Mouse Enter and reverce on Mouse Leave

projects.forEach((project, i) => {
  // Project move upword on Mouse Enter

  project.addEventListener("mouseenter", () => {
    project.firstElementChild.style.top = `-${
      project.firstElementChild.offsetHeight - project.offsetHeight + 20
    }px`;
  });

  // Back to Normal view on Mouse Leave

  project.addEventListener("mouseleave", () => {
    project.firstElementChild.style.top = "2rem";
  });

  // On Click Open Project In Big Project Img

  project.addEventListener("click", () => {
    const bigImgWrapper = document.createElement("div");

    bigImgWrapper.className = "projectImgWrapperEffect";

    container.appendChild(bigImgWrapper);

    const bigImg = document.createElement("img");

    bigImg.className = "projectBigImg";

    const imgPath = project.firstElementChild.getAttribute("src").split(".")[0];

    bigImg.setAttribute("src", `${imgPath}-big.jpg`);

    bigImgWrapper.appendChild(bigImg);

    document.body.style.overflowY = "hidden";

    document.removeEventListener("scroll", scrollFunction);

    mouseCircle.style.opacity = 0;

    progressBarFunction(bigImgWrapper);

    bigImgWrapper.onscroll = () => {
      progressBarFunction(bigImgWrapper);
    };

    // Project Hide Button Visible

    projectHideBtn.classList.add("change");

    projectHideBtn.onclick = () => {
      projectHideBtn.classList.remove("change");
      bigImgWrapper.remove();
      document.body.style.overflowY = "scroll";

      document.addEventListener("scroll", scrollFunction);

      progressBarFunction();
    };
    // End Of Project Hide Button Visible
  });
  // End Of On Click Open Project In Big Project Img

  if (i >= 6) {
    project.style.cssText = "display : none; opacity:0 ";
  }
});

// Show More Projects Button

const showMoreProjectsBtn = document.querySelector(".showMoreProjectsBtn");
const showMoreProjectsBtnText = document.querySelector(
  ".showMoreProjectsBtn span"
);

let showHideBool = true;

showMoreProjectsBtn.addEventListener("click", (e) => {
  e.preventDefault();

  showMoreProjectsBtn.firstElementChild.nextElementSibling.classList.toggle(
    "change"
  );

  projects.forEach((project, i) => {
    if (i >= 6) {
      if (showHideBool) {
        setTimeout(() => {
          project.style.display = "flex";
          section_3.scrollIntoView({
            block: "end",
          });
        }, 600);
        setTimeout(() => {
          project.style.opacity = 1;
        }, i * 200);

        showMoreProjectsBtnText.textContent = "Show Less";
      } else {
        setTimeout(() => {
          project.style.display = "none";
          section_3.scrollIntoView({
            block: "end",
          });
        }, 1200);

        setTimeout(() => {
          project.style.opacity = 0;
        }, i * 200);

        showMoreProjectsBtnText.textContent = "Show More";
      }
    }
  });
  showHideBool = !showHideBool;
});
// End Of Show More Projects Button

// End Of Projects

// End Of Section 3 Project Page setup

// Section 4 Set up

document.querySelectorAll(".serviceBtn").forEach((service) => {
  service.addEventListener("click", (e) => {
    e.preventDefault();

    const serviceText = service.nextElementSibling;
    serviceText.classList.toggle("change");

    const rightPosition = serviceText.classList.contains("change")
      ? `calc(100% - ${getComputedStyle(service.firstElementChild).width})`
      : 0;

    service.firstElementChild.style.right = rightPosition;
  });
});
// End Of Section 4 Set up

// Section - 5

// Form
const formHeading = document.querySelector(".form_heading");
const formInput = document.querySelectorAll(".form_Input");

formInput.forEach((input) => {
  input.addEventListener("focus", () => {
    formHeading.style.opacity = 0;
    setTimeout(() => {
      formHeading.textContent = `Your ${input.placeholder}`;
      formHeading.style.opacity = 1;
    }, 200);
  });

  input.addEventListener("blur", () => {
    formHeading.style.opacity = 0;
    setTimeout(() => {
      formHeading.textContent = "Let's Talk";
      formHeading.style.opacity = 1;
    }, 200);
  });
});

// Form Validation
const contact_form = document.querySelector(".contact_form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const errorMesages = document.querySelectorAll(".errorMessage");

const error = (input, errorMesages) => {
  input.nextElementSibling.classList.add("showErrorMsg");
  input.nextElementSibling.textContent = errorMesages;
};

const success = (input) => {
  input.nextElementSibling.classList.remove("showErrorMsg");
};

const checkRequireFields = (inputArray) => {
  inputArray.forEach((input) => {
    if (input.value.trim() === "") {
      error(input, `${input.id} is required`);
    }
  });
};

const checkLength = (input, minLength) => {
  if (input.value.trim().length < minLength) {
    error(input, `${input.id} must be atleast ${minLength} characters`);
  } else {
    success(input);
  }
};

const checkEmail = (input) => {
  const regEx =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (regEx.test(input.value.trim())) {
    success(input);
  } else {
    error(input, "email is not valid");
  }
};

contact_form.addEventListener("submit", (e) => {
  checkLength(name, 4);
  checkLength(subject, 5);
  checkLength(message, 10);
  checkEmail(email);
  checkRequireFields([name, email, subject, message]);

  const notValid = Array.from(errorMesages).find((errorMessage) => {
    return errorMessage.classList.contains("showErrorMsg");
  });
  console.log(notValid);

  notValid && e.preventDefault();
});

// End Of Form Validation

// End Of Form

// Slide Show Social Media

const slideShow = document.querySelector(".slideShow");

setInterval(() => {
  const firstIcon = slideShow.firstElementChild;

  firstIcon.classList.add("fadedOut");

  const thirdIcon = slideShow.children[3];

  thirdIcon.classList.add("light");
  thirdIcon.previousElementSibling.classList.remove("light");

  setTimeout(() => {
    slideShow.removeChild(firstIcon);
    slideShow.appendChild(firstIcon);
    setTimeout(() => {
      firstIcon.classList.remove("fadedOut");
    }, 500);
  }, 500);
}, 3000);

// End Of Slide Show Social Media

// End Of Section - 5
