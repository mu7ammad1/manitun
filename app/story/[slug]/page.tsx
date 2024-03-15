"use client";
/* eslint-disable @next/next/no-img-element */
import Elements from "./Elements.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface ArticleProps {
  id: string;
  title: string;
  description: string;
  image: string;
  content: {
    id: string;
    type: string;
    props: {
      textColor?: string;
      textAlignment?: string;
      backgroundColor?: string;
      level?: number;
    };
    content: {
      text: string;
      styles: {
        bold?: boolean;
        italic?: boolean;
        underline?: boolean;
        strike?: boolean;
        textColor?: string;
        backgroundColor?: string;
      };
    }[];
  }[];
  authorId: string;
  createdAt: string;
  updatedAt: string;
  draft: boolean;
  tags: string[];
}

interface Props {
  params: { slug: string };
}

const MyComponent: React.FC<Props> = ({ params }) => {
  const [article, setArticle] = useState<ArticleProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ArticleProps>(
          `https://manitun.vercel.app/api/article/${params.slug}`
        );
        setArticle(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.slug]);
  console.log(article);

  return (
    <article className="flex max-w-3xl justify-center items-center">
      <div className="w-full border border-solid border-spacing-1 p-4">
        {article ? (
          <div>
            <h2 className="text-6xl font-bold mb-5">{article.title}</h2>
            {article.content.map((item) => {
              const TextAlign = item.props.textAlignment || "left";
              const TextAlignClass =
                TextAlign === "left"
                  ? Elements.TextAlignLeft
                  : TextAlign === "center"
                  ? Elements.TextAlignCenter
                  : Elements.TextAlignRight;

              const headingLevel = item.props.level || 1;
              const headingSizeClass =
                headingLevel === 1
                  ? Elements.text7xl
                  : headingLevel === 2
                  ? Elements.text4xl
                  : Elements.textxl;

              switch (item.type) {
                case "heading":
                  const styles = item.content[0].styles;
                  const textColorClass = styles.textColor
                    ? Elements[`textColor${styles.textColor}`] + "asfff"
                    : "";
                  const backgroundColorClass = styles.backgroundColor
                    ? Elements[`backgroundColor${styles.backgroundColor}`]
                    : "";
                  const fontWeightClass = styles.bold ? "font-bold" : "";
                  const fontStyleClass = styles.italic ? "italic" : "";
                  const textDecorationClass = styles.underline
                    ? "underline"
                    : styles.strike
                    ? "line-through"
                    : "";
                  return (
                    <h1
                      key={item.id}
                      className={`${headingSizeClass} ${TextAlignClass} ${textColorClass} ${backgroundColorClass} ${fontWeightClass} ${fontStyleClass} ${textDecorationClass} mt-4 mb-2`}
                    >
                      {item.content[0].text || "No text"}
                    </h1>
                  );
                case "paragraph":
                  const paragraphClass = `text-${
                    item.props.textColor || "default"
                  }`;
                  const paragraphTextAlignClass =
                    TextAlign === "center"
                      ? "text-center"
                      : TextAlign === "right"
                      ? "text-right"
                      : "text-left";
                  return (
                    <p
                      key={item.id}
                      className={`${paragraphClass} ${paragraphTextAlignClass} mb-4`}
                    >
                      {item.content
                        .map((contentItem) => contentItem.text)
                        .join("") || "No text"}
                    </p>
                  );
                default:
                  return null;
              }
            })}
          </div>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </article>
  );
};

export default MyComponent;
