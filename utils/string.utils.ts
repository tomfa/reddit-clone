export const slugify = (val: string): string => {
  return val.replace(' ', '-').toLowerCase();
}
