import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const SunsetIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className} {...props}
  >
    <path d="M12 10V4" />
    <path d="m4.93 13.07 1.41-1.41" />
    <path d="M2 18h2" />
    <path d="M20 18h2" />
    <path d="m19.07 13.07-1.41-1.41" />
    <path d="M22 22H2" />
    <path d="M16 22a4 4 0 0 0-8 0" />
  </svg>
);

export default SunsetIcon;
