// components/MyDeskLogo.jsx
// Professional geometric "M" logo mark + MyDesk wordmark.
// Matches the modern SaaS styling in the design reference.

export default function MyDeskLogo({ size = 30, showText = true, className = '', textClassName = '' }) {
  return (
    <div className={`mydesk-logo-wrapper ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="mTealLeft" x1="4" y1="6" x2="20" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#087E8B" />
            <stop offset="100%" stopColor="#065F69" />
          </linearGradient>
          <linearGradient id="mTealRight" x1="36" y1="6" x2="20" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#55B8C1" />
            <stop offset="100%" stopColor="#087E8B" />
          </linearGradient>
          <linearGradient id="mCenterDiamond" x1="14" y1="8" x2="26" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#55B8C1" />
            <stop offset="100%" stopColor="#087E8B" />
          </linearGradient>
        </defs>

        {/* Left Wing / Chevron of M */}
        <path
          d="M7 8L16 19.5L12.5 24L5 14.5V8H7Z"
          fill="url(#mTealLeft)"
        />
        <path
          d="M7 8L16 19.5L13.5 23L5 32V25L10 18L5 11V8H7Z"
          fill="url(#mTealLeft)"
          opacity="0.95"
        />

        {/* Right Wing / Chevron of M */}
        <path
          d="M33 8L24 19.5L27.5 24L35 14.5V8H33Z"
          fill="url(#mTealRight)"
        />
        <path
          d="M33 8L24 19.5L26.5 23L35 32V25L30 18L35 11V8H33Z"
          fill="url(#mTealRight)"
          opacity="0.95"
        />

        {/* Dynamic Center Apex / Facet */}
        <path
          d="M20 12L25.5 19L20 26L14.5 19L20 12Z"
          fill="url(#mCenterDiamond)"
        />
        <path
          d="M20 12L25.5 19L20 22L16.5 17.5L20 12Z"
          fill="#55B8C1"
          opacity="0.7"
        />
      </svg>

      {showText && (
        <span className={`mydesk-logo-text ${textClassName}`} style={{ fontWeight: 800, fontSize: '1.28rem', letterSpacing: '-0.025em', color: 'var(--text-main)' }}>
          My<span style={{ color: 'var(--primary)' }}>Desk</span>
        </span>
      )}
    </div>
  );
}
