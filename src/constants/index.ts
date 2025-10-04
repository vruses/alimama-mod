import type { Entries } from "type-fest";

/**
 * @license
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
 * @license
 * @description 24条数据分别对应0-23时的今日数据
 */
export const adPreviewRT = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
export const clickRT = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
export const chargeRT = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
export const ctrRT = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
export const ecpcRT = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
export const payAmtRT = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

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
