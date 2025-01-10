import { PageMeta, formatDate } from "@/lib/mdx";
import { cn } from "@/lib/utils";
import { Calendar, Tag, User } from "lucide-react";

interface MetaProps extends PageMeta {
  className?: string;
}

export function Meta({
  title,
  description,
  date,
  author,
  tags,
  className,
}: MetaProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="text-xl text-muted-foreground">{description}</p>
      )}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        {date && (
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={date}>{formatDate(date)}</time>
          </div>
        )}
        {author && (
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{author}</span>
          </div>
        )}
        {tags && tags.length > 0 && (
          <div className="flex items-center gap-1">
            <Tag className="h-4 w-4" />
            <div className="flex gap-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-muted px-2 py-1 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
