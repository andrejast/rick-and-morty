import { LucideProps, type Icon as LucideIcon } from "lucide-react";

export type Icon = typeof LucideIcon;

export const Icons = {
  female: (props: LucideProps) => (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      {...props}
    >
      <defs>
        <style>{`.cls-1{fill:url(#linear-gradient);}.cls-2{fill:url(#linear-gradient-2);}.cls-3{fill:url(#linear-gradient-3);}`}</style>
        <linearGradient
          id="linear-gradient"
          x1="210.88"
          y1="402.59"
          x2="210.88"
          y2="19.17"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#f2a4ba" />
          <stop offset="1" stopColor="#ffdce7" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-2"
          y1="256"
          x2="512"
          y2="256"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.16" stopColor="#f96992" />
          <stop offset="1" stopColor="#f96992" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-3"
          x1="76.68"
          y1="210.88"
          x2="345.08"
          y2="210.88"
          xlinkHref="#linear-gradient-2"
        />
      </defs>
      <title>female-symbol-filled</title>
      <path
        className="cls-1"
        d="M210.88,402.59c105.88,0,191.71-85.83,191.71-191.71S316.76,19.17,210.88,19.17,19.17,105,19.17,210.88,105,402.59,210.88,402.59Zm0-306.74a115,115,0,1,1-115,115A115,115,0,0,1,210.88,95.85Z"
      />
      <path
        className="cls-2"
        d="M512,484.89l-50.36-50.36L512,384.17l-27.12-27.11-50.33,50.35-61.66-61.66a209.92,209.92,0,0,0,48.9-134.87C421.76,94.6,327.16,0,210.88,0S0,94.6,0,210.88,94.6,421.76,210.88,421.76a209.92,209.92,0,0,0,134.87-48.9l61.67,61.67-50.34,50.36L384.2,512l50.34-50.35L484.89,512Zm-473.66-274c0-95.14,77.4-172.54,172.54-172.54s172.54,77.4,172.54,172.54S306,383.42,210.88,383.42,38.34,306,38.34,210.88Z"
      />
      <path
        className="cls-3"
        d="M210.88,76.68c-74,0-134.2,60.2-134.2,134.2s60.2,134.2,134.2,134.2,134.2-60.2,134.2-134.2S284.88,76.68,210.88,76.68Zm0,230.05a95.85,95.85,0,1,1,95.85-95.85A96,96,0,0,1,210.88,306.74Z"
      />
    </svg>
  ),
  male: (props: LucideProps) => (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      {...props}
    >
      <defs>
        <style>{`
        .cls-1 { fill: #199cf4; }
        .cls-2 { opacity: 0.1; }
        .cls-3 { fill: #231f20; }
      `}</style>
      </defs>
      <title>male-symbol-flat</title>
      <path
        className="cls-1"
        d="M307.2,102.4a204,204,0,0,0-130.6,47.05L65.55,38.4h56V0H0V121.6H38.4V65.55L149.45,176.6A204,204,0,0,0,102.4,307.2c0,113.09,91.71,204.8,204.8,204.8S512,420.29,512,307.2,420.29,102.4,307.2,102.4Zm0,327.68A122.88,122.88,0,1,1,430.08,307.2,122.91,122.91,0,0,1,307.2,430.08Z"
      />
      <g className="cls-2">
        <path
          className="cls-3"
          d="M512,307.2C512,420.29,420.29,512,307.2,512V430.08a122.88,122.88,0,0,0,0-245.76V102.4C420.29,102.4,512,194.11,512,307.2Z"
        />
      </g>
    </svg>
  ),
};
