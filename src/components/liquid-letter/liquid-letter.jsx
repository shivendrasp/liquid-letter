import { useDialKit } from "dialkit";
import style from "./style.module.css";

const LiquidLetter = () => {
  const p = useDialKit("Liquid letter", {
    letter: { type: "text", default: "OS", placeholder: "Letters…" },
    width: [300, 100, 800],
    height: [300, 100, 800],
    BG: "#4a74f1",
    Y_offset: [20, -150, 150],
    fontSize: [180, 20, 400],
    maskPad: [24, 0, 100],
    fontWeight: [500, 100, 900, 100],
    borderRadius: [48, 0, 200],
    hueRotate_01: 200,
    hueRotate_02: 220,
    noise: 0.25,
    blur_01: 8,
    blur_02: 3.5,
    innerShadow: 20,
    innerShadowSpread: 10,
    innerShadowColor: '#9181ff',
  });

  const { letter, width, height, BG, Y_offset, fontSize, maskPad, fontWeight, borderRadius, hueRotate_01, hueRotate_02, noise, blur_01, blur_02, innerShadow, innerShadowSpread, innerShadowColor } = p;

  return (
    <div className={style.LiquidLetterContainer} style={{ borderRadius: borderRadius, filter: `hue-rotate(${hueRotate_01}deg) invert()`, boxShadow: `inset 0 0 ${innerShadow}px ${innerShadowSpread}px ${innerShadowColor}`, background: BG }}>
    <div className={style.letterContainer} style={{ width: width, height: height, filter: `hue-rotate(${hueRotate_02}deg) contrast(1.2) saturate(1) invert()` }}>
      <svg className={style.maskDef} width="0" height="0" aria-hidden="true">
        <defs>
          
          <filter
            id="letter-blur"
            filterUnits="userSpaceOnUse"
            x={-maskPad}
            y={-maskPad}
            width={width + maskPad * 2}
            height={height + maskPad * 2}
          >
            <feGaussianBlur stdDeviation={blur_01} />
          </filter>
          <mask
            id="letter-text"
            maskUnits="userSpaceOnUse"
            maskContentUnits="userSpaceOnUse"
            x={-maskPad}
            y={-maskPad}
            width={width + maskPad * 2}
            height={height + maskPad * 2}
          >
            <text
              x={width / 2}
              y={height / 2 + Y_offset}
              fill="white"
              fontSize={fontSize}
              fontWeight={fontWeight}
              fontFamily="GeneralSans, sans-serif"
              textAnchor="middle"
              dominantBaseline="middle"
              filter="url(#letter-blur)"
            >
              {letter}
            </text>
          </mask>
        </defs>
      </svg>
      <div className={style.letterTextGradient} />
      <div className={style.letterInsetShadow} style={{ borderRadius: borderRadius }} />
      <svg
        className={style.SvgText}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        overflow="visible"
        aria-hidden="true"
      >
        <defs>
          <filter
            id="letter-stroke-blur"
            filterUnits="userSpaceOnUse"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feGaussianBlur stdDeviation={blur_02} />
          </filter>
        </defs>
        <text
          x={width / 2}
          y={height / 2 + Y_offset}
          fill="transparent"
          stroke="white"
          strokeWidth="3"
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontFamily="GeneralSans, sans-serif"
          textAnchor="middle"
          dominantBaseline="middle"
          filter="url(#letter-stroke-blur)"
        >
          {letter}
        </text>
      </svg>
      <svg
        className={style.Noise}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        overflow="visible"
        aria-hidden="true"
      >
        <defs>
          <filter id="noise-filter" x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="2.7"    
              numOctaves="3"         
              seed="9"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="saturate"
              values="0"
              result="monoNoise"
            />
            <feComponentTransfer in="monoNoise" result="finalNoise">
              <feFuncA type="linear" slope={noise} /> {/* Increased slope for stronger visibility */}
            </feComponentTransfer>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="white" filter="url(#noise-filter)" />
      </svg>
    </div>
    </div>
  );
};

export default LiquidLetter;
