export function containsName(names: string[], filterValue: string) {
  const lowercaseNames = names.map((name) => name.toLowerCase());

  return filterValue
    .toLowerCase()
    .trim()
    .split(' ')
    .every((word) =>
      lowercaseNames.some(
        (name) => name.includes(word) || name.replace(/ /g, '').includes(word)
      )
    );
}
