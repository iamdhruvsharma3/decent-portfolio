import React from "react";

// Reusable SVG icon wrapper
const Icon = ({ children, className = "h-6 w-6", title }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden={title ? undefined : true}
    role={title ? "img" : "presentation"}>
    {title ? <title>{title}</title> : null}
    {children}
  </svg>
);

// Individual SVG icon components (simple, lightweight approximations)
export const Html5Icon = ({ className }: { className?: string }) => (
  <Icon className={className} title="HTML5">
    <rect x="1" y="1" width="22" height="22" rx="2" fill="#e34f26" />
    <path d="M6 4h12l-1 12-5 2.5L6 16 6.8 9H18" fill="#fff" opacity="0.98" />
    <path
      d="M8.5 12.6l.2 2.2 3 .9 3-.9.2-2.2"
      stroke="#fff"
      strokeWidth="0.6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export const Css3Icon = ({ className }) => (
  <Icon className={className} title="CSS3">
    <rect x="1" y="1" width="22" height="22" rx="2" fill="#1572b6" />
    <path d="M6 4h12l-1 12-5 2.5L6 16" fill="#fff" opacity="0.95" />
    <path
      d="M8.5 11.5l.2 2.2 3 .9 3-.9.2-2.2"
      stroke="#1572b6"
      strokeWidth="0.6"
      fill="#1572b6"
      opacity="0.0"
    />
    <path
      d="M8.5 11.5l3 .9 3-.9"
      stroke="#fff"
      strokeWidth="0.6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export const JsIcon = ({ className }) => (
  <Icon className={className} title="JavaScript">
    <rect x="1" y="1" width="22" height="22" rx="2" fill="#f7df1e" />
    <text
      x="50%"
      y="60%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontFamily="monospace"
      fontWeight="700"
      fontSize="9"
      fill="#000">
      JS
    </text>
  </Icon>
);

export const TsIcon = ({ className }) => (
  <Icon className={className} title="TypeScript">
    <rect x="1" y="1" width="22" height="22" rx="2" fill="#3178c6" />
    <text
      x="50%"
      y="60%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontFamily="monospace"
      fontWeight="700"
      fontSize="8.5"
      fill="#fff">
      TS
    </text>
  </Icon>
);

export const ReactIcon = ({ className }) => (
  <Icon className={className} title="React">
    <circle cx="12" cy="12" r="2.2" fill="#61dafb" />
    <g stroke="#61dafb" strokeWidth="0.9" fill="none">
      <ellipse cx="12" cy="12" rx="6.2" ry="2.8" transform="rotate(30 12 12)" />
      <ellipse
        cx="12"
        cy="12"
        rx="6.2"
        ry="2.8"
        transform="rotate(-30 12 12)"
      />
      <ellipse cx="12" cy="12" rx="6.2" ry="2.8" />
    </g>
  </Icon>
);

export const NextIcon = ({ className }) => (
  <Icon className={className} title="Next.js">
    <rect x="1" y="1" width="22" height="22" rx="2" fill="#000" />
    <text
      x="50%"
      y="62%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontFamily="Inter, system-ui, sans-serif"
      fontWeight="700"
      fontSize="7.5"
      fill="#fff">
      NEXT
    </text>
  </Icon>
);

export const ZustandIcon = ({ className }) => (
  <Icon className={className} title="Zustand">
    <rect x="1" y="1" width="22" height="22" rx="4" fill="#7c3aed" />
    <path
      d="M7 9c1.5 0 2.5 2 5 2s3.5-2 5-2v6H7V9z"
      fill="#fff"
      opacity="0.95"
    />
  </Icon>
);

