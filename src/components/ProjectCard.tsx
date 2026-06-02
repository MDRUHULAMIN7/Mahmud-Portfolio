import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  _id: string;
  title: string;
  category?: string;
  thumbnailImage?: string;
  posterImage?: string;
  isFeatured?: boolean;
  index?: number;
  showAnimation?: boolean;
}

export default function ProjectCard({
  _id,
  title,
  category,
  thumbnailImage,
  posterImage,
  isFeatured,
  index = 0,
  showAnimation = true,
}: ProjectCardProps) {
  const imageSrc = thumbnailImage || posterImage || '/photo2.png';

  const baseClasses = showAnimation
    ? "project reveal"
    : "project";

  const style = showAnimation
    ? { transitionDelay: `${Math.min(index, 5) * 0.08}s` }
    : undefined;

  return (
    <Link
      href={`/projects/${_id}`}
      className={baseClasses}
      style={style}
    >
      <div className="thumb">
        <Image
          src={imageSrc}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          loading="lazy"
        />
      </div>

      <div className="body">
        <div className="tag">
          {category || 'Project'}
          {isFeatured && (
            <span className="featured-badge" style={{ marginLeft: '8px', fontSize: '11px', color: 'var(--green-2)', fontWeight: 700 }}>
              Featured
            </span>
          )}
        </div>
        <h4>
          {title}
          <span className="arrow">&rarr;</span>
        </h4>
      </div>
    </Link>
  );
}
