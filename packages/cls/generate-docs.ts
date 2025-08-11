#!/usr/bin/env bun

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

interface Subchapter {
	number: string;
	title: string;
	filename: string;
}

interface Chapter {
	number: number;
	title: string;
	subchapters: Subchapter[];
}

interface ToC {
	chapters: Chapter[];
}

function generateChapterIndex(
	chapter: Chapter,
	prevChapter?: Chapter,
	nextChapter?: Chapter,
): string {
	const toc = chapter.subchapters
		.map(
			(sub) =>
				`- [${sub.number} ${sub.title}](./${sub.number}-${sub.filename}.md)`,
		)
		.join("\n");

	const navigation: string[] = [];
	if (prevChapter) {
		navigation.push(
			`**Previous:** [Chapter ${prevChapter.number}: ${prevChapter.title}](../${String(prevChapter.number).padStart(2, "0")}-${prevChapter.title.toLowerCase().replace(/\s+/g, "-")}/index.md)`,
		);
	}
	if (nextChapter) {
		navigation.push(
			`**Next:** [Chapter ${nextChapter.number}: ${nextChapter.title}](../${String(nextChapter.number).padStart(2, "0")}-${nextChapter.title.toLowerCase().replace(/\s+/g, "-")}/index.md)`,
		);
	}

	return `# Chapter ${chapter.number}: ${chapter.title}

Welcome to the ${chapter.title} chapter! This chapter covers ${chapter.title.toLowerCase()} concepts and usage.

## Table of Contents
${toc}

---

${navigation.join(" | ")}
`;
}

function generateSubchapterContent(
	subchapter: Subchapter,
	chapter: Chapter,
	isFirst: boolean,
	isLast: boolean,
	toc: ToC,
): string {
	const localToc = chapter.subchapters
		.map((sub) => {
			const marker =
				sub.number === subchapter.number ? " *(current)*" : "";
			return `- [${sub.number} ${sub.title}](./${sub.number}-${sub.filename}.md)${marker}`;
		})
		.join("\n");

	const navigation: string[] = [];
	if (isFirst) {
		const prevChapter = toc.chapters.find(
			(ch) => ch.number === chapter.number - 1,
		);
		if (prevChapter) {
			navigation.push(
				`**Previous:** [Chapter ${prevChapter.number}: ${prevChapter.title}](../${String(prevChapter.number).padStart(2, "0")}-${prevChapter.title.toLowerCase().replace(/\s+/g, "-")}/index.md)`,
			);
		}
	} else {
		const prevSub =
			chapter.subchapters[
				chapter.subchapters.findIndex(
					(sub) => sub.number === subchapter.number,
				) - 1
			];
		navigation.push(
			`**Previous:** [${prevSub.number} ${prevSub.title}](./${prevSub.number}-${prevSub.filename}.md)`,
		);
	}

	if (isLast) {
		const nextChapter = toc.chapters.find(
			(ch) => ch.number === chapter.number + 1,
		);
		if (nextChapter) {
			navigation.push(
				`**Next:** [Chapter ${nextChapter.number}: ${nextChapter.title}](../${String(nextChapter.number).padStart(2, "0")}-${nextChapter.title.toLowerCase().replace(/\s+/g, "-")}/index.md)`,
			);
		}
	} else {
		const nextSub =
			chapter.subchapters[
				chapter.subchapters.findIndex(
					(sub) => sub.number === subchapter.number,
				) + 1
			];
		navigation.push(
			`**Next:** [${nextSub.number} ${nextSub.title}](./${nextSub.number}-${nextSub.filename}.md)`,
		);
	}

	return `# ${subchapter.number} ${subchapter.title}

## Table of Contents
${localToc}

[Content will be added here]

---

${navigation.join(" | ")}
`;
}

function generateMainIndex(toc: ToC): string {
	const chaptersList = toc.chapters
		.map(
			(chapter) =>
				`- [Chapter ${chapter.number}: ${chapter.title}](./${String(chapter.number).padStart(2, "0")}-${chapter.title.toLowerCase().replace(/\s+/g, "-")}/index.md)`,
		)
		.join("\n");

	return `# CLS Documentation

Welcome to the CLS documentation! This comprehensive guide covers everything you need to know about CLS.

## Table of Contents
${chaptersList}

---

**Start with:** [Chapter 1: Foundations](./01-foundations/index.md)
`;
}

function main() {
	try {
		// Read the ToC JSON file
		const tocContent = readFileSync("toc.json", "utf-8");
		const toc: ToC = JSON.parse(tocContent);

		// Create docs directory if it doesn't exist
		const docsDir = "docs";
		if (!existsSync(docsDir)) {
			mkdirSync(docsDir);
		}

		// Generate main index
		const mainIndex = generateMainIndex(toc);
		writeFileSync(join(docsDir, "index.md"), mainIndex);
		console.log("✅ Generated main index.md");

		// Generate each chapter
		toc.chapters.forEach((chapter, index) => {
			const chapterDir = join(
				docsDir,
				`${String(chapter.number).padStart(2, "0")}-${chapter.title.toLowerCase().replace(/\s+/g, "-")}`,
			);

			// Create chapter directory
			if (!existsSync(chapterDir)) {
				mkdirSync(chapterDir, {
					recursive: true,
				});
			}

			// Generate chapter index
			const prevChapter = index > 0 ? toc.chapters[index - 1] : undefined;
			const nextChapter =
				index < toc.chapters.length - 1
					? toc.chapters[index + 1]
					: undefined;
			const chapterIndex = generateChapterIndex(
				chapter,
				prevChapter,
				nextChapter,
			);
			writeFileSync(join(chapterDir, "index.md"), chapterIndex);

			// Generate subchapters
			chapter.subchapters.forEach((subchapter, subIndex) => {
				const isFirst = subIndex === 0;
				const isLast = subIndex === chapter.subchapters.length - 1;
				const subchapterContent = generateSubchapterContent(
					subchapter,
					chapter,
					isFirst,
					isLast,
					toc,
				);
				const filename = `${subchapter.number}-${subchapter.filename}.md`;
				writeFileSync(join(chapterDir, filename), subchapterContent);
			});

			console.log(
				`✅ Generated Chapter ${chapter.number}: ${chapter.title} (${chapter.subchapters.length} subchapters)`,
			);
		});

		console.log("\n🎉 Documentation structure generated successfully!");
		console.log(`📁 Total chapters: ${toc.chapters.length}`);
		console.log(
			`📄 Total subchapters: ${toc.chapters.reduce((sum, ch) => sum + ch.subchapters.length, 0)}`,
		);
	} catch (error) {
		console.error("❌ Error generating documentation:", error);
		process.exit(1);
	}
}

// Run the script
main();
