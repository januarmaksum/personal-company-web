import { notFound } from "next/navigation";

import { ClientWrapper } from "@/components/ClientWrapper";

interface PageProps {
  params: Promise<{
    domain: string;
    slug: string;
  }>;
  searchParams: Promise<{
    editmode?: string;
  }>;
}

export default async function TenantPage({ params, searchParams }: PageProps) {
  const { domain, slug } = await params;
  const { editmode } = await searchParams;
  const isEditMode = editmode === "true";

  // Fetch page data from mock server
  let pageData;
  try {
    const res = await fetch(
      `http://localhost:3001/pages?domain=${domain}&slug=${slug}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch page data");
    }

    const pages = await res.json();
    pageData = pages[0];
  } catch (error) {
    console.error("Error fetching page data:", error);
    return (
      <div className="flex min-h-screen items-center justify-center bg-red-50 p-8 text-red-600">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold">Internal Server Error</h1>
          <p>Please make sure the mock server is running on port 3001.</p>
          <code className="mt-4 block rounded bg-red-100 p-2 text-sm">
            npm run mock
          </code>
        </div>
      </div>
    );
  }

  if (!pageData) {
    return notFound();
  }

  return <ClientWrapper initialData={pageData} editMode={isEditMode} />;
}
