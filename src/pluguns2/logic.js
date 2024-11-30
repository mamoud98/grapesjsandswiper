const addNewSlider = (editor) => {
  editor.StyleManager.addType("custom-button", {
    create({ props }) {
      const el = document.createElement("button");
      el.innerHTML = props.text || "Click Me"; // Set button text
      el.addEventListener("click", () => {
        const swiperContainer = editor.getWrapper();
        swiperContainer.find(".swiper-wrapper")[0].append({
          type: "swiper-slide",
          content: "<p>New Slide</p>",
        });

        editor.select(
          editor.DomComponents.getWrapper().find(".swiper-container")
        );
        window["0"].swiperInstance.update();
      });
      return el;
    },
  });
};
const SwiperSettings = (editor) => {
  editor.StyleManager.addType("SwiperSettings", {
    create({ props }) {
      const el = document.createElement("div");

      const autopaly = document.createElement("input");
      autopaly.type = "checkbox";
      autopaly.id = "autopaly";

      autopaly.addEventListener("click", (e) => {
        if (e.target.checked) {
          window["0"].swiperInstance.autoplay.start();
        } else {
          window["0"].swiperInstance.autoplay.stop();
        }
        window["0"].swiperInstance.update();
      });

      el.appendChild(autopaly);

      return el;
    },
  });
};

const addSectorForSliders = (editor, Sliders, Slidersproperties) => {
  SwiperSettings(editor);
  editor.StyleManager.addSector("Custom Sector", {
    name: "slider Sector",
    open: true,
    buildProps: ["custom-button", "SwiperSettings", ...Sliders],
    properties: [
      {
        id: "custom-button",
        type: "custom-button", // Use the custom type we just created
        name: "Custom Button", // Label
        text: "add Slide", // Button text
      },
      {
        id: "SwiperSettings",
        type: "SwiperSettings",
        name: "auto play",
      },
      ...Slidersproperties,
    ],
  });
};

const addSlectAddDeleteSliders = (editor, info, component = undefined) => {
  let swiperSlide = editor.DomComponents.getWrapper().find(".swiper-slide");

  if (info === "remove" && component) {
    swiperSlide = swiperSlide.filter((silde) => silde.cid !== component.cid);
  }

  swiperSlide.forEach((_, i) => {
    editor.StyleManager.addType(`swiper-slide_${i + 1}`, {
      create({ props }) {
        const container = document.createElement("div");
        container.className = "button-container";

        // make buttton for slect the slider element
        const el = document.createElement("button");
        el.innerHTML = props.name || `slider_${i + 1}`; // Set button text
        el.className = "slect"; // Set button text

        el.addEventListener("click", () => {
          editor.select(
            editor.DomComponents.getWrapper().find(".swiper-slide")[i]
          );
          window["0"].swiperInstance.slideTo(i);
        });
        container.appendChild(el);

        //make button for delete
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "-";
        deleteButton.className = "delete";
        deleteButton.addEventListener("click", () => {
          editor.DomComponents.getWrapper().find(".swiper-slide")[i].remove();
          window["0"].swiperInstance.update();
        });
        container.appendChild(deleteButton);

        return container;
      },
    });
  });

  const Sliders = swiperSlide.map((_, i) => `swiper-slide_${i + 1}`);
  const Slidersproperties = swiperSlide.map((_, i) => {
    return {
      id: `swiper-slide_${i + 1}`,
      type: `swiper-slide_${i + 1}`,
      name: `slide_${i + 1}`,
    };
  });

  addSectorForSliders(editor, Sliders, Slidersproperties);
};

const RemoveSector = (editor, ...Sectors) => {
  Sectors.forEach((id) => {
    editor.StyleManager.removeSector(id);
  });
};
export { addNewSlider, addSlectAddDeleteSliders, RemoveSector };
