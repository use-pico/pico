import type { ChatCompletionMessageParam } from "@mlc-ai/web-llm";
import * as webllm from "@mlc-ai/web-llm";

export type CreateProps = {
	/** System prompt as parts that will be joined with "\n" */
	prompt: string[];
	/** Optional initial history (user/assistant messages) */
	messages?: ChatCompletionMessageParam[];
	/** Prefer specific model id; if not provided, we pick a small valid one */
	modelId?: string;
	/** Called during download/compile init */
	onProgress?: (report: { progress: number; text: string }) => void;
	tokens?: number;
};

/**
 * Create a WebLLM assistant and return an `ask` function.
 */
export async function create(props: CreateProps) {
	const {
		prompt,
		messages = [],
		modelId = "Qwen2.5-1.5B-Instruct-q4f32_1-MLC",
		onProgress,
		tokens = 96,
	} = props;

	// pick a valid model id if none provided
	const resolvedModelId =
		modelId ??
		((): string => {
			const candidates = webllm.prebuiltAppConfig.model_list.map(
				(m) => m.model_id,
			) as [
				string,
				...string[],
			];

			const preferred = [
				"Qwen2.5-1.5B-Instruct-q4f32_1-MLC",
				// "Phi-3.5-mini-instruct-q4f16_1-MLC",
				// "Llama-3.2-1B-Instruct-q4f32_1-MLC",
				"Llama-3.2-3B-Instruct-q4f32_1-MLC",
			];
			return (
				preferred.find((id) => candidates.includes(id)) ?? candidates[0]
			);
		})();

	const engine = await webllm.CreateMLCEngine(resolvedModelId, {
		initProgressCallback({ progress, text }) {
			onProgress?.({
				progress,
				text,
			});
		},
	});

	async function ask(userPrompt: string): Promise<any> {
		const resp = await engine.chat.completions.create({
			messages: [
				{
					role: "system",
					content: `
Always respond with a valid JSON object.

${prompt.join("\n")}

Rules:
- Output ONLY JSON (no prose).
- Do not invent unknown keys.
- Omit fields not requested.
`.trim(),
				},
				...messages,
				{
					role: "user",
					content: userPrompt,
				},
			],
			temperature: 0,
			top_p: 1,
			seed: 0,
			max_tokens: tokens,
			response_format: {
				type: "json_object",
			},
		});

		return JSON.parse(resp.choices?.[0]?.message?.content ?? "null");
	}

	return {
		engine,
		modelId: resolvedModelId,
		ask,
	} as const;
}