export const ReduxIcon = ({ className }) => (
  <Icon className={className} title="Redux">
    <circle cx="12" cy="12" r="10" fill="#764abc" />
    <path
      d="M8 13c2.5 0 3-1.5 6-1.5s3 1.5 5.2 1"
      stroke="#fff"
      strokeWidth="1"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export const TailwindIcon = ({ className }) => (
  <Icon className={className} title="Tailwind CSS">
    <rect x="1" y="1" width="22" height="22" rx="4" fill="#06b6d4" />
    <path
      d="M4 14c4-4 8-2 12-4 0 0-2 6-6 6-4 0-5-2-6-2z"
      fill="#0e7490"
      opacity="0.95"
    />
  </Icon>
);

export const BootstrapIcon = ({ className }) => (
  <Icon className={className} title="Bootstrap">
    <rect x="1" y="1" width="22" height="22" rx="3" fill="#7b2cbf" />
    <path d="M8 7h4.5c2.5 0 3.5 1 3.5 3s-1 3-3.5 3H8V7z" fill="#fff" />
  </Icon>
);

export const ShadcnIcon = ({ className }) => (
  <Icon className={className} title="Shadcn UI">
    <rect x="1" y="1" width="22" height="22" rx="3" fill="#374151" />
    <rect x="6" y="6" width="12" height="12" rx="2" fill="#e5e7eb" />
    <rect x="8" y="8" width="8" height="8" rx="1" fill="#374151" />
  </Icon>
);

export const MuiIcon = ({ className }) => (
  <Icon className={className} title="MUI">
    <rect x="1" y="1" width="22" height="22" rx="3" fill="#1976d2" />
    <path d="M7 7h10v2H7zM7 11h10v6H7z" fill="#fff" />
  </Icon>
);

export const KendoIcon = ({ className }) => (
  <Icon className={className} title="Kendo UI">
    <rect x="1" y="1" width="22" height="22" rx="3" fill="#16a34a" />
    <circle cx="12" cy="10" r="3" fill="#fff" />
    <rect x="9" y="14" width="6" height="3" rx="1" fill="#fff" />
  </Icon>
);

export const RestApiIcon = ({ className }) => (
  <Icon className={className} title="REST APIs">
    <rect x="1" y="1" width="22" height="22" rx="3" fill="#0ea5a4" />
    <path d="M7 8h10v2H7zM7 12h10v2H7z" fill="#fff" />
  </Icon>
);

export const AxiosIcon = ({ className }) => (
  <Icon className={className} title="Axios">
    <rect x="1" y="1" width="22" height="22" rx="3" fill="#0070f3" />
    <path d="M7 8h10v2H7zM7 12h8v2H7z" fill="#fff" />
  </Icon>
);

export const WebpackIcon = ({ className }) => (
  <Icon className={className} title="Webpack">
    <rect x="1" y="1" width="22" height="22" rx="3" fill="#1c64f2" />
    <path
      d="M12 6v12M6 9l6-3 6 3M6 15l6 3 6-3"
      stroke="#fff"
      strokeWidth="0.9"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export const BabelIcon = ({ className }) => (
  <Icon className={className} title="Babel">
    <rect x="1" y="1" width="22" height="22" rx="3" fill="#f7d14b" />
    <path d="M7 10h10v6H7z" fill="#000" opacity="0.85" />
  </Icon>
);

export const NpmIcon = ({ className }) => (
  <Icon className={className} title="npm">
    <rect x="1" y="1" width="22" height="22" rx="2" fill="#cb3837" />
    <path d="M6 9v6h12V9H6zm2 2h2v2H8v-2z" fill="#fff" />
  </Icon>
);

export const YarnIcon = ({ className }) => (
  <Icon className={className} title="Yarn">
    <rect x="1" y="1" width="22" height="22" rx="2" fill="#2c5282" />
    <path d="M7 14c2-3 10-3 10-3s-1 6-5 6-5-3-5-3z" fill="#fff" />
  </Icon>
);

export const GithubIcon = ({ className }) => (
  <Icon className={className} title="GitHub">
    <rect x="1" y="1" width="22" height="22" rx="4" fill="#0f172a" />
    <path
      d="M12 7a5 5 0 00-1 9.8c.5.1.7-.2.7-.5v-1.8c-2.9.6-3.5-1.4-3.5-1.4-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.6 1.2 1.6 1.2 1 .1 1.9.7 2.4 1.6.5 1 .9.8 1.5.6v-2.6c0-.3.2-.6.7-.5A5 5 0 0012 7z"
      fill="#fff"
    />
  </Icon>
);

// Mapping array ready to use in your UI (replace lucide icons with these)
export const techItems = [
  {
    title: "HTML5",
    node: (
      <div className="flex items-center gap-2 text-orange-500">
        <Html5Icon className="h-6 w-6" />
        <span className="font-medium">HTML5</span>
      </div>
    ),
  },
  {
    title: "CSS3",
    node: (
      <div className="flex items-center gap-2 text-blue-500">
        <Css3Icon className="h-6 w-6" />
        <span className="font-medium">CSS3</span>
      </div>
    ),
  },
  {
    title: "JavaScript (ES6+)",
    node: (
      <div className="flex items-center gap-2 text-yellow-500">
        <JsIcon className="h-6 w-6" />
        <span className="font-medium">JavaScript</span>
      </div>
    ),
  },
  {
    title: "TypeScript",
    node: (
      <div className="flex items-center gap-2 text-blue-600">
        <TsIcon className="h-6 w-6" />
        <span className="font-medium">TypeScript</span>
      </div>
    ),
  },
  {
    title: "React.js",
    node: (
      <div className="flex items-center gap-2 text-cyan-500">
        <ReactIcon className="h-6 w-6" />
        <span className="font-medium">React.js</span>
      </div>
    ),
  },
  {
    title: "Next.js",
    node: (
      <div className="flex items-center gap-2 text-black dark:text-white">
        <NextIcon className="h-6 w-6" />
        <span className="font-medium">Next.js</span>
      </div>
    ),
  },
  {
    title: "Zustand",
    node: (
      <div className="flex items-center gap-2 text-purple-500">
        <ZustandIcon className="h-6 w-6" />
        <span className="font-medium">Zustand</span>
      </div>
    ),
  },
  {
    title: "Redux",
    node: (
      <div className="flex items-center gap-2 text-purple-600">
        <ReduxIcon className="h-6 w-6" />
        <span className="font-medium">Redux</span>
      </div>
    ),
  },
  {
    title: "Tailwind CSS",
    node: (
      <div className="flex items-center gap-2 text-cyan-400">
        <TailwindIcon className="h-6 w-6" />
        <span className="font-medium">Tailwind CSS</span>
      </div>
    ),
  },
  {
    title: "Bootstrap",
    node: (
      <div className="flex items-center gap-2 text-purple-500">
        <BootstrapIcon className="h-6 w-6" />
        <span className="font-medium">Bootstrap</span>
      </div>
    ),
  },
  {
    title: "Shadcn UI",
    node: (
      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <ShadcnIcon className="h-6 w-6" />
        <span className="font-medium">Shadcn UI</span>
      </div>
    ),
  },
  {
    title: "MUI",
    node: (
      <div className="flex items-center gap-2 text-blue-500">
        <MuiIcon className="h-6 w-6" />
        <span className="font-medium">MUI</span>
      </div>
    ),
  },
  {
    title: "Kendo UI",
    node: (
      <div className="flex items-center gap-2 text-green-500">
        <KendoIcon className="h-6 w-6" />
        <span className="font-medium">Kendo UI</span>
      </div>
    ),
  },
  {
    title: "REST APIs",
    node: (
      <div className="flex items-center gap-2 text-green-600">
        <RestApiIcon className="h-6 w-6" />
        <span className="font-medium">REST APIs</span>
      </div>
    ),
  },
  {
    title: "Axios",
    node: (
      <div className="flex items-center gap-2 text-blue-400">
        <AxiosIcon className="h-6 w-6" />
        <span className="font-medium">Axios</span>
      </div>
    ),
  },
  {
    title: "Webpack",
    node: (
      <div className="flex items-center gap-2 text-blue-500">
        <WebpackIcon className="h-6 w-6" />
        <span className="font-medium">Webpack</span>
      </div>
    ),
  },
  {
    title: "Babel",
    node: (
      <div className="flex items-center gap-2 text-yellow-600">
        <BabelIcon className="h-6 w-6" />
        <span className="font-medium">Babel</span>
      </div>
    ),
  },
  {
    title: "npm",
    node: (
      <div className="flex items-center gap-2 text-red-500">
        <NpmIcon className="h-6 w-6" />
        <span className="font-medium">npm</span>
      </div>
    ),
  },
  {
    title: "Yarn",
    node: (
      <div className="flex items-center gap-2 text-blue-600">
        <YarnIcon className="h-6 w-6" />
        <span className="font-medium">Yarn</span>
      </div>
    ),
  },
  {
    title: "Github",
    node: (
      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <GithubIcon className="h-6 w-6" />
        <span className="font-medium">Github</span>
      </div>
    ),
  },
];

export default techItems;
