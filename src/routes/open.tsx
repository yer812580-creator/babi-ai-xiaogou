import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { RotateCcw } from "lucide-react";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/open")({
  component: OpenPage,
});

function OpenPage() {
  const [take, setTake] = useState(0);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-ink px-5 py-8">
      <Reveal key={take} size="screen" />
      <div className="flex w-full max-w-xs flex-col items-center gap-3">
        <button type="button" className="btn btn-ghost" onClick={() => setTake((n) => n + 1)}>
          <RotateCcw aria-hidden="true" className="size-4" />
          再看一次
        </button>
        <Link to="/" className="text-xs tracking-widest text-mist">
          回到二维码
        </Link>
      </div>
    </main>
  );
}
