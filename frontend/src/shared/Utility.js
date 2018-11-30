// To camel case
export const toCamelCase = (string) => {
  return string.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (char, index) => {
    if(+char === 0) return '';
    return index === 0 ? char.toLowerCase() : char.toUpperCase();
  });
}