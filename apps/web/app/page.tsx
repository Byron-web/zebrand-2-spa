import { notFound } from "next/navigation";
import SectionRenderer from "@/components/SectionRenderer";

type PageRecord = {
  id: number;
  title?: string;
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
  sections?: unknown;
};

type StrapiResponse = {
  data?: unknown;
};

type Section = {
  type?: string;
  [key: string]: unknown;
};

function getStrapiUrl(): string {
  return process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
}

function toPageRecords(parsed: StrapiResponse): PageRecord[] {
  const d = parsed?.data;

  if (!Array.isArray(d)) {
    return [];
  }

  return d.filter((item): item is PageRecord => {
    if (!item || typeof item !== "object") return false;
    const maybe = item as Record<string, unknown>;
    return typeof maybe.id === "number";
  });
}

function normaliseSections(value: unknown): Section[] {
  if (!Array.isArray(value)) return [];

  return value.filter((x): x is Section => {
    return !!x && typeof x === "object";
  });
}

async function fetchAllPages(): Promise<PageRecord[]> {
  const base = getStrapiUrl();
  const url = `${base}/api/pages?pagination[pageSize]=100`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch pages");
  }

  const parsed = (await res.json()) as StrapiResponse;
  return toPageRecords(parsed);
}

async function fetchHomePage(): Promise<PageRecord | null> {
  const pages = await fetchAllPages();

  const match = pages.find((p) => {
    const slug = String(p.slug || "").trim().toLowerCase();
    return slug === "home";
  });

  return match || null;
}

export async function generateMetadata() {
  const page = await fetchHomePage();

  if (!page) {
    return {};
  }

  return {
    title: page.seoTitle || page.title || undefined,
    description: page.seoDescription || undefined,
  };
}

export default async function Page() {
  const page = await fetchHomePage();

  if (!page) {
    notFound();
  }

  const sections = normaliseSections(page.sections);

  return <SectionRenderer sections={sections} />;
}