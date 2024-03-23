import RSS from "rss";
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

export async function GET() {
  const feed = new RSS({
    title: "manitun",
    description:
      "مرحبًا بكم في منصة مانيتون، الوجهة المثالية للكتّاب والمبدعين، حيث يمكنكم نشر أفكاركم وإبداعاتكم بكل سهولة وتواصل مع جمهوركم بطريقة مميزة",
    generator: "RSS for manitun",
    feed_url: "https://manitun.vercel.app/feed.xml",
    site_url: "https://manitun.vercel.app",
    managingEditor: "help@manitun.com (manitun.com)",
    webMaster: "help@manitun.com (manitun.com)",
    copyright: `Copyright ${new Date().getFullYear().toString()}, manitun.com`,
    language: "ar-EG",
    pubDate: new Date().toUTCString(),
    ttl: 60,
  });

  const allPosts = await getAllArticles();

  if (allPosts) {
    allPosts.map((post) => {
      feed.item({
        title: post.title,
        description: post.description,
        url: `https://www.davegray.codes/story/${post.id}`,
        categories: post.tags || [],
        author: post.authorId,
        date: post.updatedAt || post.createdAt,
      });
    });
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}