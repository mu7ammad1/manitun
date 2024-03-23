export const getAllArticles = async () => {
  try {
    const response = await fetch("https://manitun.vercel.app/api/article", {
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // Extracting the 'data' array from the response
    const articles = data.data;
    return articles;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return []; // Return an empty array in case of error
  }
};

export default async function Sitemap() {
  try {
    const allArticles = await getAllArticles();

    const articles = allArticles.map((article) => {
      return {
        url: `https://manitun.vercel.app/story/${article.id}`,
        lastModified: article.createdAt, // You can set the lastModified date here
        changeFrequency: `weekly`,
        priority: 0.7,
      };
    });

    return [
      {
        url: "https://manitun.vercel.app",
        lastModified: new Date(),
        changeFrequency: `daily`,
        priority: 1,
      },
      ...articles,
    ];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return []; // Return an empty array in case of error
  }
}
