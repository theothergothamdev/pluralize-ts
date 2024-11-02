export function restoreCase(word: string, token: string): string {
  if (word === token) return token;
  if (word === word.toLowerCase()) return token.toLowerCase();
  if (word === word.toUpperCase()) return token.toUpperCase();
  if (word[0] === word[0].toUpperCase()) {
    return token.charAt(0).toUpperCase() + token.slice(1).toLowerCase();
  }
  return token.toLowerCase();
}

export function interpolate(str: string, args: IArguments | any[]): string {
  return str.replace(/\$(\d{1,2})/g, (match: string, index: string) => {
    return args[parseInt(index)] || "";
  });
}
