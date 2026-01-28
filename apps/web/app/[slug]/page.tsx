import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/cms";
import SectionRenderer from "../../components/SectionRenderer";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;

  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <main style={{ fontFamily: "system-ui" }}>
      <SectionRenderer sections={page.sections ?? null} />
    </main>
  );
}
