// "use client";
// import React from "react";
// import { useEffect, useMemo, useCallback } from "react";
// import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
// import Paragraph from "@yoopta/paragraph";
// import { HeadingOne, HeadingTwo, HeadingThree } from "@yoopta/headings";
// import Image from "@yoopta/image";
// import Blockquote from "@yoopta/blockquote";
// import Callout from "@yoopta/callout";
// import Code from "@yoopta/code";
// import Table from "@yoopta/table";
// import Divider from "@yoopta/divider";
// import { NumberedList, BulletedList, TodoList } from "@yoopta/lists";
// import Accordion from "@yoopta/accordion";

// import LinkTool, { DefaultLinkToolRender } from "@yoopta/link-tool";
// import ActionMenu, { DefaultActionMenuRender } from "@yoopta/action-menu-list";
// import Toolbar, { DefaultToolbarRender } from "@yoopta/toolbar";

// import {
//   Bold,
//   Italic,
//   CodeMark,
//   Underline,
//   Strike,
//   Highlight,
// } from "@yoopta/marks";

// const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

// Tools should be defined outside component
// const TOOLS = {
//   Toolbar: {
//     tool: Toolbar,
//     render: DefaultToolbarRender,
//   },
//   ActionMenu: {
//     tool: ActionMenu,
//     render: DefaultActionMenuRender,
//   },
//   LinkTool: {
//     tool: LinkTool,
//     render: DefaultLinkToolRender,
//   },
// };

// const plugins = [
//   Paragraph,
//   HeadingOne,
//   HeadingTwo,
//   HeadingThree,
//   Image,
//   Blockquote,
//   Callout,
//   Code,
//   Table,
//   Divider,
//   NumberedList,
//   BulletedList,
//   TodoList,
// ];

// interface MarkdownEditorProps {
//   editorValue: string;
//   setEditorValue: (editorValue: string)=>void;
// }

// export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
//   editorValue,
//   setEditorValue
// }) => {
//   const editor = useMemo(() => createYooptaEditor(), []);
  
//   const editorData = editor?.getEditorValue();
//   const parsedEditorValue = editorValue &&  JSON.parse(editorValue) || undefined;
//   const getEditorData = () => {
//     const data = editor.getEditorValue();
//     const dataInJSON = JSON.stringify(data);
//     setEditorValue(dataInJSON);
//     console.log(dataInJSON);
//   }


//   const debouncedGetEditorData = useCallback(() => {
//     alert("");
//     const timeoutId = setTimeout(() => {
//       getEditorData();
//     }, 2000); // 2 seconds debounce

//     Cleanup function to clear timeout
//     return () => {
//       clearTimeout(timeoutId);
//     };
//   }, [editorData]); // Depends on `editor`, or you can pass other dependencies as required

//   useEffect(() => {
//     const cleanUp = debouncedGetEditorData();

//     return () => {
//       cleanUp(); // Clear any pending debounced call on unmount or re-render
//     };
//   }, [debouncedGetEditorData]);

//   return (
//     <div className="border border-default-300 rounded-md">
//       <YooptaEditor
//         placeholder="What's on your mind, write here..."
//         editor={editor}
//         plugins={plugins}
//         tools={TOOLS}
//         marks={MARKS}
//         value={editorValue}
//         style={{
//           width: "100%",
//           height: "100%",
//           margin: "auto",
//         }}
//         className="sm:min-h-[35vh] md:min-h-[55vh]"
//       />
//     </div>
//   );
// };


"use client";
import React, { useEffect, useMemo, useCallback } from "react";
import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import Paragraph from "@yoopta/paragraph";
import { HeadingOne, HeadingTwo, HeadingThree } from "@yoopta/headings";
import Image from "@yoopta/image";
import Blockquote from "@yoopta/blockquote";
import Callout from "@yoopta/callout";
import Code from "@yoopta/code";
import Table from "@yoopta/table";
import Divider from "@yoopta/divider";
import { NumberedList, BulletedList, TodoList } from "@yoopta/lists";
import Accordion from "@yoopta/accordion";

import LinkTool, { DefaultLinkToolRender } from "@yoopta/link-tool";
import ActionMenu, { DefaultActionMenuRender } from "@yoopta/action-menu-list";
import Toolbar, { DefaultToolbarRender } from "@yoopta/toolbar";

import {
  Bold,
  Italic,
  CodeMark,
  Underline,
  Strike,
  Highlight,
} from "@yoopta/marks";

const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

const TOOLS = {
  Toolbar: {
    tool: Toolbar,
    render: DefaultToolbarRender,
  },
  ActionMenu: {
    tool: ActionMenu,
    render: DefaultActionMenuRender,
  },
  LinkTool: {
    tool: LinkTool,
    render: DefaultLinkToolRender,
  },
};

const plugins = [
  Paragraph,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Image,
  Blockquote,
  Callout,
  Code,
  Table,
  Divider,
  NumberedList,
  BulletedList,
  TodoList,
];

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange
}) => {
  const editor = useMemo(() => createYooptaEditor(), []);
  
  useEffect(() => {
    if (value) {
      try {
        const parsedValue = JSON.parse(value);
        // editor.setContent(parsedValue);
      } catch (error) {
        console.error("Failed to parse editor value:", error);
      }
    }
  }, [editor, value]);

  const handleEditorChange = useCallback(() => {
    const data = editor.getEditorValue();
    const dataInJSON = JSON.stringify(data);
    onChange(dataInJSON);
  }, [editor, onChange]);

  useEffect(() => {
    const unsubscribe = editor.on('change', handleEditorChange);
    return () => {
      //unsubscribe();
    };
  }, [editor, handleEditorChange]);

  return (
    <div className="border border-default-300 rounded-md">
      <YooptaEditor
        placeholder="What's on your mind, write here..."
        editor={editor}
        plugins={plugins}
        tools={TOOLS}
        marks={MARKS}
        style={{
          width: "100%",
          height: "100%",
          margin: "auto",
        }}
        className="sm:min-h-[35vh] md:min-h-[55vh]"
      />
    </div>
  );
};