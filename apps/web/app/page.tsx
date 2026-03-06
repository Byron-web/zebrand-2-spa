import { notFound } from "next/navigation";
import SectionRenderer from "@/components/SectionRenderer";

type Page = {
  slug: string;
  sections?: unknown[];
};

async function getPages(): Promise<Page[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pages?populate=deep`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch pages");
  }

  const data = await res.json();

  return (data?.data ?? []).map((p: { slug: string; sections?: unknown[] }) => ({
    slug: p.slug,
    sections: p.sections ?? [],
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const pages = await getPages();

  const page = pages.find((p) => p.slug === params.slug);

  if (!page) {
    notFound();
  }

  const sections = page.sections ?? [];

  return <SectionRenderer sections={sections} />;
}