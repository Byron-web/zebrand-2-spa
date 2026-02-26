import type { Metadata } from "next";
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

type Section = Record<string, unknown> & {
  type?: string;
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

    // Strapi v4 style: { id, attributes: { ... } }
    if (first && "attributes" in first) {
      const v4 = d as Array<StrapiV4Item<PageRecord>>;
      return v4
        .map((it) => ({
          id: it.id,
          ...(it.attributes || {}),
        }))
        .filter((it) => typeof it.id === "number");
    }

    // Strapi v5 flat style
    return (d as PageRecord[]).filter((it) => typeof it?.id === "number");
  }

  return [];
}

function isPromiseLike<T>(value: unknown): value is Promise<T> {
  if (!value) return false;
  if (typeof value !== "object" && typeof value !== "function") return false;
  return "then" in (value as Record<string, unknown>);
}

async function resolveParams(
  input: RouteParams | Promise<RouteParams>
): Promise<RouteParams> {
  if (isPromiseLike<RouteParams>(input)) {
    const resolved = await input;
    return (resolved || {}) as RouteParams;
  }
  return input || {};
}

function toSectionsArray(value: unknown): Section[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((x) => typeof x === "object" && x !== null)
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

export async function generateMetadata({
  params,
}: {
  params: RouteParams | Promise<RouteParams>;
}): Promise<Metadata> {
  const p = await resolveParams(params);
  const page = await fetchPageBySlug(p.slug);
  if (!page) return {};

  const title = page.seoTitle || page.title || undefined;
  const description = page.seoDescription || undefined;

  return {
    title,
    description,
  };
}

/* ============================
   Page
============================ */

export default async function Page({
  params,
}: {
  params: RouteParams | Promise<RouteParams>;
}) {
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
      <main className="z-section" aria-label="Debug not found">
        <div className="z-container">
          <div className="z-section-head">
            <h1 className="z-h2">Page not found (dev mode)</h1>
            <p className="z-lede">
              Requested slug: <strong>{slug ?? "(missing)"}</strong>
            </p>
          </div>

          <div className="z-two-cards">
            <div className="z-card-soft z-card-pad">
              <h2 className="z-h3">Route params</h2>
              <pre
                className="z-small"
                style={{
                  marginTop: 12,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {safeJsonStringify(p)}
              </pre>
            </div>

            <div className="z-card-soft z-card-pad">
              <h2 className="z-h3">Strapi API check</h2>

              <p className="z-small" style={{ marginTop: 10 }}>
                URL: <strong>{dbg.url}</strong>
              </p>

              <p className="z-small" style={{ marginTop: 8 }}>
                HTTP:{" "}
                <strong>
                  {dbg.status} {dbg.statusText}
                </strong>
              </p>

              <pre
                className="z-small"
                style={{
                  marginTop: 12,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {dbg.bodyExcerpt || "(empty response body)"}
              </pre>
            </div>
          </div>

          <div className="z-card z-card-pad" style={{ marginTop: 22 }}>
            <h2 className="z-h3">Available pages (from Strapi)</h2>

            {available.length === 0 ? (
              <p className="z-small" style={{ marginTop: 10 }}>
                No pages returned.
              </p>
            ) : (
              <ul style={{ marginTop: 12, paddingLeft: 18 }}>
                {available.map((x) => (
                  <li key={x.slug} style={{ marginTop: 8 }}>
                    <span style={{ marginRight: 10 }}>
                      {x.title || "(untitled)"}
                    </span>
                    <Link href={`/${x.slug}`} style={{ textDecoration: "underline" }}>
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

  const baseSections = toSectionsArray(page.sections);

  const homeExtras: Section[] =
    String(page.slug || "").toLowerCase() === "home"
      ? [
          { type: "socialProof" },
          { type: "testimonials" },
          { type: "faq" },
          { type: "finalCta" },
        ]
      : [];

  return (
    <main>
      <SectionRenderer sections={[...baseSections, ...homeExtras]} />
    </main>
  );
}
