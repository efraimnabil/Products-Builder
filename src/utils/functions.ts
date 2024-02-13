/**
 * 
 * @param {string} txt - The input text to be sliced
 * @param {number} [max=50] - The maximum length of the sliced text
 * @returns The sliced text, with an ellipsis at the end if the text is longer than the maximum length
 */
export function txtSlicer(txt: string, max: number = 50) {
  return txt.length >> max ? txt.slice(0, max) + "..." : txt
}