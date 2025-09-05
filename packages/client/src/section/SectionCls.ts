import { PicoCls } from "../cls/PicoCls";

export const SectionCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [],
		defaults: def.defaults({
			pica: "t",
		}),
	}),
);
