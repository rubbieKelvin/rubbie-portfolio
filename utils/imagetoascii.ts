// TODO: might delete this file

export type ASCIIOptions = {
  asciiWidth?: number;
  brightness?: number;
  contrast?: number;
  blur?: number;
  dithering?: boolean;
  ditherAlgorithm?: "floyd" | "atkinson" | "noise" | "ordered";
  invert?: boolean;
  ignoreWhite?: boolean;
  charset?: "standard" | "blocks" | "binary" | "hex" | "detailed";
};

// Clamp a value between min and max.
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

// Generate standard ASCII art
export function generateASCII(
  img: HTMLImageElement,
  options?: ASCIIOptions
): string {
  const canvas = document.createElement("canvas");

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Failed to create canvas context");
  }

  const asciiWidth = options?.asciiWidth ?? 100;
  const brightness = options?.brightness ?? 0;
  const contrastValue = options?.contrast ?? 0;
  const blurValue = options?.blur ?? 0;
  const ditheringEnabled = options?.dithering ?? true;
  const ditherAlgorithm = options?.ditherAlgorithm ?? "floyd";
  const invertEnabled = options?.invert ?? false;
  const ignoreWhite = options?.ignoreWhite ?? true;
  const charset = options?.charset ?? "standard";

  let gradient;
  switch (charset) {
    case "standard":
      gradient = "@%#*+=-:.";
      break;
    case "blocks":
      gradient = "█▓▒░ ";
      break;
    case "binary":
      gradient = "01";
      break;
    case "hex":
      gradient = "0123456789ABCDEF";
      break;
    case "detailed":
    default:
      gradient =
        "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'.";
      break;
  }

  const nLevels = gradient.length;
  const contrastFactor =
    (259 * (contrastValue + 255)) / (255 * (259 - contrastValue));
  const fontAspectRatio = 0.55;
  const asciiHeight = Math.round(
    (img.height / img.width) * asciiWidth * fontAspectRatio
  );

  canvas.width = asciiWidth;
  canvas.height = asciiHeight;
  ctx.filter = blurValue > 0 ? `blur(${blurValue}px)` : "none";
  ctx.drawImage(img, 0, 0, asciiWidth, asciiHeight);

  const imageData = ctx.getImageData(0, 0, asciiWidth, asciiHeight);
  const data = imageData.data;

  const gray: number[] = [];
  const grayOriginal: number[] = [];

  for (let i = 0; i < data.length; i += 4) {
    let lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    if (invertEnabled) lum = 255 - lum;
    const adjusted = clamp(
      contrastFactor * (lum - 128) + 128 + brightness,
      0,
      255
    );
    gray.push(adjusted);
    grayOriginal.push(adjusted);
  }

  let ascii = "";

  if (ditheringEnabled) {
    if (ditherAlgorithm === "floyd") {
      // Floyd–Steinberg dithering
      for (let y = 0; y < asciiHeight; y++) {
        let line = "";

        for (let x = 0; x < asciiWidth; x++) {
          const idx = y * asciiWidth + x;
          if (ignoreWhite && grayOriginal[idx] === 255) {
            line += " ";
            continue;
          }
          const computedLevel = Math.round((gray[idx] / 255) * (nLevels - 1));
          line += gradient.charAt(computedLevel);
          const newPixel = (computedLevel / (nLevels - 1)) * 255;
          const error = gray[idx] - newPixel;
          if (x + 1 < asciiWidth) {
            gray[idx + 1] = clamp(gray[idx + 1] + error * (7 / 16), 0, 255);
          }
          if (x - 1 >= 0 && y + 1 < asciiHeight) {
            gray[idx - 1 + asciiWidth] = clamp(
              gray[idx - 1 + asciiWidth] + error * (3 / 16),
              0,
              255
            );
          }
          if (y + 1 < asciiHeight) {
            gray[idx + asciiWidth] = clamp(
              gray[idx + asciiWidth] + error * (5 / 16),
              0,
              255
            );
          }
          if (x + 1 < asciiWidth && y + 1 < asciiHeight) {
            gray[idx + asciiWidth + 1] = clamp(
              gray[idx + asciiWidth + 1] + error * (1 / 16),
              0,
              255
            );
          }
        }
        ascii += line + "\n";
      }
    } else if (ditherAlgorithm === "atkinson") {
      // Atkinson dithering
      for (let y = 0; y < asciiHeight; y++) {
        let line = "";
        for (let x = 0; x < asciiWidth; x++) {
          const idx = y * asciiWidth + x;
          if (ignoreWhite && grayOriginal[idx] === 255) {
            line += " ";
            continue;
          }
          const computedLevel = Math.round((gray[idx] / 255) * (nLevels - 1));
          line += gradient.charAt(computedLevel);
          const newPixel = (computedLevel / (nLevels - 1)) * 255;
          const error = gray[idx] - newPixel;
          const diffusion = error / 8;
          if (x + 1 < asciiWidth) {
            gray[idx + 1] = clamp(gray[idx + 1] + diffusion, 0, 255);
          }
          if (x + 2 < asciiWidth) {
            gray[idx + 2] = clamp(gray[idx + 2] + diffusion, 0, 255);
          }
          if (y + 1 < asciiHeight) {
            if (x - 1 >= 0) {
              gray[idx - 1 + asciiWidth] = clamp(
                gray[idx - 1 + asciiWidth] + diffusion,
                0,
                255
              );
            }
            gray[idx + asciiWidth] = clamp(
              gray[idx + asciiWidth] + diffusion,
              0,
              255
            );
            if (x + 1 < asciiWidth) {
              gray[idx + asciiWidth + 1] = clamp(
                gray[idx + asciiWidth + 1] + diffusion,
                0,
                255
              );
            }
          }
          if (y + 2 < asciiHeight) {
            gray[idx + 2 * asciiWidth] = clamp(
              gray[idx + 2 * asciiWidth] + diffusion,
              0,
              255
            );
          }
        }
        ascii += line + "\n";
      }
    } else if (ditherAlgorithm === "noise") {
      // Noise dithering
      for (let y = 0; y < asciiHeight; y++) {
        let line = "";
        for (let x = 0; x < asciiWidth; x++) {
          const idx = y * asciiWidth + x;
          if (ignoreWhite && grayOriginal[idx] === 255) {
            line += " ";
            continue;
          }
          const noise = (Math.random() - 0.5) * (255 / nLevels);
          const noisyValue = clamp(gray[idx] + noise, 0, 255);
          const computedLevel = Math.round((noisyValue / 255) * (nLevels - 1));
          line += gradient.charAt(computedLevel);
        }
        ascii += line + "\n";
      }
    } else if (ditherAlgorithm === "ordered") {
      // Ordered dithering using a 4x4 Bayer matrix.
      const bayer = [
        [0, 8, 2, 10],
        [12, 4, 14, 6],
        [3, 11, 1, 9],
        [15, 7, 13, 5],
      ];
      const matrixSize = 4;
      for (let y = 0; y < asciiHeight; y++) {
        let line = "";
        for (let x = 0; x < asciiWidth; x++) {
          const idx = y * asciiWidth + x;
          if (ignoreWhite && grayOriginal[idx] === 255) {
            line += " ";
            continue;
          }
          const p = gray[idx] / 255;
          const t =
            (bayer[y % matrixSize][x % matrixSize] + 0.5) /
            (matrixSize * matrixSize);
          let valueWithDither = p + t - 0.5;
          valueWithDither = Math.min(Math.max(valueWithDither, 0), 1);
          let computedLevel = Math.floor(valueWithDither * nLevels);
          if (computedLevel >= nLevels) computedLevel = nLevels - 1;
          line += gradient.charAt(computedLevel);
        }
        ascii += line + "\n";
      }
    }
  } else {
    // Simple mapping without dithering.
    for (let y = 0; y < asciiHeight; y++) {
      let line = "";
      for (let x = 0; x < asciiWidth; x++) {
        const idx = y * asciiWidth + x;
        if (ignoreWhite && grayOriginal[idx] === 255) {
          line += " ";
          continue;
        }
        const computedLevel = Math.round((gray[idx] / 255) * (nLevels - 1));
        line += gradient.charAt(computedLevel);
      }
      ascii += line + "\n";
    }
  }
  return ascii;
}
