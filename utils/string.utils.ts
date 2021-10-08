import makeSlug from "slugify";

export const slugify = (val: string): string => {
  return makeSlug(val, {
    replacement: "-",
    lower: true,
    strict: true,
    trim: true,
  });
};
