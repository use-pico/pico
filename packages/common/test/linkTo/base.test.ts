import { describe, expect, it } from "vitest";
import { linkTo } from "../../src";

describe("linkTo/base", () => {
	it("Just href", () => {
		const link = linkTo({
			href: "/foo/bar",
		});

		expect(link).toBe("/foo/bar");
	});

	it("Href with base", () => {
		const link = linkTo({
			base: "http://localhost:4098",
			href: "/foo/bar",
		});

		expect(link).toBe("http://localhost:4098/foo/bar");
	});

	it("Href with base and query", () => {
		const link = linkTo({
			base: "http://localhost:4098",
			href: "/foo/[id]/bar",
			query: {
				id: "123",
				extra: "foo",
			},
		});

		expect(link).toBe("http://localhost:4098/foo/123/bar?extra=foo");
	});

	it("Href with extended base and query", () => {
		const link = linkTo({
			base: "http://localhost:4098/bla",
			href: "/foo/[id]/bar",
			query: {
				id: "123",
				extra: "foo",
			},
		});

		expect(link).toBe("http://localhost:4098/bla/foo/123/bar?extra=foo");
	});

	it("Href with base and extra query", () => {
		const link = linkTo({
			base: "http://localhost:4098",
			href: "/foo/bar",
			query: {
				id: "123",
				extra: "foo",
			},
		});

		expect(link).toBe("http://localhost:4098/foo/bar?id=123&extra=foo");
	});
});
