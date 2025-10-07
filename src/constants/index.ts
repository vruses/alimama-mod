import type { Entries } from "type-fest";

/**
 * @license 过去15天的实时数据
 * @description 共六组数据，每组分别15条数据，每组第1条为今天，第1-7条为近七天，第1-15条为近15天
 * 每组数据按正序对应页面关键词属性：
 * 展现量、点击量、花费、点击率、平均点击花费、总成交金额
 */
export const adPreview = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
export const click = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
export const charge = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
export const ctr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
export const ecpc = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
export const payAmt = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

/**
 * @license 今日实时数据
 * @description 24条数据分别对应0-23时的今日数据
 */
export const adPreviewRT = [
	24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4,
	3, 2, 1,
];
export const clickRT = [
	24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4,
	3, 2, 1,
];
export const chargeRT = [
	24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4,
	3, 2, 1,
];
export const ctrRT = [
	24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4,
	3, 2, 1,
];
export const ecpcRT = [
	24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4,
	3, 2, 1,
];
export const payAmtRT = [
	24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4,
	3, 2, 1,
];

/**
 * @license 昨日实时数据
 * @description 24条数据分别对应0-23时的昨日数据
 */
export const adPreviewYT = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
	23, 24,
];
export const clickYT = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
	23, 24,
];
export const chargeYT = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
	23, 24,
];
export const ctrYT = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
	23, 24,
];
export const ecpcYT = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
	23, 24,
];
export const payAmtYT = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
	23, 24,
];

/**
 * 定义keyword属性与页面展示顺序的映射数组（与index一一对应）
 */
export const keyFieldIn = [
	"adPv",
	"click",
	"charge",
	"ctr",
	"ecpc",
	"alipayInshopAmt",
	"alipayInshopNum",
	"cvr",
	"cartInshopNum",
	"itemColInshopNum",
	"shopColDirNum",
	"colNum",
	"itemColInshopCost",
];

/**
 * 获取keyword属性与数据变量的映射关系
 * e.g. {adPv:[1,2,3],click:[1,2,3]}
 */
export const computeKeyFieldMap = (data: number[][], field: string[]) => {
	const keyFieldEntries = data.map((_, index) => {
		return [field[index], data[index]];
	});
	return Object.fromEntries(keyFieldEntries as Entries<{ string: number[] }>);
};

/**
 * keyword属性与数据变量的映射关系
 */
export const keyFieldMap = computeKeyFieldMap(
	[adPreview, click, charge, ctr, ecpc, payAmt],
	keyFieldIn,
);

/**
 * 今日实时keyword属性与数据变量的映射关系
 */
export const keyFieldMapRT = computeKeyFieldMap(
	[adPreviewRT, clickRT, chargeRT, ctrRT, ecpcRT, payAmtRT],
	keyFieldIn,
);

/**
 * 昨日实时keyword属性与数据变量的映射关系
 */
export const keyFieldMapYT = computeKeyFieldMap(
	[adPreviewYT, clickYT, chargeYT, ctrYT, ecpcYT, payAmtYT],
	keyFieldIn,
);
