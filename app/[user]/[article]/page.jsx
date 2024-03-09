/* eslint-disable @next/next/no-img-element */
import React from "react";

const jsonData = [
  {
    id: "6e50cb6d-2c69-4489-8b66-6a26e8e0f582",
    type: "heading",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
      level: 1,
    },
    content: [
      {
        type: "text",
        text: "heading h1",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "3c7305f4-0f7c-45e5-8732-c06c03abf2a9",
    type: "heading",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
      level: 2,
    },
    content: [
      {
        type: "text",
        text: "heading h2",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "3198a73a-338e-4883-b8bd-7e949929bf93",
    type: "heading",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
      level: 3,
    },
    content: [
      {
        type: "text",
        text: "heading h3",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "b819a7c6-a69c-4b3f-b651-8d832203eea3",
    type: "paragraph",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "paragraph",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "99db48d9-93ed-4b6a-88f2-52229747d7fe",
    type: "numberedListItem",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "list number",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "f7fdc05d-f2ac-4f43-a2d5-42d9937d98a6",
    type: "numberedListItem",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "list number",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "d3854d32-9741-4e2d-93ce-7225db5a5940",
    type: "numberedListItem",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "list number",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "6cf15e20-cbb7-4ab4-b546-2de426e41029",
    type: "numberedListItem",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "list number",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "2a1dc648-3fe3-40fd-b87e-e05475ef8776",
    type: "numberedListItem",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "list number",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "2815edb1-ad60-4cdf-a261-275b17bb49f1",
    type: "numberedListItem",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "list number",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "7e716e22-8228-4d55-9d4a-4b9901d1ba43",
    type: "numberedListItem",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "list number",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "ae6ba6aa-0546-4e1f-a6f2-38c8846beb2f",
    type: "numberedListItem",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "list number",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "a69c8b64-d97c-4813-bb5e-ca3fdc37a9cb",
    type: "numberedListItem",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "list number",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "5e1e6fc2-36ea-4ca9-a684-59cc29628e58",
    type: "numberedListItem",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "list number",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "bf4b953a-0a7a-4ba4-895e-b09d13e29f81",
    type: "bulletListItem",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "list dot",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "6e8f5025-16ec-46db-b4aa-0b4d96b7cee4",
    type: "bulletListItem",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "list dot",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "7bbe2759-3b22-4127-8ca3-6a8a7b23bb3e",
    type: "bulletListItem",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "list dot",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "064a902f-0faf-4449-ace9-e78ab6568b5b",
    type: "bulletListItem",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "list dot",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "c10b2c73-8224-47f9-ba7c-234300684b8b",
    type: "bulletListItem",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "list dot",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "4c8c0bcf-16e3-4274-aa2d-fa933b7b6b6c",
    type: "bulletListItem",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "list dot",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "cc3b0f39-d3a9-40a1-9b3e-e190c05926f8",
    type: "bulletListItem",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "list dot",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "a10f64a2-57e8-44b5-8f02-a4ed4d114186",
    type: "bulletListItem",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "list dot",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "260e8881-91ae-4f86-9b3c-40cc574f6bb5",
    type: "bulletListItem",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "list dot",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "1b3414c0-9cd2-4f1b-b96b-47658ae56155",
    type: "bulletListItem",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "list dot",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "deadb71c-658b-4677-9c9e-777e1f79b0cf",
    type: "bulletListItem",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "list dot",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "149b7de4-699e-4fce-b154-02e52948bfc7",
    type: "paragraph",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [],
    children: [],
  },
];

const Article = ({ params }) => {
  return (
    <main className="flex justify-center">
      <div className="mt-3 max-w-3xl border">
        {jsonData.map((item, index) => {
          if (item.type === "heading" && item.props.level === 1) {
            return (
              <h1 key={index} className="text-4xl text-blue-700">
                {item.content.map((contentItem) => (
                  <span key={contentItem.text} className="text-4xl text-blue-700 h111">{contentItem.text}</span>
                ))}
              </h1>
            );
          } else if (item.type === "paragraph") {
            return <p key={index}>{/* No content in paragraph */}</p>;
          }
          return null;
        })}
      </div>
    </main>
  );
};

export default Article;
