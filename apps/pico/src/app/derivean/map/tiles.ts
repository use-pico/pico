export const tiles: Record<string, any> = {
	// 🏔️ High Altitude
	snow: {
		id: "snow",
		level: "terrain",
		noise: 0.95,
		chance: 100,
		color: "#ffffff",
		elevation: 0.9,
	},
	icy_rock: {
		id: "icy_rock",
		level: "terrain",
		noise: 0.92,
		chance: 100,
		color: "#d9e5f3",
		elevation: 0.85,
	},
	cliff: {
		id: "cliff",
		level: "terrain",
		noise: 0.9,
		chance: 100,
		color: "#777777",
		elevation: 0.75,
	},

	// ⛰️ Mid-Altitude
	rocky_mountain: {
		id: "rocky_mountain",
		level: "terrain",
		noise: 0.875,
		chance: 100,
		color: "#999999",
		elevation: 0.8,
	},
	hill: {
		id: "hill",
		level: "terrain",
		noise: 0.7,
		chance: 100,
		color: "#20cc45",
		elevation: 0.5,
	},
	plateau: {
		id: "plateau",
		level: "terrain",
		noise: 0.65,
		chance: 100,
		color: "#b0a589",
		elevation: 0.6,
	},

	// 🌿 Lowlands
	grassland: {
		id: "grassland",
		level: "terrain",
		noise: 0.55,
		chance: 100,
		color: "#00cc00",
		elevation: 0.2,
	},
	forest: {
		id: "forest",
		level: "terrain",
		noise: 0.45,
		chance: 100,
		color: "#15dd33",
		elevation: 0.2,
	},

	// 🏝️ Coastal
	sand: {
		id: "sand",
		level: "terrain",
		noise: 0.25,
		chance: 40,
		color: "#ffff00",
		elevation: 0.05,
	},
	beach: {
		id: "beach",
		level: "terrain",
		noise: 0.2,
		chance: 100,
		color: "#ffcc00",
		elevation: 0.05,
	},

	// 🌊 Water
	shallow_water: {
		id: "shallow_water",
		level: "terrain",
		noise: 0.175,
		chance: 50,
		color: "#0099ff",
		elevation: 0.0,
	},
	deepwater: {
		id: "deepwater",
		level: "terrain",
		noise: 0.0,
		chance: 50,
		color: "#0000cc",
		elevation: 0.0,
	},
	river: {
		id: "river",
		level: "terrain",
		noise: 0,
		chance: 100,
		color: "#1e90ff",
		elevation: 0.0,
	},
};
