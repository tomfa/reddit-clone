import makeSlug from "slugify";

export const slugify = (val: string): string => {
  return makeSlug(val, {
    replacement: "-",
    lower: true,
    strict: true,
    trim: true,
  });
};

export const getLongestUrl = (val: string): string | undefined =>
  val.match(/\bhttps?:\/\/\S+/gi)?.sort((a, b) => b.length - a.length)[0];
