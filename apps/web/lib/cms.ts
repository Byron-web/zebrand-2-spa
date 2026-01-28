type StrapiListResponse<T> = {
  data: T[];
  meta?: any;
};

type Page = {
  id: number;
  title: string;
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
  sections?: any;
};

function cmsUrl(path: string) {
  const base = process.env.CMS_URL;
  if (!base) throw new Error("CMS_URL is not set. Check .env.local");
  return `${base}${path}`;
}

export async function getPages(): Promise<Page[]> {
  const res = await fetch(cmsUrl("/api/pages"), {
    // This keeps it fast and allows revalidation later
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch pages: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as StrapiListResponse<Page>;
  return json.data;
}

export async function getPageBySlug(slug: string) {
  const base = process.env.CMS_URL;
  if (!base) throw new Error("CMS_URL is not set. Check .env.local");

  const res = await fetch(
    `${base}/api/pages?filters[slug][$eq]=${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch page: ${slug} (${res.status})`);
  }

  const json = await res.json();
  return json.data[0] ?? null;
}
