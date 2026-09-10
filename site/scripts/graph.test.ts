import assert from "node:assert/strict";
import test from "node:test";
import { graphNodeColor, isGraphNodeVisible } from "../quartz/util/graphPolicy";

test("graph includes wiki entities and isolated documents, excluding support pages", () => {
  for (const slug of [
    "wiki/people/张三",
    "wiki/orgs/实验室",
    "wiki/companies/公司",
    "wiki/universities/清华大学",
    "wiki/awards/竞赛",
    "wiki/programs/项目",
    "wiki/investors/机构",
  ]) {
    assert.equal(isGraphNodeVisible(slug), true, slug);
  }
  for (const slug of [
    "index",
    "wiki/index",
    "wiki/",
    "wiki/log",
    "wiki/maps/观察池",
    "wiki/questions/待核",
    "raw/sources/来源",
    "references/规范",
    "tags/AI",
    "wiki/people/index",
    "wiki/people/",
    "wiki/people/catalog",
  ]) {
    assert.equal(isGraphNodeVisible(slug), false, slug);
  }
});

test("graph colors match Obsidian RGB values", () => {
  for (const [topic, rgb] of Object.entries({
    orgs: 14259862,
    awards: 14069084,
    people: 6070742,
    companies: 6084188,
    programs: 14048466,
    investors: 6053078,
    universities: 14373201,
  })) {
    assert.equal(
      graphNodeColor(`wiki/${topic}/节点`),
      `#${rgb.toString(16).padStart(6, "0")}`,
    );
  }
});
