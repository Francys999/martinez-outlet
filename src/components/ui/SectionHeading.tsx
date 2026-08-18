interface SectionHeadingProps {
  /** Texto pequeño sobre el título. */
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col ${alignment} gap-3`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-lila-200 bg-lila-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-lila-700">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-balance text-ink sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p
          className={`max-w-2xl text-base text-pretty text-ink-soft ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
