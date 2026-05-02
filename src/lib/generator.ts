import baseSpecs from "@/data/baseSpecs.json";

export interface GeneratedSpec {
  id: number;
  category: string;
  categoryLabel: string;
  spec: string;
}

interface CategoryData {
  label: string;
  template: string;
  variables: Record<string, string[]>;
}

interface BaseSpecsData {
  categories: Record<string, CategoryData>;
}

const specsData = baseSpecs as unknown as BaseSpecsData;

const specCache = new Map<string, GeneratedSpec[]>();

function getCacheKey(category: string | null, limit: number): string {
  return `${category ?? "all"}:${limit}`;
}

function cartesianProductLazy(
  arrays: string[][],
  limit: number
): string[][] {
  if (!arrays || arrays.length === 0) return [[]];

  const results: string[][] = [];
  const indices = new Array(arrays.length).fill(0);

  while (results.length < limit) {
    const combination = arrays.map((arr, i) => arr[indices[i]]);
    results.push(combination);

    let carryIndex = arrays.length - 1;
    while (carryIndex >= 0) {
      indices[carryIndex]++;
      if (indices[carryIndex] < arrays[carryIndex].length) {
        break;
      }
      indices[carryIndex] = 0;
      carryIndex--;
    }

    if (carryIndex < 0) break;
  }

  return results;
}

function replacePlaceholders(
  template: string,
  replacements: Record<string, string>
): string {
  let result = template;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, "g"), value);
  }
  return result;
}

function generateCategorySpecs(
  categoryKey: string,
  categoryData: CategoryData,
  limit: number
): GeneratedSpec[] {
  const keys = Object.keys(categoryData.variables);
  const valueArrays = keys.map((key) => categoryData.variables[key]);
  const combinations = cartesianProductLazy(valueArrays, limit);

  const specs: GeneratedSpec[] = [];
  const seen = new Set<string>();

  for (const combination of combinations) {
    if (specs.length >= limit) break;

    const replacements: Record<string, string> = {};
    keys.forEach((key, index) => {
      replacements[key] = combination[index];
    });

    const specText = replacePlaceholders(categoryData.template, replacements);

    if (!seen.has(specText)) {
      seen.add(specText);
      specs.push({
        id: specs.length + 1,
        category: categoryKey,
        categoryLabel: categoryData.label,
        spec: specText,
      });
    }
  }

  return specs;
}

export function getCategories(): { key: string; label: string }[] {
  return Object.entries(specsData.categories).map(([key, data]) => ({
    key,
    label: data.label,
  }));
}

export function generateSpecs(
  categoryFilter: string | null,
  limit: number
): GeneratedSpec[] {
  const cacheKey = getCacheKey(categoryFilter, limit);
  if (specCache.has(cacheKey)) {
    return specCache.get(cacheKey)!;
  }

  const allSpecs: GeneratedSpec[] = [];
  const seen = new Set<string>();
  const categories = categoryFilter
    ? { [categoryFilter]: specsData.categories[categoryFilter] }
    : specsData.categories;

  const specsPerCategory = Math.ceil(limit / Object.keys(categories).length);

  for (const [key, data] of Object.entries(categories)) {
    const categorySpecs = generateCategorySpecs(key, data, specsPerCategory);

    for (const spec of categorySpecs) {
      if (allSpecs.length >= limit) break;
      if (seen.has(spec.spec)) continue;
      seen.add(spec.spec);
      allSpecs.push(spec);
    }

    if (allSpecs.length >= limit) break;
  }

  specCache.set(cacheKey, allSpecs);
  return allSpecs;
}

export function clearCache() {
  specCache.clear();
}
