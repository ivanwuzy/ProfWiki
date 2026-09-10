// Mirrors .obsidian/graph.json. Keep this public policy independent of private editor settings.
export const graphNodeColors: Record<string, string> = {
  orgs: "#d99696",
  awards: "#d6ad5c",
  people: "#5ca1d6",
  companies: "#5cd65c",
  programs: "#d65cd2",
  investors: "#5c5cd6",
  universities: "#db5151",
};

export function isGraphNodeVisible(slug: string): boolean {
  const parts = slug.split("/");
  const filename = parts.at(-1) ?? "";
  // Quartz generates folder index pages; these are not Obsidian document nodes.
  return (
    parts[0] === "wiki" &&
    parts.length >= 3 &&
    !["maps", "questions"].includes(parts[1]) &&
    filename !== "" &&
    !/index|log/i.test(filename)
  );
}

export function graphNodeColor(slug: string): string {
  return (
    graphNodeColors[slug.startsWith("wiki/") ? slug.split("/")[1] : ""] ??
    "#9ca3af"
  );
}
