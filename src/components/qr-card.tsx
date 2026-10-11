import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { previewPathPrefix } from "@/lib/preview-path-prefix";
import { PHRASE } from "@/components/reveal";

const INK = "#140e0c";
const CREAM = "#f6efe6";
const MIST = "#a89890";
const ROSE = "#d46a62";

function openPageUrl(): string {
  const prefix = previewPathPrefix(window.location.hostname, window.location.pathname) ?? "";
  return `${window.location.origin}${prefix}/open`;
}

async function composeCard(qrUrl: string): Promise<string> {
  const sample = `${PHRASE}扫一扫扫开就能看到照片`;
  await document.fonts.load(`400 92px "ZCOOL XiaoWei"`, sample);

  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1440;
  const ctx = canvas.getContext("2d");
  if (!ctx) return qrUrl;

  ctx.fillStyle = CREAM;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#e7dcd0";
  ctx.lineWidth = 2;
  ctx.strokeRect(48, 48, canvas.width - 96, canvas.height - 96);

  ctx.fillStyle = ROSE;
  ctx.fillRect((canvas.width - 72) / 2, 196, 72, 3);

  ctx.fillStyle = MIST;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "400 36px \"ZCOOL XiaoWei\", sans-serif";
  ctx.fillText("扫一扫", canvas.width / 2, 150);

  const image = new Image();
  image.src = qrUrl;
  await image.decode();
  const size = 760;
  ctx.drawImage(image, (canvas.width - size) / 2, 250, size, size);

  ctx.fillStyle = INK;
  ctx.font = "400 92px \"ZCOOL XiaoWei\", sans-serif";
  ctx.fillText(PHRASE, canvas.width / 2, 1148);

  ctx.fillStyle = MIST;
  ctx.font = "400 34px \"ZCOOL XiaoWei\", sans-serif";
  ctx.fillText("扫开就能看到照片", canvas.width / 2, 1260);

  return canvas.toDataURL("image/png");
}

export function QrCard() {
  const [qr, setQr] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [fileHref, setFileHref] = useState("/open.html");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const prefix = previewPathPrefix(window.location.hostname, window.location.pathname) ?? "";
      if (!cancelled) setFileHref(`${prefix}/open.html`);
      try {
        const QRCode = (await import("qrcode")).default;
        const dataUrl = await QRCode.toDataURL(openPageUrl(), {
          errorCorrectionLevel: "H",
          margin: 2,
          width: 760,
          color: { dark: INK, light: CREAM },
        });
        if (!cancelled) setQr(dataUrl);
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function save() {
    if (!qr || saving) return;
    setSaving(true);
    try {
      const card = await composeCard(qr);
      const link = document.createElement("a");
      link.href = card;
      link.download = "爸比爱小狗.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-cream px-5 py-6 text-ink">
        <p className="text-sm tracking-widest text-mist">扫我</p>
        <div className="grid size-56 place-items-center">
          {qr ? (
            <img src={qr} alt="打开照片的二维码" className="size-full" />
          ) : (
            <p className="text-sm text-mist">{failed ? "刷新再试一次" : "正在生成"}</p>
          )}
        </div>
      </div>
      <button type="button" className="btn btn-primary" onClick={save} disabled={!qr || saving}>
        <Download aria-hidden="true" className="size-4" />
        {saving ? "正在保存" : "保存二维码"}
      </button>
      <a className="btn btn-ghost" href={fileHref} download="open.html">
        <Download aria-hidden="true" className="size-4" />
        下载网页文件
      </a>
    </div>
  );
}
