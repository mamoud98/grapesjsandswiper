import { addSectorsWithBuildInPros, isMatch } from "./helper";
import { addNewSlider, addSlectAddDeleteSliders, RemoveSector } from "./logic";
import { backgroundSlid, DefultSectors } from "./sectorObj";

const styleTypes = (editor, ops) => {
  editor.on("component:selected", (component) => {
    const targetElements = [
      "swiper-wrapper",
      "swiper-container",
      "swiper-slide",
    ];

    if (
      component.get("type") === "swiper-container" ||
      component.get("type") === "swiper-wrapper" ||
      component.get("type") === "swiper-slide" ||
      isMatch(editor, targetElements)
    ) {
      addNewSlider(editor);
      addSlectAddDeleteSliders(editor, "selected");
      RemoveSector(editor, "general", "flex", "extra");
    } else {
      editor.StyleManager.removeSector("Custom Sector");
      addSectorsWithBuildInPros(editor, DefultSectors);
    }
  });

  editor.on("component:selected", (component) => {
    const targetElements = ["swiper-slide"];

    if (
      component.get("type") === "swiper-slide" ||
      isMatch(editor, targetElements)
    ) {
      addSectorsWithBuildInPros(editor, backgroundSlid);
    } else {
      RemoveSector(editor, "sild Selected");
    }
  });

  editor.on("component:add", (component) => {
    if (component.attributes.type === "swiper-slide") {
      RemoveSector(editor, "Custom Sector", "general", "flex", "extra");

      addNewSlider(editor);
      addSlectAddDeleteSliders(editor, "add");
    }
  });

  //this will fire when the silder component deteted
  editor.on("component:remove", (component) => {
    if (component.attributes.type === "swiper-slide") {
      editor.StyleManager.removeSector("Custom Sector");

      addNewSlider(editor);
      addSlectAddDeleteSliders(editor, "remove", component);
    }
  });
};
export default styleTypes;
