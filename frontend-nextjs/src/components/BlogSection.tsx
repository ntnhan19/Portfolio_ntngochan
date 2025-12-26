import { motion } from 'framer-motion';
import { BookOpen, Calendar, Tag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  summary: string;
  cover_image: string;
  tags: string;
  date: string;
}

export default function BlogSection({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto mb-32 relative z-10">
      <div className="flex items-center mb-12">
        <h2 className="text-3xl font-bold mr-4 flex items-center">
          <BookOpen className="mr-3 text-green-500" /> Latest Blog Posts
        </h2>
        <div className="h-px bg-gray-800 flex-grow"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {posts.slice(0, 4).map((post, idx) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group bg-gray-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-green-500/30 transition-all hover:-translate-y-1"
          >
            {/* Cover Image */}
            <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-green-900 to-gray-900">
              {post.cover_image ? (
                <Image
                  src={post.cover_image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <BookOpen className="text-white/20 w-16 h-16" />
                </div>
              )}
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Meta info */}
              <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {post.date}
                </span>
                {post.tags && (
                  <span className="flex items-center gap-1">
                    <Tag size={14} />
                    {post.tags.split(',')[0].trim()}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors line-clamp-2">
                {post.title}
              </h3>

              {/* Summary */}
              <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                {post.summary}
              </p>

              {/* Read more link */}
              <Link
                href={`/blog/${post.id}`}
                className="inline-flex items-center text-green-400 hover:text-green-300 text-sm font-medium group/link"
              >
                Đọc thêm
                <ArrowRight size={16} className="ml-2 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      {/* View all button */}
      {posts.length > 4 && (
        <div className="text-center mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full transition-all hover:scale-105"
          >
            Xem tất cả bài viết
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      )}
    </section>
  );
}