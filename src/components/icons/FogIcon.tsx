import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const FogIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className} {...props}
  >
    <path d="M4 15h16" />
    <path d="M4 18h16" />
    <path d="M4 21h16" />
    <path d="M6 10h12" />
  </svg>
);

export default FogIcon;
