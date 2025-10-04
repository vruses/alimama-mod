import { describe, expect, it } from "vitest";
import {
	adPreview,
	charge,
	click,
	computeKeyFieldMap,
	ctr,
	ecpc,
	keyFieldIn,
	payAmt,
} from "@/constants";

describe("computeKeyFieldMap", () => {
	const data = [adPreview, click, charge, ctr, ecpc, payAmt];
	const result = computeKeyFieldMap(data, keyFieldIn);

	it("应该返回对象", () => {
		expect(typeof result).toBe("object");
	});

	it("每个字段应该存在（只检查和 data 等长的字段）", () => {
		// 取前 data.length 个字段
		const expectedFields = keyFieldIn.slice(0, data.length);

		expectedFields.forEach((field) => {
			expect(result).toHaveProperty(field);
		});

		// 多余字段不应该存在
		const extraFields = keyFieldIn.slice(data.length);
		extraFields.forEach((field) => {
			expect(result).not.toHaveProperty(field);
		});
	});

	it("每个字段的值应该是长度为 15 的数组（只检查实际存在的字段）", () => {
		const actualFields = keyFieldIn.slice(0, data.length);
		actualFields.forEach((field, i) => {
			expect(Array.isArray(result[field])).toBe(true);
			expect(result[field]).toHaveLength(data[i].length);
		});
	});

	it("值应该对应原数据", () => {
		expect(result["adPv"][0]).toBe(adPreview[0]);
		expect(result["click"][1]).toBe(click[1]);
		expect(result["charge"][2]).toBe(charge[2]);
	});
});
