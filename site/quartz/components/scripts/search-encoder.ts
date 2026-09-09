// Index words inside Chinese prose, using identical segmentation for queries.
const segmenter = new Intl.Segmenter("zh", { granularity: "word" })

export const encoder = (text: string): string[] => {
  const normalized = text.toLowerCase()
  return [...new Set(
    Array.from(segmenter.segment(normalized))
      .filter((part) => part.isWordLike)
      .map((part) => part.segment),
  )]
}
