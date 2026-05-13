export function SpecialtyGlyph({
  name,
  className = "h-6 w-6",
}: {
  name: string;
  className?: string;
}) {
  const stroke = "currentColor";
  const sw = 1.35;
  switch (name) {
    case "stethoscope":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 11a4 4 0 108 0V6a2 2 0 10-4 0v5M9 15v3a3 3 0 003 3h0a3 3 0 003-3v-1"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
          />
          <circle cx="18" cy="9" r="3" stroke={stroke} strokeWidth={sw} />
        </svg>
      );
    case "child":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="7" r="3" stroke={stroke} strokeWidth={sw} />
          <path
            d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2M9 12h6"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
          />
        </svg>
      );
    case "bone":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M8 8l8 8M9 9a2 2 0 110-4 2 2 0 010 4zm6 10a2 2 0 104 0 2 2 0 00-4 0zM15 15a2 2 0 114 0 2 2 0 01-4 0zM5 5a2 2 0 100 4 2 2 0 000-4z"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "tooth":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 3c2 0 3.5 1.2 4 3 .5-1.8 2-3 4-3 2.2 0 4 1.5 4 4 0 3-2 6-3 10-.8 2.5-2 5-5 5s-4.2-2.5-5-5C10 13 8 10 8 7c0-2.5 1.8-4 4-4z"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinejoin="round"
          />
        </svg>
      );
    case "heart":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 21s-7-4.35-7-10a4.5 4.5 0 019-1.5A4.5 4.5 0 0119 11c0 5.65-7 10-7 10z"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinejoin="round"
          />
        </svg>
      );
    case "flower":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="2.5" stroke={stroke} strokeWidth={sw} />
          <path
            d="M12 8V4M12 20v-4M8 12H4M20 12h-4M9.17 9.17L6.34 6.34M17.66 17.66l-2.83-2.83M14.83 9.17l2.83-2.83M6.34 17.66l2.83-2.83"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
          />
        </svg>
      );
    case "brain":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M10 5c-2 1-3 3-3 5-2 .5-3 2-3 4a4 4 0 004 4h1M14 5c2 1 3 3 3 5 2 .5 3 2 3 4a4 4 0 01-4 4h-1M9 18c1 2 2 3 3 3s2-1 3-3"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "apple":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M14.5 3c-.5 2-2 3.5-4 4-1-1.5-3-2.5-5-2 .2 2.5 1.5 5 4 7-1 3-3 6-2 8 1 2 4 1.5 6 0s4-2 5-4c-2-1-3.5-3-4-5 2-1.5 3.5-4 4-8z"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinejoin="round"
          />
          <path d="M12 7v3" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth={sw} />
        </svg>
      );
  }
}
