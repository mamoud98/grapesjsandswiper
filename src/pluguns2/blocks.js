/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-undef */

export default (editor, opts = {}) => {
  const bm = editor.BlockManager;
  const dc = editor.DomComponents;
  const defaultType = dc.getType("default");
  const defaultView = defaultType.view;

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

  bm.add(opts.name, {
    label: `
      <i class="fa fa-arrows-h"></i>
      <div class="gjs-block-label">
        ${opts.label}
      </div> 
      `,
    category: opts.category,
    content: {
      type: "swiper-container",
    },
  });

  dc.addType("swiper-container", {
    model: {
      defaults: {
        tagName: "div",
        classes: ["swiper-container", "mySwiper"],
        draggable: true,
        droppable: true,
        traits: [
          {
            type: "button",
            text: "add Slide",
            label: "Add",
            full: true,
            name: "AddElement",
            command: "add-slide",
            changeProp: 1,
          },
          {
            type: "checkbox",
            name: "dynamicProgress",
            label: "Dynamic Progress",
            changeProp: 1,
          },
          {
            type: "checkbox",
            name: "stopAutoplay",
            label: "stop Autoplay",
            changeProp: 1,
          },
          {
            type: "select",
            name: "progressType",
            label: "Progress Type",
            changeProp: 1,
            options: [
              { value: "bullets", name: "Bullets" },
              { value: "fraction", name: "Fraction" },
              { value: "progressbar", name: "Progressbar" },
            ],
          },
        ],
        script: function () {
          const dynamicProgress = "{[ dynamicProgress ]}";
          const progressType = "{[ progressType ]}";
          const stopAutoplay = "{[ stopAutoplay ]}";

          const initLib = function () {
            const swiper = new Swiper(".mySwiper", {
              spaceBetween: 30,
              centeredSlides: true,
              autoplay: {
                delay: 2500,
                disableOnInteraction: false,
              },
              pagination: {
                el: ".swiper-pagination",
                clickable: true,
                dynamicBullets: !!dynamicProgress,
                type: progressType,
              },
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
            });

            if (!!stopAutoplay) {
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
        },
        components: [
          { type: "swiper-wrapper" },
          `<div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-pagination"></div>
           ${style}`,
        ],
      },
    },

    isComponent: (el) => {
      if (el.className && el.className.includes("swiper-container")) {
        return {
          type: opts.name,
        };
      }
    },

    view: defaultView.extend({
      init({ model }) {
        this.listenTo(model, "change:dynamicProgress", this.updateScript);
        this.listenTo(model, "change:progressType", this.updateScript);
        this.listenTo(model, "change:stopAutoplay", this.updateScript);
        this.listenTo(model, "Click:AddElement", this.updateScript);
      },
    }),
  });

  dc.addType("swiper-wrapper", {
    model: {
      defaults: {
        tagName: "div",
        classes: ["swiper-wrapper"],
        draggable: ".swiper-container",
        droppable: true,

        components: [{ type: "swiper-slide" }, { type: "swiper-slide" }],
      },
    },
  });

  dc.addType("swiper-slide", {
    model: {
      defaults: {
        tagName: "div",
        name: "swiperSlide",
        classes: ["swiper-slide"],
        draggable: ".swiper-wrapper",
        droppable: true,
        components: "<p>Slide Content</p>",
      },
    },
  });

  //  for adding slide
  editor.Commands.add("add-slide", (editor) => {
    const selected = editor.getSelected();

    if (selected && selected.is("swiper-container")) {
      selected.find(".swiper-wrapper")[0].append({
        type: "swiper-slide",
        content: "<p>New Slide</p>",
      });
    }
  });
};
