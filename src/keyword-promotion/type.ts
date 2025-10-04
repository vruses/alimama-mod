import type { Simplify } from "type-fest";

/**
 * 关键词推广数据
 */
export interface KeywordData {
	/**展现量 */
	adPv: number;
	/**点击量 */
	click: number;
	/**花费 */
	charge: number;
	/**点击率 */
	ctr: number;
	/**平均点击花费 */
	ecpc: number;
	/**总成交金额 */
	alipayInshopAmt: number;
	alipayInshopNum: number;
	cvr: number;
	cartInshopNum: number;
	itemColInshopNum: number;
	shopColDirNum: number;
	colNum: number;
	itemColInshopCost: number;
	special_campaign_filter: number;
	memberId: number;
}
export type KeyField = Simplify<keyof KeywordData>;
