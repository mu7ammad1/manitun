// getallarticles.ts

// Import fetch from 'node-fetch' if you're running this in a Node.js environment
// import fetch from 'node-fetch';

// Or if you're running this in a browser environment, you can directly use fetch

export const getAllArticles = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const articles = await response.json();
    console.log(articles);
    return articles;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

// Uncomment the line below if you're using this in a Node.js environment
// getAllArticles();
