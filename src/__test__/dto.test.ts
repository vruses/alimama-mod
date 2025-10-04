import { describe, it } from "vitest";
import { keyFieldMap } from "@/constants";
import {
	getHalfMonthDataSummary,
	getKeywordDataList,
	getWeekDataSummary,
} from "@/keyword-promotion/keyword.dto";

describe("getKeywordDataList", () => {
	it("log 输出结果", () => {
		const result = getKeywordDataList(keyFieldMap);
		console.log("🚀 输出结果:", result);
	});
});
describe("getWeekDataSummary", () => {
	it("log 输出结果", () => {
		const result = getWeekDataSummary();
		console.log("🚀 获取一周内综合数据结果:", result);
	});
});
describe("getHalfMonthDataSummary", () => {
	it("log 输出结果", () => {
		const result = getHalfMonthDataSummary();
		console.log("🚀 获取15天综合数据结果:", result);
	});
});
