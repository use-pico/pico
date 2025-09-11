/**
 * Deep-clone `liveRoot` and stamp runtime state into the clone
 * so its HTML reflects the current visual state.
 */
export function deepHtml(root: HTMLElement): HTMLElement {
	const cloneRoot = root.cloneNode(true) as HTMLElement;

	// --- INPUT ---
	{
		const live = root.querySelectorAll<HTMLInputElement>("input");
		const clone = cloneRoot.querySelectorAll<HTMLInputElement>("input");
		live.forEach((src, i) => {
			const dst = clone[i];
			if (!dst) {
				return;
			}

			// value (text/number/range/...)
			if (src.type !== "checkbox" && src.type !== "radio") {
				dst.setAttribute("value", src.value ?? "");
			}

			// checked (checkbox/radio)
			if (src.type === "checkbox" || src.type === "radio") {
				if (src.checked) {
					dst.setAttribute("checked", "");
				} else {
					dst.removeAttribute("checked");
				}
			}

			// indeterminate (checkbox visual state)
			if (src.type === "checkbox") {
				if ((src as any).indeterminate) {
					dst.setAttribute("data-indeterminate", "true");
				} else {
					dst.removeAttribute("data-indeterminate");
				}
			}

			// disabled / readonly (runtime toggles)
			if (src.disabled) {
				dst.setAttribute("disabled", "");
			} else {
				dst.removeAttribute("disabled");
			}
			if (src.readOnly) {
				dst.setAttribute("readonly", "");
			} else {
				dst.removeAttribute("readonly");
			}
		});
	}

	// --- TEXTAREA ---
	{
		const live = root.querySelectorAll<HTMLTextAreaElement>("textarea");
		const clone =
			cloneRoot.querySelectorAll<HTMLTextAreaElement>("textarea");
		live.forEach((src, i) => {
			const dst = clone[i];
			if (!dst) {
				return;
			}
			dst.textContent = src.value ?? "";

			if (src.disabled) {
				dst.setAttribute("disabled", "");
			} else {
				dst.removeAttribute("disabled");
			}
			if (src.readOnly) {
				dst.setAttribute("readonly", "");
			} else {
				dst.removeAttribute("readonly");
			}
		});
	}

	// --- SELECT / OPTION ---
	{
		const live = root.querySelectorAll<HTMLSelectElement>("select");
		const clone = cloneRoot.querySelectorAll<HTMLSelectElement>("select");
		live.forEach((src, i) => {
			const dst = clone[i];
			if (!dst) {
				return;
			}

			const isMultiple = src.multiple;
			const selected = new Set(
				Array.from(src.options)
					.filter((o) => o.selected)
					.map((o) => o.value),
			);

			Array.from(dst.options).forEach((opt) => {
				if (isMultiple) {
					if (selected.has(opt.value)) {
						opt.setAttribute("selected", "");
					} else {
						opt.removeAttribute("selected");
					}
				} else {
					if (src.value === opt.value) {
						opt.setAttribute("selected", "");
					} else {
						opt.removeAttribute("selected");
					}
				}
			});

			if (src.disabled) {
				dst.setAttribute("disabled", "");
			} else {
				dst.removeAttribute("disabled");
			}
		});
	}

	// --- DETAILS ---
	{
		const live = root.querySelectorAll<HTMLDetailsElement>("details");
		const clone = cloneRoot.querySelectorAll<HTMLDetailsElement>("details");
		live.forEach((src, i) => {
			const dst = clone[i];
			if (!dst) {
				return;
			}
			if (src.open) {
				dst.setAttribute("open", "");
			} else {
				dst.removeAttribute("open");
			}
		});
	}

	// --- DIALOG ---
	{
		const live = root.querySelectorAll<HTMLDialogElement>("dialog");
		const clone = cloneRoot.querySelectorAll<HTMLDialogElement>("dialog");
		live.forEach((src, i) => {
			const dst = clone[i];
			if (!dst) {
				return;
			}
			if (src.open) {
				dst.setAttribute("open", "");
			} else {
				dst.removeAttribute("open");
			}
		});
	}

	// --- OUTPUT (mirror .value into text) ---
	{
		const live = root.querySelectorAll<HTMLOutputElement>("output");
		const clone = cloneRoot.querySelectorAll<HTMLOutputElement>("output");
		live.forEach((src, i) => {
			const dst = clone[i];
			if (!dst) {
				return;
			}
			if (typeof (src as any).value === "string") {
				dst.textContent = (src as any).value as string;
			} else {
				dst.textContent = src.textContent ?? "";
			}
		});
	}

	// --- PROGRESS / METER (value is a property) ---
	{
		const liveP = root.querySelectorAll<HTMLProgressElement>("progress");
		const cloneP =
			cloneRoot.querySelectorAll<HTMLProgressElement>("progress");
		liveP.forEach((src, i) => {
			const dst = cloneP[i];
			if (!dst) {
				return;
			}
			if (!Number.isNaN(src.value)) {
				dst.setAttribute("value", String(src.value));
			} else {
				dst.removeAttribute("value");
			}
		});

		const liveM = root.querySelectorAll<HTMLMeterElement>("meter");
		const cloneM = cloneRoot.querySelectorAll<HTMLMeterElement>("meter");
		liveM.forEach((src, i) => {
			const dst = cloneM[i];
			if (!dst) {
				return;
			}
			if (!Number.isNaN(src.value)) {
				dst.setAttribute("value", String(src.value));
			} else {
				dst.removeAttribute("value");
			}
		});
	}

	// --- IMG: freeze chosen resource (handles lazy/srcset) ---
	{
		const live = root.querySelectorAll<HTMLImageElement>("img");
		const clone = cloneRoot.querySelectorAll<HTMLImageElement>("img");
		live.forEach((src, i) => {
			const dst = clone[i];
			if (!dst) {
				return;
			}
			if (src.currentSrc) {
				dst.setAttribute("src", src.currentSrc);
				dst.removeAttribute("srcset");
				dst.removeAttribute("sizes");
				dst.removeAttribute("loading");
			}
		});
	}

	// --- CANVAS → replace with IMG snapshot ---
	{
		const live = root.querySelectorAll<HTMLCanvasElement>("canvas");
		const clone = cloneRoot.querySelectorAll<HTMLCanvasElement>("canvas");
		live.forEach((src, i) => {
			const dst = clone[i];
			if (!dst) {
				return;
			}
			try {
				const dataUrl = src.toDataURL("image/png");
				const img = new Image();
				img.src = dataUrl;
				img.width = src.width;
				img.height = src.height;
				dst.replaceWith(img);
			} catch {
				// tainted canvas cannot be read; keep canvas
			}
		});
	}

	return cloneRoot;
}
