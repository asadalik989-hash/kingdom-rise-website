import React from 'react';

interface KRCLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const KRCLogo: React.FC<KRCLogoProps> = ({
  className = '',
  variant = 'light', // 'light' is white text for dark navbars, 'dark' is black text for light surfaces
  iconOnly = false,
  size = 'md',
}) => {
  // Height sizing
  const heightClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
    xl: 'h-20',
  }[size];

  const textColor = variant === 'dark' ? '#0B0F19' : '#FFFFFF';
  const taglineColor = variant === 'dark' ? '#111827' : '#E2E8F0';
  const lineColor = variant === 'dark' ? '#1E293B' : '#64748B';

  if (iconOnly) {
    return (
      <svg
        viewBox="0 0 250 250"
        className={`${heightClasses} w-auto shrink-0 drop-shadow-xs select-none ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="polyhedron">
          {/* Facets with dimensional blue gradient fills */}
          <polygon points="120,20 185,42 135,100" fill="#2B8FD9" />
          <polygon points="48,68 120,20 95,95" fill="#1E7DC5" />
          <polygon points="18,155 48,68 85,145" fill="#186BB0" />
          <polygon points="18,155 105,225 95,160" fill="#1560A0" />
          <polygon points="105,225 188,196 142,165" fill="#1A6EB4" />
          <polygon points="188,196 220,108 160,140" fill="#237DBF" />
          <polygon points="220,108 185,42 152,90" fill="#2D92DC" />
          <polygon points="95,95 120,20 135,100" fill="#329DE7" />
          <polygon points="85,145 48,68 95,95" fill="#2482CC" />
          <polygon points="95,160 18,155 85,145" fill="#1B6CAE" />
          <polygon points="95,160 105,225 142,165" fill="#2277BA" />
          <polygon points="95,95 135,100 142,165 85,145" fill="#2889D4" />
          <polygon points="135,100 152,90 160,140 142,165" fill="#349CE5" />
          <polygon points="152,90 185,42 220,108" fill="#2586D1" />
          <polygon points="142,165 160,140 188,196" fill="#1D72B8" />

          {/* White Structural Edge Struts / Webbing */}
          <g stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="120" y1="20" x2="185" y2="42" />
            <line x1="185" y1="42" x2="220" y2="108" />
            <line x1="220" y1="108" x2="188" y2="196" />
            <line x1="188" y1="196" x2="105" y2="225" />
            <line x1="105" y1="225" x2="18" y2="155" />
            <line x1="18" y1="155" x2="48" y2="68" />
            <line x1="48" y1="68" x2="120" y2="20" />
            <line x1="120" y1="20" x2="95" y2="95" />
            <line x1="120" y1="20" x2="135" y2="100" />
            <line x1="185" y1="42" x2="135" y2="100" />
            <line x1="185" y1="42" x2="152" y2="90" />
            <line x1="220" y1="108" x2="152" y2="90" />
            <line x1="220" y1="108" x2="160" y2="140" />
            <line x1="188" y1="196" x2="160" y2="140" />
            <line x1="188" y1="196" x2="142" y2="165" />
            <line x1="105" y1="225" x2="142" y2="165" />
            <line x1="105" y1="225" x2="95" y2="160" />
            <line x1="18" y1="155" x2="95" y2="160" />
            <line x1="18" y1="155" x2="85" y2="145" />
            <line x1="48" y1="68" x2="85" y2="145" />
            <line x1="48" y1="68" x2="95" y2="95" />
            <line x1="95" y1="95" x2="135" y2="100" />
            <line x1="95" y1="95" x2="85" y2="145" />
            <line x1="135" y1="100" x2="152" y2="90" />
            <line x1="135" y1="100" x2="142" y2="165" />
            <line x1="85" y1="145" x2="95" y2="160" />
            <line x1="85" y1="145" x2="142" y2="165" />
            <line x1="142" y1="165" x2="160" y2="140" />
            <line x1="152" y1="90" x2="160" y2="140" />
          </g>

          {/* Node Circles (Dots) with clean blue and white concentric styling */}
          <g fill="#278BD6" stroke="#FFFFFF" strokeWidth="4">
            <circle cx="120" cy="20" r="10" />
            <circle cx="185" cy="42" r="10" />
            <circle cx="220" cy="108" r="10" />
            <circle cx="188" cy="196" r="10" />
            <circle cx="105" cy="225" r="10" />
            <circle cx="18" cy="155" r="10" />
            <circle cx="48" cy="68" r="10" />
            <circle cx="95" cy="95" r="7.5" fill="#FFFFFF" stroke="#2585D0" strokeWidth="3" />
            <circle cx="135" cy="100" r="7.5" fill="#FFFFFF" stroke="#2585D0" strokeWidth="3" />
            <circle cx="85" cy="145" r="7.5" fill="#FFFFFF" stroke="#2585D0" strokeWidth="3" />
            <circle cx="142" cy="165" r="7.5" fill="#FFFFFF" stroke="#2585D0" strokeWidth="3" />
            <circle cx="160" cy="140" r="6.5" fill="#FFFFFF" stroke="#2585D0" strokeWidth="2.5" />
            <circle cx="95" cy="160" r="6.5" fill="#FFFFFF" stroke="#2585D0" strokeWidth="2.5" />
            <circle cx="152" cy="90" r="6.5" fill="#FFFFFF" stroke="#2585D0" strokeWidth="2.5" />
          </g>
        </g>
      </svg>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Precision Geodesic Faceted Polyhedron Icon matching uploaded logo */}
      <svg
        viewBox="0 0 250 250"
        className={`${heightClasses} w-auto shrink-0 drop-shadow-xs`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="polyhedron">
          {/* Facets with dimensional blue gradient fills */}
          {/* Facet 1: Top-Center */}
          <polygon
            points="120,20 185,42 135,100"
            fill="#2B8FD9"
          />
          {/* Facet 2: Top-Left */}
          <polygon
            points="48,68 120,20 95,95"
            fill="#1E7DC5"
          />
          {/* Facet 3: Far-Left */}
          <polygon
            points="18,155 48,68 85,145"
            fill="#186BB0"
          />
          {/* Facet 4: Bottom-Left */}
          <polygon
            points="18,155 105,225 95,160"
            fill="#1560A0"
          />
          {/* Facet 5: Bottom Center */}
          <polygon
            points="105,225 188,196 142,165"
            fill="#1A6EB4"
          />
          {/* Facet 6: Bottom-Right */}
          <polygon
            points="188,196 220,108 160,140"
            fill="#237DBF"
          />
          {/* Facet 7: Far-Right */}
          <polygon
            points="220,108 185,42 152,90"
            fill="#2D92DC"
          />
          {/* Facet 8: Center-Top */}
          <polygon
            points="95,95 120,20 135,100"
            fill="#329DE7"
          />
          {/* Facet 9: Center-Left */}
          <polygon
            points="85,145 48,68 95,95"
            fill="#2482CC"
          />
          {/* Facet 10: Center-Bottom-Left */}
          <polygon
            points="95,160 18,155 85,145"
            fill="#1B6CAE"
          />
          {/* Facet 11: Center-Bottom */}
          <polygon
            points="95,160 105,225 142,165"
            fill="#2277BA"
          />
          {/* Facet 12: Central Facet */}
          <polygon
            points="95,95 135,100 142,165 85,145"
            fill="#2889D4"
          />
          {/* Facet 13: Center-Right */}
          <polygon
            points="135,100 152,90 160,140 142,165"
            fill="#349CE5"
          />
          {/* Facet 14: Mid-Right */}
          <polygon
            points="152,90 185,42 220,108"
            fill="#2586D1"
          />
          {/* Facet 15: Mid-Bottom-Right */}
          <polygon
            points="142,165 160,140 188,196"
            fill="#1D72B8"
          />

          {/* White Structural Edge Struts / Webbing */}
          <g stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Outer Perimeter Struts */}
            <line x1="120" y1="20" x2="185" y2="42" />
            <line x1="185" y1="42" x2="220" y2="108" />
            <line x1="220" y1="108" x2="188" y2="196" />
            <line x1="188" y1="196" x2="105" y2="225" />
            <line x1="105" y1="225" x2="18" y2="155" />
            <line x1="18" y1="155" x2="48" y2="68" />
            <line x1="48" y1="68" x2="120" y2="20" />

            {/* Inner Struts */}
            <line x1="120" y1="20" x2="95" y2="95" />
            <line x1="120" y1="20" x2="135" y2="100" />
            <line x1="185" y1="42" x2="135" y2="100" />
            <line x1="185" y1="42" x2="152" y2="90" />
            <line x1="220" y1="108" x2="152" y2="90" />
            <line x1="220" y1="108" x2="160" y2="140" />
            <line x1="188" y1="196" x2="160" y2="140" />
            <line x1="188" y1="196" x2="142" y2="165" />
            <line x1="105" y1="225" x2="142" y2="165" />
            <line x1="105" y1="225" x2="95" y2="160" />
            <line x1="18" y1="155" x2="95" y2="160" />
            <line x1="18" y1="155" x2="85" y2="145" />
            <line x1="48" y1="68" x2="85" y2="145" />
            <line x1="48" y1="68" x2="95" y2="95" />

            {/* Center cross-struts */}
            <line x1="95" y1="95" x2="135" y2="100" />
            <line x1="95" y1="95" x2="85" y2="145" />
            <line x1="135" y1="100" x2="152" y2="90" />
            <line x1="135" y1="100" x2="142" y2="165" />
            <line x1="85" y1="145" x2="95" y2="160" />
            <line x1="85" y1="145" x2="142" y2="165" />
            <line x1="142" y1="165" x2="160" y2="140" />
            <line x1="152" y1="90" x2="160" y2="140" />
          </g>

          {/* Node Circles (Dots) with clean blue and white concentric styling */}
          <g fill="#278BD6" stroke="#FFFFFF" strokeWidth="4">
            {/* Outer vertices nodes */}
            <circle cx="120" cy="20" r="10" />
            <circle cx="185" cy="42" r="10" />
            <circle cx="220" cy="108" r="10" />
            <circle cx="188" cy="196" r="10" />
            <circle cx="105" cy="225" r="10" />
            <circle cx="18" cy="155" r="10" />
            <circle cx="48" cy="68" r="10" />

            {/* Inner vertices nodes */}
            <circle cx="95" cy="95" r="7.5" fill="#FFFFFF" stroke="#2585D0" strokeWidth="3" />
            <circle cx="135" cy="100" r="7.5" fill="#FFFFFF" stroke="#2585D0" strokeWidth="3" />
            <circle cx="85" cy="145" r="7.5" fill="#FFFFFF" stroke="#2585D0" strokeWidth="3" />
            <circle cx="142" cy="165" r="7.5" fill="#FFFFFF" stroke="#2585D0" strokeWidth="3" />
            <circle cx="160" cy="140" r="6.5" fill="#FFFFFF" stroke="#2585D0" strokeWidth="2.5" />
            <circle cx="95" cy="160" r="6.5" fill="#FFFFFF" stroke="#2585D0" strokeWidth="2.5" />
            <circle cx="152" cy="90" r="6.5" fill="#FFFFFF" stroke="#2585D0" strokeWidth="2.5" />
          </g>
        </g>
      </svg>

      {/* Typography: "KRC" + Horizontal Rule + "YOUR BLUEPRINT TO SUCCESS" */}
      {!iconOnly && (
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline">
            <span
              className="font-black tracking-tight leading-none"
              style={{
                color: textColor,
                fontSize: size === 'sm' ? '1.5rem' : size === 'lg' ? '2.5rem' : size === 'xl' ? '3.5rem' : '1.85rem',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              }}
            >
              KRC
            </span>
          </div>
          
          {/* Exact horizontal underline beneath KRC */}
          <div
            className="w-full my-1"
            style={{
              height: size === 'sm' ? '1.5px' : '2px',
              backgroundColor: lineColor,
            }}
          />

          {/* Tagline */}
          <span
            className="font-extrabold tracking-wider uppercase leading-none whitespace-nowrap"
            style={{
              color: taglineColor,
              fontSize: size === 'sm' ? '0.5rem' : size === 'lg' ? '0.75rem' : size === 'xl' ? '0.95rem' : '0.62rem',
              letterSpacing: '0.08em',
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            YOUR BLUEPRINT TO SUCCESS
          </span>
        </div>
      )}
    </div>
  );
};
