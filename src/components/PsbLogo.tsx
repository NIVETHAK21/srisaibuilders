import React from 'react';

interface PsbLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon-only' | 'horizontal';
  className?: string;
  theme?: 'dark' | 'light';
  customLogoUrl?: string;
}

export const PsbLogo: React.FC<PsbLogoProps> = ({
  size = 'md',
  variant = 'horizontal',
  className = '',
  theme = 'dark',
  customLogoUrl,
}) => {
  if (customLogoUrl) {
    return (
      <div className={`inline-flex items-center gap-3.5 ${className}`}>
        <img
          src={customLogoUrl}
          alt="Pranav Sai Builders Logo"
          className="h-11 w-auto object-contain"
        />
        {variant !== 'icon-only' && (
          <div className="flex flex-col">
            <span className={`font-heading font-black tracking-tight leading-none ${theme === 'dark' ? 'text-white' : 'text-[#1d3557]'}`}>
              PRANAV SAI BUILDERS
            </span>
            <span className={`text-[10px] uppercase font-bold tracking-[0.2em] ${theme === 'dark' ? 'text-[#FFC107]' : 'text-[#457b9d]'}`}>
              Sculpt Your Dream Home With Us
            </span>
          </div>
        )}
      </div>
    );
  }

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-13 h-13',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: { title: 'text-sm font-black', sub: 'text-[8.5px]' },
    md: { title: 'text-lg font-black', sub: 'text-[9.5px]' },
    lg: { title: 'text-xl font-black', sub: 'text-[11px]' },
    xl: { title: 'text-2xl font-black', sub: 'text-xs' },
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Authentic PSB Geometric Triangular Red Monogram on Golden Yellow Shield */}
      <div className={`relative ${iconSizes[size]} flex-shrink-0 drop-shadow-md`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rounded Yellow Background Shield / Octagon */}
          <rect width="100" height="100" rx="16" fill="#FFC107" />
          
          {/* Golden Inner Border */}
          <rect x="2.5" y="2.5" width="95" height="95" rx="14" stroke="#F4B400" strokeWidth="2.5" />

          {/* Red Triangular Monogram Body */}
          <path
            d="M 50 14 L 86 78 L 14 78 Z"
            fill="#E63946"
            stroke="#991B1B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Architectural Beam Cutout Lines / Monogram Detail */}
          <path
            d="M 50 28 L 74 72 L 26 72 Z"
            fill="#FFC107"
          />
          
          {/* Inner Solid Red Pyramid with Bold PSB Monogram */}
          <path
            d="M 50 38 L 66 68 L 34 68 Z"
            fill="#D90429"
          />

          {/* PSB Monogram Letters */}
          <text
            x="50"
            y="64"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="'Montserrat', sans-serif"
            fontWeight="900"
            fontSize="14"
            letterSpacing="1"
          >
            PSB
          </text>
        </svg>
      </div>

      {variant !== 'icon-only' && (
        <div className={`flex flex-col ${variant === 'full' ? 'items-center text-center mt-2' : ''}`}>
          <div className="flex items-center gap-1.5">
            <span
              className={`font-heading font-black tracking-tight leading-none ${textSizes[size].title} ${
                theme === 'dark' ? 'text-white' : 'text-[#1d3557]'
              }`}
            >
              PRANAV SAI BUILDERS
            </span>
          </div>
          <span
            className={`font-bold uppercase tracking-[0.2em] mt-1 ${textSizes[size].sub} ${
              theme === 'dark' ? 'text-[#FFC107]' : 'text-[#457b9d]'
            }`}
          >
            Sculpt Your Dream Home With Us
          </span>
        </div>
      )}
    </div>
  );
};

