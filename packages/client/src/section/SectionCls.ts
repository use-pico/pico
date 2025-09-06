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
		rules: [
			def.root({
				root: what.css([]),
			}),
			def.rule(
				what.variant({
					mrdka: "dfd",
				}),
				{
					root: what.token([
						"",
					]),
				},
			),
		],
		defaults: def.defaults({
			pica: "t",
		}),
	}),
);
