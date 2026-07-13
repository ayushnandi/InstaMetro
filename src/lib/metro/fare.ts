const SLABS = [
  { maxStops: 2,        fare: 1000 },
  { maxStops: 5,        fare: 2000 },
  { maxStops: 12,       fare: 3000 },
  { maxStops: 21,       fare: 4000 },
  { maxStops: 32,       fare: 5000 },
  { maxStops: Infinity, fare: 6000 },
];

export function computeFare(totalStops: number): number {
  for (const slab of SLABS) {
    if (totalStops <= slab.maxStops) return slab.fare;
  }
  return 6000;
}
