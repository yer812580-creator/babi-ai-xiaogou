declare module "qrcode" {
  interface ToDataUrlOptions {
    errorCorrectionLevel?: "L" | "M" | "Q" | "H";
    margin?: number;
    width?: number;
    color?: { dark?: string; light?: string };
  }

  interface QRCodeStatic {
    toDataURL(text: string, options?: ToDataUrlOptions): Promise<string>;
  }

  const QRCode: QRCodeStatic;
  export default QRCode;
}
