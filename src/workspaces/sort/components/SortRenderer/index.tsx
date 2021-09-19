const SORT_HEIGHT_UNIT = 0.2;

export const SortRenderer: React.FC<{
  heights: number[];
  teachersLocation: number;
}> = (props) => {
  return (
    <svg
      width="100%"
      viewBox={[
        0,
        0,
        props.heights.length,
        props.heights.length * SORT_HEIGHT_UNIT + 0.7 + 1,
      ].join(" ")}
    >
      {props.heights.map((height, i) => (
        <g
          style={{ transition: "0.1s ease" }}
          key={height}
          transform={[
            "translate(",
            i + 0.5,
            ",",
            props.heights.length * SORT_HEIGHT_UNIT + 0.7,
            ")",
          ].join("")}
          fill="#888"
        >
          <path
            d={[
              `M -0.4 0`,
              `V -${height * SORT_HEIGHT_UNIT}`,
              `a 0.4 0.3 0 0 1 0.8 0`,
              "V 0",
              "Z",
            ].join(" ")}
          />
          <circle r="0.3" cx="0" cy={-(height * SORT_HEIGHT_UNIT + 0.4)} />
        </g>
      ))}
      <g
        style={{ transition: "0.1s ease" }}
        transform={[
          "translate(",
          props.teachersLocation,
          ",",
          props.heights.length * SORT_HEIGHT_UNIT + 0.7,
          ")",
          `scale(${1 / 512})`,
        ].join("")}
      >
        {/* https://www.svgrepo.com/svg/118730/whistle */}
        <rect
          x="217.464"
          y="101.855"
          fill="#e7eced"
          width="55.058"
          height="44.04"
        />
        <path
          fill="#f89f44"
          d="M349.583,178.927c42.573,0,77.072,34.511,77.072,77.072s-34.499,77.072-77.072,77.072c-42.562,0-77.061-34.511-77.061-77.072S307.021,178.927,349.583,178.927z"
        />
        <path
          fill="#ffd248"
          d="M8.272,101.855h209.192v44.04h55.058v-44.04h77.061c85.135,0,154.145,69.021,154.145,154.145c0,85.135-69.01,154.145-154.145,154.145c-85.124,0-154.134-69.01-154.134-154.145c0-23.669,5.493-46.014,15.033-66.054c-82.741,0-184.718,0-191.203,0c-11.007,0-11.007-11.018-11.007-11.018L8.272,101.855L8.272,101.855z M426.656,255.999c0-42.562-34.499-77.072-77.072-77.072c-42.562,0-77.061,34.511-77.061,77.072s34.499,77.072,77.061,77.072C392.156,333.072,426.656,298.561,426.656,255.999z"
        />
        <path d="M349.583,93.583H0v85.344c0,0.786,0.108,4.922,2.248,9.206c3.201,6.408,9.409,10.084,17.031,10.084h178.649c-7.139,18.547-10.75,37.928-10.75,57.783c0,89.556,72.855,162.417,162.406,162.417c89.558,0,162.417-72.86,162.417-162.417S439.141,93.583,349.583,93.583z M225.736,110.127h38.514v27.496h-38.514V110.127z M349.583,401.872c-80.429,0-145.862-65.438-145.862-145.873c0-21.637,4.788-42.666,14.23-62.499l5.63-11.828H19.279c-1.157,0-2.596,0-2.735-2.859v-30.151h156.88v-16.544H16.544v-21.992h192.648v44.04h71.602v-44.04h68.789c80.435,0,145.873,65.438,145.873,145.873S430.018,401.872,349.583,401.872z" />
        <path d="M349.583,170.655c-47.053,0-85.333,38.286-85.333,85.344s38.28,85.344,85.333,85.344c47.059,0,85.344-38.286,85.344-85.344S396.642,170.655,349.583,170.655z M349.583,324.8c-37.931,0-68.789-30.863-68.789-68.801s30.859-68.8,68.789-68.8c37.936,0,68.8,30.863,68.8,68.8S387.519,324.8,349.583,324.8z" />
        <path d="M344.08,203.687v16.544c1.46,0,35.768,0.407,35.768,35.769h16.544C396.391,204.284,344.602,203.687,344.08,203.687z" />
      </g>
    </svg>
  );
};
