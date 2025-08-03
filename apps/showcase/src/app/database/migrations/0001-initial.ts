import { genId } from "@use-pico/common";
import type { Migration } from "kysely";
import type { InventoryItemSchema } from "~/app/inventory/db/InventoryItemSchema";

// Dictionary of words for generating random names and descriptions
const words = [
	"Ancient",
	"Mystical",
	"Enchanted",
	"Radiant",
	"Shadow",
	"Crystal",
	"Golden",
	"Silver",
	"Bronze",
	"Iron",
	"Steel",
	"Obsidian",
	"Emerald",
	"Ruby",
	"Sapphire",
	"Diamond",
	"Amethyst",
	"Topaz",
	"Pearl",
	"Jade",
	"Onyx",
	"Garnet",
	"Opal",
	"Turquoise",
	"Scroll",
	"Potion",
	"Elixir",
	"Tome",
	"Wand",
	"Staff",
	"Sword",
	"Shield",
	"Helmet",
	"Armor",
	"Boots",
	"Gloves",
	"Ring",
	"Necklace",
	"Crown",
	"Scepter",
	"Orb",
	"Crystal",
	"Gem",
	"Stone",
	"Metal",
	"Wood",
	"Cloth",
	"Leather",
	"Magic",
	"Holy",
	"Dark",
	"Light",
	"Fire",
	"Ice",
	"Thunder",
	"Wind",
	"Earth",
	"Water",
	"Nature",
	"Arcane",
	"Divine",
	"Infernal",
	"Celestial",
	"Ethereal",
];

const generateRandomName = () => {
	const wordCount = Math.floor(Math.random() * 3) + 2; // 2-4 words
	const selectedWords = [];

	for (let i = 0; i < wordCount; i++) {
		const randomIndex = Math.floor(Math.random() * words.length);
		selectedWords.push(words[randomIndex]);
	}

	return selectedWords.join(" ");
};

const generateRandomDescription = () => {
	const wordCount = Math.floor(Math.random() * 3) + 2; // 2-4 words
	const selectedWords = [];

	for (let i = 0; i < wordCount; i++) {
		const randomIndex = Math.floor(Math.random() * words.length);
		selectedWords.push(words[randomIndex]);
	}

	return selectedWords.join(" ");
};

const generateSeedData = () => {
	const items = [];
	const kinds: InventoryItemSchema.Type["kind"][] = [
		"WEAPON",
		"ARMOR",
		"CONSUMABLE",
		"MAGICAL",
	];
	const types: InventoryItemSchema.Type["type"][] = [
		"COMMON",
		"RARE",
		"EPIC",
		"LEGENDARY",
	];

	for (let i = 0; i < 1024; i++) {
		const name = generateRandomName();
		const description =
			Math.random() > 0.3 ? generateRandomDescription() : null; // 70% chance of having description
		const amount = Math.floor(Math.random() * 1000) + 1; // 1-1000
		const kind = kinds[Math.floor(Math.random() * kinds.length)];
		const type = types[Math.floor(Math.random() * types.length)];

		items.push({
			id: genId(),
			name,
			description,
			amount,
			kind,
			type,
		});
	}

	return items;
};

export const InitialMigration: Migration = {
	async up(db) {
		await db.schema
			.createTable("InventoryItem")
			.addColumn("id", "text", (col) => col.primaryKey().notNull())
			.addColumn("name", "text", (col) => col.notNull())
			.addColumn("description", "text")
			.addColumn("amount", "integer", (col) => col.notNull())
			.addColumn("kind", "text", (col) => col.notNull())
			.addColumn("type", "text", (col) => col.notNull())
			.execute();

		await db
			.insertInto("InventoryItem")
			.values(generateSeedData())
			.execute();
	},
};
