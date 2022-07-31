export function chance(percentage: number): boolean {
  const value = Math.floor(Math.random() * 100 + 1);

  return value <= percentage;
}
