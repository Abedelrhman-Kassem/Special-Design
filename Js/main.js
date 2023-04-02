let landing = document.querySelector(".landing");
let sections = document.querySelectorAll("section");
let list = document.querySelectorAll(".colors-list li");
let backgroundSpans = document.querySelectorAll(".random-background span");
let backgroundShuffle;
let imgsArray = [];

// Open and Close Settings
document.querySelector(".setting .icon").addEventListener("click", function () {
  let settings = document.querySelector(".setting");
  let gearIcon = document.querySelector(".gear");
  settings.classList.toggle("opened");
  gearIcon.classList.toggle("opened");

  if (settings.classList.contains("opened")) {
    overlay = document.createElement("div");
    overlay.classList.add("popup-overlay");
    document.body.appendChild(overlay);

    overlay.onclick = function () {
      this.remove();
      settings.classList.remove("opened");
      gearIcon.classList.remove("opened");
    };
  } else overlay.remove();
});

// If MainColor is Chossen in LocalStorage
if (localStorage.mainColor) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.mainColor
  );
  list.forEach((li) => {
    if (li.dataset.color === localStorage.mainColor) {
      list.forEach((li) => {
        li.classList.remove("active");
      });
      li.classList.add("active");
    }
  });
}

// Chosse The Main Color
list.forEach((li) => {
  li.style.backgroundColor = li.dataset.color;
  li.addEventListener("click", () => {
    list.forEach((li) => {
      li.classList.remove("active");
    });
    li.classList.add("active");
    document.documentElement.style.setProperty(
      "--main-color",
      li.dataset.color
    );
    localStorage.mainColor = li.dataset.color;
  });
});

// Create Bullets
sections = Array.from(sections);
sections.shift();

let bulletsDiv = document.querySelector(".bullets");
let links = document.querySelectorAll(".header li a");
let fragment = document.createDocumentFragment();

sections.forEach((section, index) => {
  let bullet = document.createElement("div");
  bullet.classList.add("bullet");
  bullet.dataset.section = `.${section.classList.item(0)}`;
  links[index].dataset.section = `.${section.classList.item(0)}`;

  let toolTip = document.createElement("div");
  toolTip.classList.add("tooltip");
  let toolTipText = document.createTextNode(section.classList.item(0));
  toolTip.appendChild(toolTipText);

  bullet.appendChild(toolTip);
  fragment.appendChild(bullet);
});
bulletsDiv.appendChild(fragment);

let bullets = document.querySelectorAll(".bullets .bullet");
linkScroll(bullets);
linkScroll(links);

function linkScroll(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelector(ele.dataset.section)
        .scrollIntoView({ behavior: "smooth" });
      document.querySelector(".links").classList.remove("open");
    });
  });
}
// Set Active Class On Bullets While Scrolling
window.addEventListener("scroll", () => {
  sections.forEach((section, index) => {
    let sectionRect = section.getBoundingClientRect();
    bullets[index].classList.toggle(
      "active",
      sectionRect.top < 300 && sectionRect.bottom > 300
    );
  });
});

let bulletsSpans = document.querySelectorAll(".bullets-settings span");

if (localStorage.bulletOption) {
  bulletsSpans.forEach((span) => {
    span.dataset.display === localStorage.bulletOption
      ? span.classList.add("active")
      : span.classList.remove("active");
  });
  bulletsDiv.style.display = localStorage.bulletOption;
}

// Show Or Hide Bullets
bulletsSpans.forEach((span) => {
  span.addEventListener("click", () => {
    bulletsSpans.forEach((span) => {
      span.classList.remove("active");
    });
    span.classList.add("active");
    localStorage.bulletOption = span.dataset.display;
    bulletsDiv.style.display = localStorage.bulletOption;
  });
});

// Reset Button
document.querySelector(".reset-button").onclick = () => {
  localStorage.clear();
  location.reload();
};

changeBackground();

// if LocalStorage has RandomBackground
if (localStorage.randomBackground) {
  backgroundSpans.forEach((span) => {
    span.classList.remove("active");
  });
  document
    .querySelector(`[data-background=${localStorage.randomBackground}]`)
    .classList.add("active");
  if (localStorage.randomBackground === "no") {
    clearInterval(backgroundShuffle);
    landing.style.backgroundImage = `Url(imgs/01.jpg)`;
  }
}

