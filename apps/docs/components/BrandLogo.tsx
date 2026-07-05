import Image from 'next/image';
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
  const inner = (
    <>
      <Image
        src="/logo.png"
        alt=""
        width={size}
        height={size}
        priority={size >= 64}
        className="brandLogoImg"
      />
      {showWordmark && <span className="brandWordmark">Sketchpad UI</span>}
    </>
  );

  if (!asLink) {
    return <span className={`brandLogo ${className ?? ''}`}>{inner}</span>;
  }

  return (
    <Link href="/" className={`brandLogo ${className ?? ''}`}>
      {inner}
    </Link>
  );
}
