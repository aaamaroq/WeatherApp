import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const ArrowUpIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className} {...props}
  >
    <path d="m18 15-6-6-6 6" />
  </svg>
);

export default ArrowUpIcon;
