import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import type { BlogPost } from '../../types/blog';
import { useMemo } from 'react';
import Markdown from 'react-markdown';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ['blog-post', slug],
    enabled: Boolean(slug),
    queryFn: async () => {
      const response = await api.get<BlogPost>(`/blog-posts/${slug}`);
      return response.data;
    },
  });

  const publishedDate = useMemo(
    () => (data?.published_at ? new Date(data.published_at).toLocaleDateString() : 'Draft'),
    [data?.published_at]
  );

  if (isLoading) {
    return (
      <div className="container py-16 text-sm text-surface-dark/60">Loading article…</div>
    );
  }

  if (!data) {
    return (
      <div className="container py-16">
        <p className="text-sm text-surface-dark/70">
          Article not found. Browse the <Link to="/blog" className="text-brand-dark underline">blog</Link> for the latest posts.
        </p>
      </div>
    );
  }

  return (
    <article className="pb-16">
      <div className="bg-white py-12">
        <div className="container space-y-4">
          <Link to="/blog" className="text-xs uppercase tracking-[0.3em] text-brand-dark">
            ← Back to articles
          </Link>
          <h1 className="font-display text-4xl text-surface-dark">{data.title}</h1>
          <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-surface-dark/50">
            <span>{publishedDate}</span>
            {data.author && (
              <>
                <span>•</span>
                <span>{data.author}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {data.featured_image && (
        <div className="container mt-8">
          <img
            src={`${data.featured_image}?auto=format&fit=crop&w=1400&q=80`}
            alt={data.title}
            className="w-full rounded-3xl object-cover shadow-soft"
          />
        </div>
      )}

      <div className="container prose prose-neutral mt-10 max-w-4xl prose-headings:font-display prose-headings:text-surface-dark prose-p:text-surface-dark/70">
        <Markdown>{data.content}</Markdown>
      </div>
    </article>
  );
}

