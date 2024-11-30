import grapesjs from "grapesjs";
import loadBlocks from "./blocks";
import styleTypes from "./styleTypes";

export default grapesjs.plugins.add("swiperComponent", (editor, opts = {}) => {
  let options = {
    label: "Swiper",
    name: "cswiper",
    category: "Advanced",
  };
  for (let name in options) {
    if (!(name in opts)) opts[name] = options[name];
  }

  loadBlocks(editor, options);
  styleTypes(editor, options);
});
