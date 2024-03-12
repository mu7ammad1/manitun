"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

function MyComponent({ params }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://manitun.vercel.app/api/article/${params.slug}`
        );
        setData(response.data);
      } catch (error) {
        console.error("حدث خطأ أثناء جلب البيانات:", error);
      }
    }

    fetchData();
  }, [params.slug]);
console.log(data);
  return (
    <div>
      {data ? (
        <div>
          {/* <code>
            <pre>{JSON.stringify(data)}</pre>
          </code> */}
          
          <h2>{data.title}</h2>
          <p>Image: {data.image}</p>
          {data.content && (
            <ul>
              {data.content.map((item) => (
                <li key={item.id}>
                  <p>Type: {item.type}</p>
                  {item.content && item.content[0] && (
                    <p>Text: {item.content[0].text}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p>جارٍ تحميل البيانات...</p>
      )}
    </div>
  );
}

export default MyComponent;
