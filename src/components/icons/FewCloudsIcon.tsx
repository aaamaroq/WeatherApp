import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const FewCloudsIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className} {...props}
  >
    <path d="M12 2v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="M20 12h2" />
    <path d="m19.07 4.93-1.41 1.41" />
    <path d="M15.947 21.5a4 4 0 0 0-7.894 0" />
    <path d="M17 18a5 5 0 0 0-10 0" />
    <circle cx="12" cy="9" r="3" />
  </svg>
);

export default FewCloudsIcon;
