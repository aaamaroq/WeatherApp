import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const HumidityIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className} {...props}
  >
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-7.4C14.8 6.4 13 3 12 3S9.2 6.4 8 7.6C6 11.1 5 13 5 15a7 7 0 0 0 7 7Z" />
  </svg>
);

export default HumidityIcon;
