export const CellularReturnType = Object.freeze({
	CellValue: "CellValue",
	Distance: "Distance",
	Distance2: "Distance2",
	Distance2Add: "Distance2Add",
	Distance2Sub: "Distance2Sub",
	Distance2Mul: "Distance2Mul",
	Distance2Div: "Distance2Div",
});

export type CellularReturnType =
	(typeof CellularReturnType)[keyof typeof CellularReturnType];
