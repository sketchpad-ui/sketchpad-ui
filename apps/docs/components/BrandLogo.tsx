import Link from 'next/link';

interface BrandLogoProps {
  size?: number;
  showWordmark?: boolean;
  className?: string;
  asLink?: boolean;
}

export function BrandLogo({
  size = 36,
  showWordmark = true,
  className,
  asLink = true,
}: BrandLogoProps) {
  const mark = (
    <>
      <span className="brandLogoMark" style={{ width: size, height: size }} aria-hidden="true">
        S
      </span>
      {showWordmark && <span className="brandWordmark">SKETCHPAD UI</span>}
    </>
  );

  if (!asLink) return <span className={`brandLogo ${className ?? ''}`}>{mark}</span>;
  return (
    <Link href="/" className={`brandLogo ${className ?? ''}`}>
      {mark}
    </Link>
  );
}
