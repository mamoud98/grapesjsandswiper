/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-undef */
const style = `<style>
    .swiper-container {
      width: 100%;
      height: 600px;
      overflow: hidden;
      position: relative;
      
    }
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
  
      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
    }
  
    .swiper-slide img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    </style>
    `;

const script = function () {
  const stopAutoplay = "{[ stopAutoplay ]}";

  const initLib = function () {
    const swiper = new Swiper(".mySwiper", {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        type: "bullets",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    window.swiperInstance = swiper;

    if (!!stopAutoplay) {
      swiper.autoplay.start();
    } else {
      swiper.autoplay.stop();
    }
  };

  if (typeof Swiper == "undefined") {
    const script = document.createElement("script");
    script.onload = initLib;
    script.src = "https://unpkg.com/swiper@7/swiper-bundle.min.js";
    document.body.appendChild(script);
  } else {
    initLib();
  }
};

const addSectorsWithBuildInPros = (editor, sectorObj) => {
  sectorObj.forEach((sector) => {
    editor.StyleManager.addSector(sector.id, {
      name: sector.name,
      open: sector.open,
      buildProps: sector.properties,
    });
  });
};

const isMatch = (editor, targetElements) => {
  const selected = editor.getSelected();
  const parents = [];
  let current = selected;

  while (current.parent()) {
    current = current.parent();
    parents.push(current.attributes.type); // Add each parent to the list
  }

  return parents.some((element) => targetElements.includes(element));
};

const getRandomString = (length = 5) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export { style, script, addSectorsWithBuildInPros, isMatch, getRandomString };
