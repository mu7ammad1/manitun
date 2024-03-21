import MyComponent_TAg from "./taag";

export default function TagPage({ params }: { params: { slug: string } }) {
  return <MyComponent_TAg params={params.slug} />;
}