export const toWebp64 = async (image: File) => {
	return new Promise<string>((resolve, reject) => {
		const img = new Image();
		img.src = URL.createObjectURL(image);
		img.onload = () => {
			const canvas = document.createElement("canvas");
			canvas.width = img.width;
			canvas.height = img.height;
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.drawImage(img, 0, 0);

				return resolve(canvas.toDataURL("image/webp", 1.0));
			}
			reject(new Error("Failed to convert image to WebP-64"));
		};
		img.onerror = () => {
			reject(new Error("Failed to load image"));
		};
	});
};
