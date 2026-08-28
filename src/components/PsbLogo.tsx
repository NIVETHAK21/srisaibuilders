import React from 'react';
import { COMPANY_DETAILS } from '../data/companyData';

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
      <div className={`inline-flex items-center gap-3 select-none whitespace-nowrap flex-shrink-0 ${className}`}>
        <img
          src={customLogoUrl}
          alt="Pranav Sai Builders Logo"
          className="h-11 w-auto object-contain flex-shrink-0"
        />
        {variant !== 'icon-only' && (
          <div className="flex flex-col whitespace-nowrap">
            <span className={`font-heading font-black tracking-tight leading-none whitespace-nowrap ${theme === 'dark' ? 'text-white' : 'text-[#1d3557]'}`}>
              {COMPANY_DETAILS.name}
            </span>
            <span className={`text-[9.5px] uppercase font-bold tracking-wider mt-0.5 whitespace-nowrap ${theme === 'dark' ? 'text-[#FFC107]' : 'text-[#457b9d]'}`}>
              {COMPANY_DETAILS.tagline}
            </span>
          </div>
        )}
      </div>
    );
  }

  const iconSizes = {
    sm: 'w-7 h-7 sm:w-8 sm:h-8',
    md: 'w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10',
    lg: 'w-10 h-10 sm:w-12 sm:h-12',
    xl: 'w-12 h-12 sm:w-16 sm:h-16',
  };

  const textSizes = {
    sm: { title: 'text-xs sm:text-sm font-black', sub: 'text-[7.5px] sm:text-[8px]' },
    md: { title: 'text-xs xs:text-sm sm:text-base xl:text-lg font-black', sub: 'text-[8px] xs:text-[8.5px] sm:text-[9.5px] xl:text-[10px]' },
    lg: { title: 'text-base sm:text-xl font-black', sub: 'text-[9px] sm:text-[10.5px]' },
    xl: { title: 'text-xl sm:text-2xl font-black', sub: 'text-xs' },
  };

  return (
    <div className={`inline-flex items-center gap-2 sm:gap-2.5 xl:gap-3 select-none flex-shrink-0 min-w-0 max-w-full ${className}`}>
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
        <div className={`flex flex-col min-w-0 justify-center ${variant === 'full' ? 'items-center text-center mt-2' : ''}`}>
          <div className="flex items-center gap-1 min-w-0">
            <span
              className={`font-heading font-black tracking-tight leading-tight truncate sm:whitespace-nowrap ${textSizes[size].title} ${
                theme === 'dark' ? 'text-white' : 'text-[#1d3557]'
              }`}
            >
              PRANAV SAI BUILDERS
            </span>
          </div>
          <span
            className={`font-bold uppercase tracking-wider mt-0.5 truncate sm:whitespace-nowrap ${textSizes[size].sub} ${
              theme === 'dark' ? 'text-[#FFC107]' : 'text-[#457b9d]'
            }`}
          >
            <span className="inline sm:hidden">Civil Engineers & Builders</span>
            <span className="hidden sm:inline">{COMPANY_DETAILS.tagline}</span>
          </span>
        </div>
      )}
    </div>
  );
};

