import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const RainIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className} {...props}
  >
    <path d="M17.5 15H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    <path d="M8 15v2" />
    <path d="M8 19v2" />
    <path d="M12 17v2" />
    <path d="M12 21v2" />
    <path d="M16 15v2" />
    <path d="M16 19v2" />
  </svg>
);

export default RainIcon;
