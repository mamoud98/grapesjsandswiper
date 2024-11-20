import grapesjs from "grapesjs";
import loadBlocks from "./blocks";

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
});
