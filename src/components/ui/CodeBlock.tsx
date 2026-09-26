import { cn } from "@/lib/cn";

export type CodeLang = "json" | "js" | "bash" | "text";
type TokenType = "plain" | "key" | "string" | "number" | "keyword" | "comment" | "punct" | "flag";

interface Token {
  type: TokenType;
  value: string;
}

const KEYWORDS = /\b(?:const|let|await|async|new|return|import|from|export|function|true|false|null|curl)\b/;

function patternFor(lang: CodeLang): RegExp | null {
  if (lang === "text") return null;
  const parts: string[] = [];
  if (lang === "js") parts.push(`(?<comment>\\/\\/[^\\n]*)`);
  if (lang === "bash") parts.push(`(?<comment>(?:^|(?<=\\s))#[^\\n]*)`);
  parts.push(`(?<key>"(?:\\\\.|[^"\\\\])*"(?=\\s*:))`);
  parts.push(`(?<string>"(?:\\\\.|[^"\\\\])*"|'(?:\\\\.|[^'\\\\])*'|\`(?:\\\\.|[^\`\\\\])*\`)`);
  if (lang === "bash") parts.push(`(?<flag>(?<=\\s)-{1,2}[A-Za-z][A-Za-z-]*)`);
  parts.push(`(?<number>\\b\\d+(?:\\.\\d+)?\\b)`);
  parts.push(`(?<keyword>${KEYWORDS.source})`);
  parts.push(lang === "bash" ? `(?<punct>[{}\\[\\]();])` : `(?<punct>[{}\\[\\](),:;])`);
  return new RegExp(parts.join("|"), "gm");
}

export function tokenize(code: string, lang: CodeLang): Token[] {
  const pattern = patternFor(lang);
  if (!pattern) return [{ type: "plain", value: code }];
  const tokens: Token[] = [];
  let last = 0;
  for (const match of code.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) tokens.push({ type: "plain", value: code.slice(last, index) });
    const groups = match.groups ?? {};
    const type = (Object.keys(groups).find((name) => groups[name] !== undefined) ?? "plain") as TokenType;
    tokens.push({ type, value: match[0] });
    last = index + match[0].length;
  }
  if (last < code.length) tokens.push({ type: "plain", value: code.slice(last) });
  return tokens;
}

const themes: Record<"dark" | "light", Record<TokenType, string>> = {
  dark: {
    plain: "text-slate-200",
    key: "text-[#93C5FD]",
    string: "text-[#A5F3FC]",
    number: "text-[#FCD34D]",
    keyword: "text-[#C4B5FD]",
    comment: "text-slate-500",
    punct: "text-slate-500",
    flag: "text-[#93C5FD]",
  },
  light: {
    plain: "text-slate-700",
    key: "text-brand-700",
    string: "text-accent-700",
    number: "text-amber-700",
    keyword: "text-violet-700",
    comment: "text-slate-400",
    punct: "text-slate-400",
    flag: "text-brand-700",
  },
};

export function HighlightedCode({ code, lang, theme = "dark" }: { code: string; lang: CodeLang; theme?: "dark" | "light" }) {
  return (
    <>
      {tokenize(code, lang).map((token, i) => (
        <span key={i} className={themes[theme][token.type]}>
          {token.value}
        </span>
      ))}
    </>
  );
}

interface CodeBlockProps {
  code: string;
  lang: CodeLang;
  filename?: string;
  theme?: "dark" | "light";
  headerRight?: React.ReactNode;
  className?: string;
  preClassName?: string;
}

export function CodeBlock({ code, lang, filename, theme = "dark", headerRight, className, preClassName }: CodeBlockProps) {
  const dark = theme === "dark";
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl",
        dark ? "bg-ink ring-1 ring-white/10" : "bg-white ring-1 ring-line shadow-card",
        className,
      )}
    >
      {filename || headerRight ? (
        <div
          className={cn(
            "flex min-h-10 flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b px-4 py-2",
            dark ? "border-white/10 bg-white/[0.02]" : "border-line bg-subtle",
          )}
        >
          <span className={cn("min-w-0 font-mono text-xs [overflow-wrap:anywhere]", dark ? "text-slate-400" : "text-muted")}>{filename}</span>
          {headerRight}
        </div>
      ) : null}
      {/* Wrap on phones so long lines stay readable instead of hiding behind a horizontal scroll. */}
      <pre
        className={cn(
          "scrollbar-thin overflow-x-auto p-4 font-mono text-[12px] leading-6 whitespace-pre-wrap [overflow-wrap:anywhere] sm:p-5 sm:text-[13px] sm:whitespace-pre sm:[overflow-wrap:normal]",
          preClassName,
        )}
        tabIndex={0}
      >
        <code>
          <HighlightedCode code={code} lang={lang} theme={theme} />
        </code>
      </pre>
    </div>
  );
}
