export function removeHtmlTags(htmlString) {
  const sanitizedString = htmlString.replace(/<\/?[^>]+(>|$)/g, "");
  return sanitizedString;
}