import Link from "next/link";
import { notFound } from "next/navigation";
import SectionRenderer from "@/components/SectionRenderer";

/* ============================
   Types
============================ */

type PageRecord = {
  id: number;
  title?: string;
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
  sections?: unknown;
};

type StrapiV4Item<T> = {
  id: number;
  attributes?: T;
};

type StrapiResponse = {
  data?: unknown;
  error?: unknown;
};

type FetchDebug<T> = {
  ok: boolean;
  status: number;
  statusText: string;
  url: string;
  bodyExcerpt: string;
  items: Array<T>;
};

type RouteParams = {
  slug?: string | string[];
};

type Section = {
  type?: string;
  [key: string]: unknown;
};

/* ============================
   Helpers
============================ */

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

function safeJsonStringify(value: unknown): string {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function excerpt(text: string, max = 400): string {
  const t = (text || "").trim();
  if (t.length <= max) return t;
  return t.slice(0, max) + " ...";
}

function toPageRecords(parsed: StrapiResponse): PageRecord[] {
  const d = parsed?.data;

  if (Array.isArray(d)) {
    const first = d[0] as Record<string, unknown> | undefined;

    // Strapi v4: data: [{ id, attributes: {...} }]
    if (first && "attributes" in first) {
      const v4 = d as Array<StrapiV4Item<PageRecord>>;
      return v4
        .map((it) => ({
          id: it.id,
          ...(it.attributes || {}),
        }))
        .filter((it) => typeof it.id === "number");
    }

    // Strapi v5: data: [{ id, title, slug, sections, ... }]
    return (d as PageRecord[]).filter((it) => typeof it?.id === "number");
  }

  return [];
}

function isPromiseLike(value: unknown): value is Promise<unknown> {
  if (!value) return false;
  if (typeof value !== "object" && typeof value !== "function") return false;
  return "then" in (value as Record<string, unknown>);
}

async function resolveParams(input: RouteParams | Promise<RouteParams>): Promise<RouteParams> {
  if (isPromiseLike(input)) {
    const resolved = await input;
    return (resolved || {}) as RouteParams;
  }
  return input || {};
}

function normaliseSections(value: unknown): Section[] {
  if (!Array.isArray(value)) return [];
  return (value as unknown[])
    .filter((x) => x && typeof x === "object")
    .map((x) => x as Section);
}

/* ============================
   Strapi Fetch
============================ */

async function fetchAllPagesDebug(): Promise<FetchDebug<PageRecord>> {
  const base = getStrapiUrl();
  const url = `${base}/api/pages?pagination[pageSize]=100`;

  const res = await fetch(url, { cache: "no-store" });

  let raw = "";
  try {
    raw = await res.text();
  } catch {
    raw = "";
  }

  let parsed: StrapiResponse = {};
  try {
    parsed = JSON.parse(raw) as StrapiResponse;
  } catch {
    parsed = {};
  }

  const items = toPageRecords(parsed);

  return {
    ok: res.ok,
    status: res.status,
    statusText: res.statusText,
    url,
    bodyExcerpt: excerpt(raw, 600),
    items,
  };
}

async function fetchPageBySlug(slugInput: unknown): Promise<PageRecord | null> {
  const slug = normaliseSlug(slugInput);
  if (!slug) return null;

  const dbg = await fetchAllPagesDebug();
  const wanted = slug.toLowerCase();

  const match = dbg.items.find((p) => {
    const s = String(p.slug || "").trim().toLowerCase();
    return s === wanted;
  });

  return match || null;
}

/* ============================
   Metadata
============================ */

export async function generateMetadata({ params }: { params: RouteParams | Promise<RouteParams> }) {
  const p = await resolveParams(params);
  const page = await fetchPageBySlug(p.slug);
  if (!page) return {};

  return {
    title: page.seoTitle || page.title || undefined,
    description: page.seoDescription || undefined,
  };
}

/* ============================
   Page
============================ */

export default async function Page({ params }: { params: RouteParams | Promise<RouteParams> }) {
  const p = await resolveParams(params);
  const slug = normaliseSlug(p.slug);

  const dbg = await fetchAllPagesDebug();
  const page = await fetchPageBySlug(p.slug);

  if (!page) {
    const isDev = process.env.NODE_ENV !== "production";
    if (!isDev) notFound();

    const available = dbg.items
      .map((rec) => ({
        title: String(rec.title || "").trim(),
        slug: String(rec.slug || "").trim(),
      }))
      .filter((x) => x.slug.length > 0);

    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-14">
        <h1 className="text-2xl font-semibold">Page not found</h1>

        <div className="mt-6 grid gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Route params</h2>
            <p className="mt-2 text-sm text-white/80">
              Requested slug: <span className="font-semibold text-white">{slug ?? "(missing)"}</span>
            </p>
            <pre className="mt-4 overflow-auto rounded-xl border border-white/10 bg-black/40 p-4 text-xs text-white/80">
              {safeJsonStringify(p)}
            </pre>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Strapi API check</h2>

            <p className="mt-2 text-sm text-white/80">
              URL: <span className="font-semibold text-white">{dbg.url}</span>
            </p>

            <p className="mt-2 text-sm text-white/80">
              HTTP:{" "}
              <span className="font-semibold text-white">
                {dbg.status} {dbg.statusText}
              </span>
            </p>

            <pre className="mt-4 overflow-auto rounded-xl border border-white/10 bg-black/40 p-4 text-xs text-white/80">
              {dbg.bodyExcerpt || "(empty response body)"}
            </pre>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Available pages (from Strapi)</h2>

            {available.length === 0 ? (
              <p className="mt-3 text-sm text-white/70">No pages returned.</p>
            ) : (
              <ul className="mt-4 space-y-2 text-sm">
                {available.map((x) => (
                  <li key={x.slug} className="flex justify-between gap-4">
                    <span className="text-white/80">{x.title || "(untitled)"}</span>
                    <Link href={`/${x.slug}`} className="underline">
                      /{x.slug}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    );
  }

  const pageSlug = String(page.slug || "").trim().toLowerCase();

  const baseSections = normaliseSections(page.sections);

  const homeExtras: Section[] =
    pageSlug === "home"
      ? [{ type: "socialProof" }, { type: "testimonials" }, { type: "faq" }, { type: "finalCta" }]
      : [];

  const aboutExtras: Section[] =
    pageSlug === "about"
      ? [
          { type: "aboutHero" },
          { type: "aboutStory" },
          { type: "aboutValues" },
          { type: "aboutPrinciples" },
          { type: "faq" },
          { type: "finalCta" },
        ]
      : [];

  const servicesExtras: Section[] =
    pageSlug === "services"
      ? [
          { type: "servicesHero" },
          { type: "servicesPackages" },
          { type: "servicesProcess" },
          { type: "faq" },
          { type: "finalCta" },
        ]
      : [];

  return (
    <main>
      <SectionRenderer sections={[...baseSections, ...homeExtras, ...aboutExtras, ...servicesExtras]} />
    </main>
  );
}