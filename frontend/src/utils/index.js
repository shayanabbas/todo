// Label normalization utility
export function normalizeLabels(labels, fallback = ['Unlabeled']) {
  if (Array.isArray(labels)) {
    const arr = labels.map(l => l.trim()).filter(Boolean);
    return arr.length ? arr : fallback;
  }
  if (typeof labels === 'string') {
    const arr = labels.split(',').map(l => l.trim()).filter(Boolean);
    return arr.length ? arr : fallback;
  }
  if (labels && typeof labels === 'object' && labels.label) {
    return [labels.label];
  }
  return fallback;
} 