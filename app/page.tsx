"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type News = {
  id: number;
  title: string;
  slug: string;
  content: string;
  cover_image_url: string | null;
  tags: string[] | null;
  published_at: string | null;
  created_at: string;
};

export default function Home() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("published_at", { ascending: false, nullsFirst: false });

      if (error) setError(error.message);
      else setNews(data ?? []);

      setLoading(false);
    };

    load();
  }, []);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">News</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      <div className="space-y-4">
        {news.map((n) => (
          <article key={n.id} className="border rounded-xl p-4">
            <h2 className="text-xl font-semibold">{n.title}</h2>
            <p className="text-sm text-gray-500">{n.slug}</p>
            <p className="mt-2">{n.content}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
