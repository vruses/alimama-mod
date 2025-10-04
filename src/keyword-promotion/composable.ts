import ajaxHooker, { type XhrResponse } from "@/utils/ajaxHooker";

ajaxHooker.hook((request) => {
	if (request.url.includes("/report/query.json")) {
		request.response = (res: XhrResponse) => {};
	}
});
