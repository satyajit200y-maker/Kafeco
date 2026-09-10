import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { trackAnalyticsEvent } from '../utils/analytics.ts';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  trackingName?: string;
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  icon = <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />,
  size = 'md',
  fullWidth = false,
  className = '',
  trackingName,
  onClick,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-7 py-3.5 text-lg font-medium',
  }[size];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (trackingName) {
      trackAnalyticsEvent(trackingName, { buttonType: 'primary' });
    }
    onClick?.(e);
  };

  return (
    <button
      onClick={handleClick}
      className={`group inline-flex items-center justify-center rounded-full bg-[#C67937] text-white font-medium shadow-sm hover:bg-[#AF6424] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C67937] focus:ring-offset-2 whitespace-nowrap cursor-pointer ${sizeClasses} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      <span>{children}</span>
      {icon}
    </button>
  );
};

export const SecondaryButton: React.FC<ButtonProps> = ({
  children,
  icon,
  size = 'md',
  fullWidth = false,
  className = '',
  trackingName,
  onClick,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-7 py-3.5 text-lg font-medium',
  }[size];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (trackingName) {
      trackAnalyticsEvent(trackingName, { buttonType: 'secondary' });
    }
    onClick?.(e);
  };

  return (
    <button
      onClick={handleClick}
      className={`group inline-flex items-center justify-center rounded-full border border-[#D8C7B5] bg-white/80 backdrop-blur-sm text-[#2C1D14] font-medium hover:bg-[#FAF4ED] hover:border-[#BE9A78] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C67937] focus:ring-offset-2 whitespace-nowrap cursor-pointer ${sizeClasses} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      <span>{children}</span>
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export const WhatsAppButton: React.FC<{
  href: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  itemName?: string;
}> = ({
  href,
  label = 'Order on WhatsApp',
  size = 'md',
  fullWidth = false,
  className = '',
  itemName,
}) => {
  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  }[size];

  const handleClick = () => {
    trackAnalyticsEvent('whatsapp_click', {
      source: itemName ? `menu_item:${itemName}` : 'cta_button',
      target: href,
    });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-white font-medium hover:bg-[#1EBE5D] active:scale-[0.98] transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 whitespace-nowrap cursor-pointer ${sizeClasses} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      aria-label={`${label} - opens WhatsApp chat`}
    >
      <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
      <span>{label}</span>
    </a>
  );
};

export const SectionHeading: React.FC<{
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}> = ({ eyebrow, title, subtitle, align = 'center', className = '' }) => {
  return (
    <div
      className={`mb-12 ${align === 'center' ? 'text-center max-w-2xl mx-auto' : 'text-left max-w-2xl'} ${className}`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#EFE6DC] text-[#7E5738] mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#1A110B] tracking-tight leading-[1.15]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-[#5D4E45] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
