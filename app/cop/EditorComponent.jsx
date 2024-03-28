"use client";
import React, { useRef, useEffect, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import InlineCode from "@editorjs/inline-code";
import Link from "@editorjs/link";
import Image from "@editorjs/image";
import Embed from "@editorjs/embed";
import Delimiter from "@editorjs/delimiter";
import Code from "@editorjs/code";
import Checklist from "@editorjs/checklist";

const EditorComponent = () => {
  const editorInstance = useRef(null);
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    editorInstance.current = new EditorJS({
      holder: "editorjs",
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: "عنوان",
          },
          shortcut: "CMD+SHIFT+H",
        },
        image: {
          class: Image,
          inlineToolbar: true,
          config: {
            placeholder: "صورة",
          },
        },
        inlineCode: {
          class: InlineCode,
          shortcut: "CMD+SHIFT+M",
        },
        list: {
          class: List,
          inlineToolbar: true,
          toolbox: true,
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
      },
      autofocus: true,
      onReady: () => {
        console.log("Editor.js is ready to work!");
      },
      placeholder: "!دعونا نكتب قصة رهيبة",

      data: {},

      i18n: {
        direction: "rtl",
        /**
         * @type {I18nDictionary}
         */
        messages: {
          ui: {
            blockTunes: {
              toggler: {
                "Click to tune": "Нажмите, чтобы настроить",
                "or drag to move": "или перетащите",
              },
            },
            inlineToolbar: {
              converter: {
                "Convert to": "Конвертировать в",
              },
            },
            toolbar: {
              toolbox: {
                Add: "Добавить",
              },
            },
          },

          toolNames: {
            Text: "Параграф",
            Heading: "عنوان",
            List: "Список",
            Warning: "Примечание",
            Checklist: "Чеклист",
            Quote: "Цитата",
            Code: "Код",
            Delimiter: "Разделитель",
            "Raw HTML": "HTML-фрагмент",
            Table: "Таблица",
            Link: "Ссылка",
            Marker: "Маркер",
            Bold: "Полужирный",
            Italic: "Курсив",
            InlineCode: "Моноширинный",
          },

          tools: {
            warning: {
              Title: "Название",
              Message: "Сообщение",
            },

            link: {
              "Add a link": "Вставьте ссылку",
            },

            stub: {
              "The block can not be displayed correctly.":
                "Блок не может быть отображен",
            },
          },

          blockTunes: {
            delete: {
              Delete: "Удалить",
            },
            moveUp: {
              "Move up": "Переместить вверх",
            },
            moveDown: {
              "Move down": "Переместить вниз",
            },
          },
        },
      },

      // يمكنك إضافة المزيد من الخيارات هنا
    });

    return () => {
      if (
        editorInstance.current &&
        typeof editorInstance.current.destroy === "function"
      ) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, []);





  const handleExportJson = async () => {
    try {
      const savedData = await editorInstance.current.save();
      setJsonData(savedData);
    } catch (error) {
      console.error("Failed to export JSON:", error);
    }
  };


  return (
    <>
      <div
        id="editorjs"
        className="dark:bg-stone-800 mb-5 w-full *:dark:text-white"
      ></div>
      <button onClick={handleExportJson}>Export JSON</button>
      {jsonData && (
        <div>
          <h2>Exported JSON:</h2>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </>
  );
};

export default EditorComponent;
