let landing = document.querySelector(".landing");
let list = document.querySelectorAll(".colors-list li");
let backgroundSpans = document.querySelectorAll(".random-background span");
let backgroundShuffle;
let imgsArray = [];

// Open and Close Settings
document.querySelector(".setting .icon").addEventListener("click", function () {
  document.querySelector(".setting").classList.toggle("opened");
  document.querySelector(".gear").classList.toggle("opened");
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
  if (skillRect.top <= 0 && skillRect.bottom > 200) {
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
featBoxs.forEach((featBox) => {
  window.addEventListener("scroll", () => {
    let featBoxRect = featBox.getBoundingClientRect();
    featBox.classList.toggle("show", featBoxRect.top < 600);
  });
});

// End Features
// Start Testimonials

let tsBoxs = document.querySelectorAll(".testimonials .ts-box");
tsBoxs.forEach((tsBox) => {
  window.addEventListener("scroll", () => {
    let tsBoxRect = tsBox.getBoundingClientRect();
    tsBox.classList.toggle("show", tsBoxRect.top < 600);
  });
});

// End Testimonials
