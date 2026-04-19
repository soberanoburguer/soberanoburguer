import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({ badge, title, description, align = "center" }: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 md:mb-16", align === "center" ? "text-center" : "text-center md:text-left")}>
      <span className="text-brand-amber uppercase tracking-[0.2em] text-xs font-black mb-4 block">
        // {badge}
      </span>
      <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
        {title.split(" ").map((word, i) => (
          word.toLowerCase() === "soberano" || word.toLowerCase() === "premium" ? 
          <span key={i} className="text-soberano-gradient"> {word} </span> : 
          <span key={i}> {word} </span>
        ))}
      </h2>
      {description && (
        <p className={cn("text-foreground/60 text-lg max-w-2xl", align === "center" ? "mx-auto" : "mx-auto md:mx-0")}>
          {description}
        </p>
      )}
    </div>
  );
}
