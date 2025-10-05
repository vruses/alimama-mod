import { differenceInDays, format, subDays } from "date-fns";
import {
	getHalfMonthData,
	getHalfMonthDataSummary,
	getLastWeekData,
	getRealTimeDataSummary,
	getWeekDataSummary,
	getYeasterdayDataSummary,
} from "@/keyword-promotion/keyword.dto";
import type { KeywordData } from "@/keyword-promotion/type";
import ajaxHooker, { type XhrResponse } from "@/utils/ajaxHooker";

ajaxHooker.hook((request) => {
	if (request.url.includes("/report/query.json")) {
		// 值为0时为今日
		const payload = JSON.parse(request.data) as {
			startTime: string;
			endTime: string;
			splitType: "sum" | "day" | "hour";
			// 区分实时和昨日数据
			fromRealTime: boolean;
		};
		const diffDays =
			differenceInDays(new Date(payload.endTime), new Date(payload.startTime)) +
			1;
		const fromRealTime = payload.fromRealTime;
		const today = new Date();
		// data数据按时间正序从最早到最近排序，添加"2025-10-02"格式的thedate属性
		const getDataWithDate = (data: Partial<KeywordData>[]) => {
			return data.map((value, index) => {
				const currentDate = subDays(today, diffDays - index - 1);
				const thedate = format(currentDate, "yyyy-MM-dd");

				return {
					...value,
					thedate,
				};
			});
		};
		const splitType = payload.splitType;
		request.response = (res: XhrResponse) => {
			if (!res.responseText) return;
			// 今日数据
			if (diffDays === 1) {
				if (splitType === "sum") {
				} else if (splitType === "hour") {
				}
			}
			// 是否缺少数据?
			// 缺少数据:是否一条数据都没有：没有不能进行复制增量更新
			// 是否为sum，是否为day
			// 有day的话有日期
			// sum类型响应数组里只有一条数据
			if (splitType === "sum") {
				let dataSummary: Partial<KeywordData> = {};
				const result = JSON.parse(res.responseText);

				if (diffDays === 1) {
					dataSummary = fromRealTime
						? getRealTimeDataSummary()
						: getYeasterdayDataSummary();
				}
				if (diffDays === 7) {
					dataSummary = getWeekDataSummary();
				}
				if (diffDays === 15) {
					dataSummary = getHalfMonthDataSummary();
				}
				if (!result.data.list.length) {
					// 没有数据时
					result.data.list.push(dataSummary);
				} else {
					// 有数据时只替换对应属性
					result.data.list[0] = { ...result.data.list[0], ...dataSummary };
				}
				res.responseText = JSON.stringify(result);
				// day类型下可能会缺少或者直接返回空的数据，同时需要携带thedate日期属性
			} else if (splitType === "day") {
				let data: Partial<KeywordData>[] = [];
				const result = JSON.parse(res.responseText) as {
					data: {
						list: Partial<KeywordData>[];
					};
				};
				const dataLength = result.data.list.length;

				if (diffDays === 7 || diffDays === 15) {
					// 顺序：0-n，n为昨天
					data = diffDays === 7 ? getLastWeekData() : getHalfMonthData();
					// 添加thedate属性后返回
					const dataWithDate = getDataWithDate(data);
					// 数据长度最大时只需按日期顺序替换
					// 响应里0-6依次为昨日到6天前
					if (dataLength !== 0) {
						if (dataLength < diffDays && dataLength > 0) {
							// 缺少数据时,先复制第一份数据进行补齐，然后将时间及其它数据统一替换
							// 深拷贝第一个元素作为填充模板
							const first = JSON.stringify(result.data.list[0]);
							// 填充至数据最大长度
							while (result.data.list.length < diffDays) {
								result.data.list.push(JSON.parse(first));
							}
						}
						// 逆序保证对象数组里对应日期的其它属性不变
						const reversedData = dataWithDate.reverse();
						result.data.list = result.data.list.map((vo, index) => {
							return {
								...vo,
								...reversedData[index],
							};
						});
					} // 一条数据没有直接全部替换，此时不用考虑顺序问题
					else if (dataLength === 0) {
						result.data.list = dataWithDate;
					}
				}
				res.responseText = JSON.stringify(result);
			} else if (splitType === "hour") {
			}
		};
	}
});
