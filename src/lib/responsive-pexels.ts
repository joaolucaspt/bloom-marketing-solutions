/**
 * Builds responsive srcSet candidates for images served by the Pexels image CDN.
 * Width variants keep the same photo and transforms while letting the browser choose
 * an appropriate download for the rendered size and pixel density.
 */
export function responsivePexelsSrcSet(src: string, widths: number[]): string {
  return widths
    .map((width) => `${src.replace(/w=\d+/, `w=${width}`)} ${width}w`)
    .join(", ");
}
