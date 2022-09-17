export const toTitleCase = (toTransform: string): string => {
  return toTransform.replace(/\b([a-z])/g, function (_, initial) {
    return initial.toUpperCase();
  });
};
