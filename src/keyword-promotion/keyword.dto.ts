import { zipToObject } from "radash";
import { keyFieldMap, keyFieldMapRT, keyFieldMapYT } from "@/constants";
import type { KeyField, KeywordData } from "@/keyword-promotion/type";

/**
 * 将一个键名对应数组的对象转化为对象数组。
 *
 * @description
 * 假设输入对象中每个键对应一个长度相同的数值数组，
 * 本函数会“按索引对齐”合并为对象数组。

 * @param {Record<string, number[]>} keyFieldMap - 键为字段名、值为数值数组的对象。
 * 每个数组长度应当相同。
 *
 * @returns {Array<KeywordData>}
 * 一个对象数组，每个对象的键为输入对象的键名，值为各数组相同索引处的元素。
 *
 * @example
 * const data = {
 *   click: [10, 20, 30],
 *   view: [100, 200, 300]
 * }
 * getKeywordDataList(data)
 * // =>
 * // [
 * //   { click: 10, view: 100 },
 * //   { click: 20, view: 200 },
 * //   { click: 30, view: 300 }
 * // ]
 */
export const getKeywordDataList = (keyFieldMap: { [K: string]: number[] }) => {
	// 获取键名
	const keys = Object.keys(keyFieldMap);
	const values = Object.values(keyFieldMap) as [number[], number[]];
	return values[0].map((_, i) =>
		zipToObject(
			keys,
			values.map((arr) => arr[i]),
		),
	) as unknown as Array<KeywordData>;
};

/**
 * 获取近7天数据
 */
export const getLastWeekData = () => {
	return getKeywordDataList(keyFieldMap).slice(-7);
};

/**
 * 获取近15天数据
 */
export const getHalfMonthData = () => {
	return getKeywordDataList(keyFieldMap);
};

/**
 * 获取今日数据,动态给出实时的数据0h-now
 */
export const getRealTimeData = () => {
	// 获取当前小时（0-23）实时返回对应长度数据
	const currentHour = new Date().getHours();
	return getKeywordDataList(keyFieldMapRT).slice(0, currentHour);
};

/**
 * 获取昨日数据,动态给出实时的数据0h-now
 */
export const getYesterdayData = () => {
	return getKeywordDataList(keyFieldMapYT);
};

/**
 * 计算综合数据
 */
export const computeDataSummary = (data: KeywordData[]) => {
	const sumFields: KeyField[] = ["adPv", "click", "charge", "alipayInshopAmt"];
	const avgFields: KeyField[] = ["ecpc", "ctr"];
	const summary: Partial<KeywordData> = {};
	// 初始化累加器
	sumFields.forEach((key) => {
		summary[key] = 0;
	});
	avgFields.forEach((key) => {
		summary[key] = 0;
	});
	const len = data.length;
	if (len === 0) return summary;

	// 累加
	data.forEach((item) => {
		sumFields.forEach((key) => {
			summary[key]! += item[key];
		});
		avgFields.forEach((key) => {
			summary[key]! += item[key] / len;
		});
	});

	return summary;
};

/**
 * 获取7天综合数据
 */
export const getWeekDataSummary = () => {
	return computeDataSummary(getLastWeekData());
};

/**
 * 获取15天综合数据
 */
export const getHalfMonthDataSummary = () => {
	return computeDataSummary(getHalfMonthData());
};

/**
 * 获取24h综合数据
 */
export const getRealTimeDataSummary = () => {
	return computeDataSummary(getRealTimeData());
};

/**
 * 获取昨日的综合数据，通过昨日曲线数据计算
 */
export const getYesterdayDataSummary = () => {
	return computeDataSummary(getYesterdayData());
};

/**
 * 根据筛选日期和是否汇总返回不同的处理函数
 */
export function getDataHandler(
	diffDays: 1,
	splitType: "sum" | "hour",
): (() => void) | undefined;
export function getDataHandler(
	diffDays: 7 | 15,
	splitType: "sum" | "day",
): (() => void) | undefined;
// 函数实现
export function getDataHandler(
	diffDays: 1 | 7 | 15,
	splitType: "sum" | "day" | "hour",
) {
	const dataHandlerMap = {
		1: {
			sum: getRealTimeDataSummary,
			hour: getRealTimeData,
		},
		7: {
			sum: getWeekDataSummary,
			day: getLastWeekData,
		},
		15: {
			sum: getHalfMonthDataSummary,
			day: getHalfMonthData,
		},
	};

	// 先检查diffDays是否存在
	const dayHandlers = dataHandlerMap[diffDays];
	if (!dayHandlers) throw new Error("无对应函数");

	// 再检查splitType是否存在
	const handler = dayHandlers[splitType as keyof typeof dayHandlers];
	return handler;
}
