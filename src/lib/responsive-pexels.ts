/**
 * Builds responsive srcSet candidates for source images served by the Pexels image CDN.
 * Width variants preserve the same photo and transformation options while allowing
 * the browser to select an appropriate download for the rendered size and pixel density.
 */
export function responsivePexelsSrcSet(src: string, widths: number[]): string {
  return widths
    .map((width) => `${src.replace(/w=\\d+/, `w=${width}`)} ${width}w`)
    .join(", ");
}
