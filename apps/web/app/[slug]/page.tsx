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

type RouteParams = {
  slug?: string | string[];
};

type Section = {
  type?: string;
  [key: string]: unknown;
};

function getStrapiUrl(): string {
  return process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
}

function normaliseSlug(input: unknown): string | null {
  if (typeof input === "string") {
    const s = input.trim();
    return s.length > 0 ? s : null;
  }

  if (Array.isArray(input) && typeof input[0] === "string") {
    const s = input[0].trim();
    return s.length > 0 ? s : null;
  }

  return null;
}

function isPromiseLike<T>(value: unknown): value is Promise<T> {
  if (!value) return false;
  if (typeof value !== "object" && typeof value !== "function") return false;
  return "then" in value;
}

async function resolveParams(input: RouteParams | Promise<RouteParams>): Promise<RouteParams> {
  if (isPromiseLike<RouteParams>(input)) {
    const resolved = await input;
    return resolved || {};
  }

  return input || {};
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

async function fetchPageBySlug(slugInput: unknown): Promise<PageRecord | null> {
  const slug = normaliseSlug(slugInput);

  if (!slug) {
    return null;
  }

  const pages = await fetchAllPages();
  const wanted = slug.toLowerCase();

  const match = pages.find((p) => {
    const s = String(p.slug || "").trim().toLowerCase();
    return s === wanted;
  });

  return match || null;
}

export async function generateMetadata({ params }: { params: RouteParams | Promise<RouteParams> }) {
  const p = await resolveParams(params);
  const page = await fetchPageBySlug(p.slug);

  if (!page) {
    return {};
  }

  return {
    title: page.seoTitle || page.title || undefined,
    description: page.seoDescription || undefined,
  };
}

export default async function Page({ params }: { params: RouteParams | Promise<RouteParams> }) {
  const p = await resolveParams(params);
  const page = await fetchPageBySlug(p.slug);

  if (!page) {
    notFound();
  }

  const sections = normaliseSections(page.sections);

  return <SectionRenderer sections={sections} />;
}