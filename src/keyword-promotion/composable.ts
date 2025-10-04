import { differenceInDays } from "date-fns";
import { getDataHandler } from "@/keyword-promotion/keyword.dto";
import ajaxHooker, { type XhrResponse } from "@/utils/ajaxHooker";

ajaxHooker.hook((request) => {
	if (request.url.includes("/report/query.json")) {
		// 值为0时为今日
		const payload = JSON.parse(request.data) as {
			startTime: string;
			endTime: string;
			splitType: "sum" | "day" | "hour";
		};
		const diffDays =
			differenceInDays(new Date(payload.endTime), new Date(payload.startTime)) +
			1;
		const splitType = payload.splitType;
		request.response = (res: XhrResponse) => {
			// 今日数据
			if (diffDays === 1) {
				if (splitType === "sum") {
					getDataHandler(1, "sum");
				} else if (splitType === "hour") {
					getDataHandler(1, "hour");
				}
			}
			// 7日或者15日数据
			if (diffDays === 7 || diffDays === 15) {
				if (splitType === "hour") return;
				getDataHandler(diffDays, splitType);
			}
			res.responseText = "";
		};
	}
});
