import React, { useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import swiperComponent from "../pluguns2";
import pluginBasic from "grapesjs-blocks-basic";
import pluginForms from "grapesjs-plugin-forms";
import style from "./style.css";

const Editor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = grapesjs.init({
        container: "#editor",
        fromElement: true,
        height: "100vh",
        width: "auto",
        styleManager: {},
        storageManager: false,
        plugins: [pluginBasic, pluginForms, swiperComponent],
        pluginsOpts: {
          swiperComponent: {},
          [pluginBasic]: {},
          [pluginForms]: {},
        },
        canvas: {
          styles: [
            "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css",
            style,
          ],
          scripts: [
            "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js",
          ],
        },
        blockManager: {
          appendTo: "#blocks",
        },
      });
    }
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div
        id="blocks"
        style={{
          width: "300px",
          background: "#f5f5f5",
          maxHeight: "100vh",
          overflow: "auto",
        }}
      />
      <div id="editor" style={{ flex: 1 }} />
    </div>
  );
};

export default Editor;
