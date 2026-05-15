import type { Core } from '@strapi/strapi';

type BlogRecord = {
  id: number;
  title?: string | null;
  slug?: string | null;
};

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/['\u2019]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');

const buildUniqueSlug = (title: string, takenSlugs: Set<string>): string => {
  const baseSlug = slugify(title) || 'blog';

  if (!takenSlugs.has(baseSlug)) {
    return baseSlug;
  }

  let suffix = 2;
  let candidate = `${baseSlug}-${suffix}`;

  while (takenSlugs.has(candidate)) {
    suffix += 1;
    candidate = `${baseSlug}-${suffix}`;
  }

  return candidate;
};

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const blogQuery = strapi.db.query('api::blog.blog');
    const blogs = (await blogQuery.findMany({
      select: ['id', 'title', 'slug'],
    })) as BlogRecord[];

    const takenSlugs = new Set(
      blogs
        .map((blog) => blog.slug?.trim())
        .filter((slug): slug is string => Boolean(slug))
    );

    for (const blog of blogs) {
      if (blog.slug?.trim() || !blog.title?.trim()) {
        continue;
      }

      const slug = buildUniqueSlug(blog.title, takenSlugs);

      await blogQuery.update({
        where: { id: blog.id },
        data: { slug },
      });

      takenSlugs.add(slug);
      strapi.log.info(`Backfilled blog slug "${slug}" for blog ID ${blog.id}.`);
    }
  },
};
