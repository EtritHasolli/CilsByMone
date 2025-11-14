import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import type { BlogPost } from '../../types/blog';

export function BlogIndexPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const response = await api.get<BlogPost[]>('/blog-posts');
      return response.data;
    },
  });

  const featured = data?.[0];
  const rest = data?.slice(1);

  return (
    <div className="space-y-16 pb-16">
      <section className="bg-white py-16">
        <div className="container">
          <span className="text-xs uppercase tracking-[0.4em] text-brand-dark">Lash Journal</span>
          <h1 className="mt-3 font-display text-4xl text-surface-dark">Moné’s Notes on Lash Artistry & Business</h1>
          <p className="mt-4 max-w-2xl text-sm text-surface-dark/70">
            Tutorials, retention science, trend forecasts, and pro business advice from inside our studio.
          </p>
        </div>
      </section>

      {featured && (
        <section className="container grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
          <article className="overflow-hidden rounded-3xl bg-white shadow-soft">
            {featured.featured_image && (
              <img
                src={`${featured.featured_image}?auto=format&fit=crop&w=1200&q=80`}
                alt={featured.title}
                className="h-80 w-full object-cover"
              />
            )}
            <div className="space-y-4 p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-dark">
                {featured.published_at ? new Date(featured.published_at).toLocaleDateString() : 'Coming Soon'}
              </p>
              <h2 className="font-display text-3xl text-surface-dark">{featured.title}</h2>
              <p className="text-sm text-surface-dark/70">{featured.excerpt}</p>
              <Link
                to={`/blog/${featured.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-dark"
              >
                Read article →
              </Link>
            </div>
          </article>

          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-dark">Latest Articles</h3>
            <div className="space-y-4">
              {/* {rest?.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-soft transition hover:-translate-y-1"
                >
                  {post.featured_image && (
                    <img
                      src={`${post.featured_image}?auto=format&fit=crop&w=200&q=80`}
                      alt={post.title}
                      className="h-16 w-16 rounded-xl object-cover"
                    />
                  )}
                  <div>
                    <p className="text-xs uppercase tracking-wide text-surface-dark/50">
                      {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Soon'}
                    </p>
                    <h4 className="mt-1 font-semibold text-surface-dark">{post.title}</h4>
                    <p className="mt-1 text-xs text-surface-dark/60 line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              ))} */}
              {isLoading && <p className="text-sm text-surface-dark/60">Loading articles…</p>}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

