import photo from "@/assets/photo.jpg";

export const PHRASE = "爸比爱小狗";

const FLOATS = Array.from({ length: 12 }, (_, index) => PHRASE[index % PHRASE.length]);

export function Reveal({ size }: { size: "card" | "screen" }) {
  return (
    <div className={size === "screen" ? "is-screen flex flex-col items-center gap-5" : "flex flex-col items-center gap-5"}>
      <div className="print">
        <div className="portrait stage">
          <img src={photo} alt="合照" draggable={false} />
          <div className="drift" aria-hidden="true">
            {FLOATS.map((char, index) => (
              <span key={index}>{char}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="rule" aria-hidden="true" />
        <p
          className={
            size === "screen"
              ? "line flex justify-center gap-1 font-serif text-4xl text-cream sm:text-5xl"
              : "line flex justify-center gap-1 font-serif text-3xl text-cream"
          }
          aria-label={PHRASE}
        >
          {PHRASE.split("").map((char, index) => (
            <span key={index}>{char}</span>
          ))}
        </p>
      </div>
    </div>
  );
}
