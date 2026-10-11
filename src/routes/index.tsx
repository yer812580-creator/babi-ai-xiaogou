import { createFileRoute, Link } from "@tanstack/react-router";
import { QrCard } from "@/components/qr-card";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main className="mx-auto grid w-full max-w-5xl items-center gap-10 px-5 py-8 md:min-h-dvh md:grid-cols-[auto_22rem] md:justify-center md:gap-16 md:py-10">
      <section className="mx-auto flex w-full max-w-sm flex-col items-center gap-6 text-center md:col-start-2">
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs tracking-widest text-mist">一张码</p>
          <h1 className="font-serif text-4xl text-cream md:text-5xl">爸比爱小狗</h1>
          <p className="max-w-xs text-sm leading-relaxed text-mist">
            扫开之后，先看到这张照片，然后这句话会飘出来。
          </p>
        </div>
        <QrCard />
        <Link to="/open" className="btn btn-ghost">
          全屏看一遍
        </Link>
        <p className="max-w-xs text-xs leading-relaxed text-mist">
          先发布，再保存图片发到微信。对方长按图片，点识别图中二维码。微信若提示网页打不开，用手机浏览器扫同一张码即可。
        </p>
      </section>
      <section className="flex flex-col items-center gap-4 md:col-start-1 md:row-start-1">
        <p className="text-xs tracking-widest text-mist">扫出来是这样</p>
        <Reveal size="card" />
      </section>
    </main>
  );
}
