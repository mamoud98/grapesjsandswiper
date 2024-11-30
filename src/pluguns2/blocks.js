/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-undef */
import { style, script, getRandomString } from "./helper";
export default (editor, opts = {}) => {
  const bm = editor.BlockManager;
  const dc = editor.DomComponents;
  const defaultType = dc.getType("default");
  const defaultView = defaultType.view;

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
            type: "checkbox",
            name: "stopAutoplay",
            label: "start Autoplay",
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
        script,

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
        this.listenTo(model, "change:progressType", this.updateScript);
        this.listenTo(model, "change:stopAutoplay", this.updateScript);
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
        components: [
          { type: "swiper-slide" },
          { type: "swiper-slide" },
          { type: "swiper-slide" },
        ],
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
      init() {
        this.updateDynamicClass();
      },
      updateDynamicClass() {
        const classes = this.get("classes");
        const dynamicClass = getRandomString();

        // Ensure the class is unique
        if (!classes.some((cls) => cls.id === dynamicClass)) {
          classes.add({ name: dynamicClass });
        }
      },
    },
  });
};
