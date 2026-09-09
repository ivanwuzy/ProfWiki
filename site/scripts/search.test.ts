import test from "node:test"
import assert from "node:assert/strict"
import FlexSearch from "flexsearch"
import { encoder } from "../quartz/components/scripts/search-encoder"

test("search finds Chinese words inside prose and preserves names and acronyms", () => {
  const index = new FlexSearch.Index({ encode: encoder, tokenize: "forward" })
  index.add(1, "研究方向涉及具身智能与机器人控制，来自清华大学。")
  index.add(2, "陈建宇")
  index.add(3, "AIR 研究团队")
  assert.ok(index.search("机器人").includes(1))
  assert.ok(index.search("清华大学").includes(1))
  assert.ok(index.search("陈建宇").includes(2))
  assert.ok(index.search("air").includes(3))
})