// Random Backgrounds
backgroundSpans.forEach((span) => {
  span.addEventListener("click", () => {
    backgroundSpans.forEach((span) => {
      span.classList.remove("active");
    });
    span.classList.add("active");
    if (span.dataset.background === "no") {
      clearInterval(backgroundShuffle);
      landing.style.backgroundImage = `Url(imgs/01.jpg)`;
      localStorage.randomBackground = "no";
    } else {
      changeBackground();
      localStorage.randomBackground = "yes";
    }
  });
});

for (let i = 1; i <= 5; i++) {
  imgsArray.push(`0${i}.jpg`);
}

// chagne Background
function changeBackground() {
  backgroundShuffle = setInterval(() => {
    let randomNum = Math.floor(Math.random() * imgsArray.length);
    landing.style.backgroundImage = `Url(imgs/${imgsArray[randomNum]})`;
  }, 10000);
}

// Start Skills Animation

let skillSection = document.querySelector("section.skills");
let skillSpans = document.querySelectorAll("[data-progress]");
window.addEventListener("scroll", () => {
  let skillRect = skillSection.getBoundingClientRect();
  if (skillRect.top <= 10 && skillRect.bottom > 200) {
    skillSpans.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  } else {
    skillSpans.forEach((skill) => {
      skill.style.width = 0;
    });
  }
});

// End Skills Animation
// Start Gallery

let imgs = document.querySelectorAll(".gallery .imgs-box img");
imgs.forEach((img) => {
  img.addEventListener("click", () => {
    let popupOverlay = document.createElement("div");
    popupOverlay.classList.add("popup-overlay");
    document.body.appendChild(popupOverlay);

    let popupBox = document.createElement("div");
    popupBox.classList.add("popup-box");

    let heading = document.createElement("h3");
    heading.innerText = img.alt;
    popupBox.appendChild(heading);

    let popupImage = document.createElement("img");
    popupImage.classList.add("popup-image");
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);

    let closeButton = document.createElement("span");
    closeButton.classList.add("close-btn");
    closeButton.innerText = "X";
    popupBox.appendChild(closeButton);

    document.body.append(popupBox);

    closeButton.addEventListener("click", removePopup);
    popupOverlay.addEventListener("click", removePopup);
  });
});

function removePopup() {
  document.querySelector(".popup-box").remove();
  document.querySelector(".popup-overlay").remove();
}
// End Gallery
// Start Timeline

let boxs = document.querySelectorAll(".timeline .box");
boxs.forEach((box) => {
  window.addEventListener("scroll", () => {
    let boxRect = box.getBoundingClientRect();
    box.classList.toggle("show", boxRect.top < 400);
  });
});

// End Timeline
// Start Features

let featBoxs = document.querySelectorAll(".features .feat-box");
animationTop(featBoxs);

// End Features
// Start Testimonials

let tsBoxs = document.querySelectorAll(".testimonials .ts-box");
animationTop(tsBoxs);

// End Testimonials
// Start Contact Us

let inputDivs = document.querySelectorAll("form > div");
animationTop(inputDivs);

document
  .querySelector("[type=submit]")
  .addEventListener("click", (e) => e.preventDefault());

// End Contact Us
// open Menu Links
let toggleMenu = document.querySelector(".toggle-menu");
let linksDiv = document.querySelector(".links");

toggleMenu.onclick = (e) => {
  //
  e.stopPropagation();
  linksDiv.classList.toggle("open");
};
linksDiv.onclick = (e) => e.stopPropagation();

document.addEventListener("click", (e) => {
  if (e.target != toggleMenu && e.target != linksDiv) {
    linksDiv.classList.remove("open");
  }
});

// Animation Function
function animationTop(boxs) {
  boxs.forEach((box) => {
    window.addEventListener("scroll", () => {
      let boxRect = box.getBoundingClientRect();
      box.classList.toggle("show", boxRect.top < 600);
    });
  });
}
