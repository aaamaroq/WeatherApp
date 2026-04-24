import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const SnowIcon: React.FC<IconProps> = ({ className, ...props }) => (
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
    <circle cx="8" cy="19" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="21" r="1" fill="currentColor" stroke="none" />
    <circle cx="16" cy="19" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export default SnowIcon;
