import { getPages } from "@/lib/cms";

export default async function HomePage() {
  const pages = await getPages();

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 32, fontWeight: 700 }}>Zebrand 2.0</h1>
      <p>Loaded from Strapi (CMS):</p>

      <ul style={{ marginTop: 12 }}>
        {pages.map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong> (slug: {p.slug})
          </li>
        ))}
      </ul>
    </main>
  );
}
