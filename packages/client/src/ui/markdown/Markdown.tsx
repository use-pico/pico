import { Typo } from "@use-pico/client/ui/typo";
import { tvc } from "@use-pico/cls";
import type { ComponentProps, FC } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { uiButton } from "../button";
import { Container, uiContainer } from "../container";
import { uiMarkdown } from "./uiMarkdown";

export namespace Markdown {
	export interface Components {
		h1?: Typo.PropsEx;
		h2?: Typo.PropsEx;
		a?: uiButton.Component<{}>;
		p?: Container.Props;
		strong?: Typo.PropsEx;
	}

	export interface Props
		extends uiMarkdown.Component<
			Omit<ComponentProps<typeof ReactMarkdown>, "components">
		> {
		components?: Components;
	}
}

export const Markdown: FC<Markdown.Props> = ({
	ui,
	className,
	components,
	...props
}) => {
	/**
	 * Wrapper div is used only to setup global CSS variables on top of inner components of markdown.
	 */
	return (
		<div
			{...uiMarkdown({
				ui,
				className,
			})}
		>
			<ReactMarkdown
				skipHtml
				remarkPlugins={[
					remarkGfm,
				]}
				components={{
					h1({ children }) {
						return (
							<Typo
								label={children}
								ui={{
									text: "xl",
									font: "bold",
								}}
								{...components?.h1}
							/>
						);
					},
					h2({ children }) {
						return (
							<Typo
								label={children}
								ui={{
									text: "lg",
									font: "normal",
								}}
								{...components?.h2}
							/>
						);
					},
					a(props) {
						return (
							<a
								{...props}
								target="_blank"
								rel="noopener noreferrer"
								{...uiButton({
									ui: components?.a?.ui,
									className: components?.a?.className ?? [],
								})}
							/>
						);
					},
					p({ children }) {
						return (
							<Container
								className={"py-1"}
								{...components?.p}
							>
								{children}
							</Container>
						);
					},
					strong({ children }) {
						return (
							<Typo
								label={children}
								ui={{
									font: "bold",
								}}
								{...components?.strong}
							/>
						);
					},
					blockquote({ children }) {
						return (
							<blockquote
								{...uiContainer({
									className: [],
								})}
							>
								{children}
							</blockquote>
						);
					},
					em({ children }) {
						return (
							<Typo
								label={children}
								ui={{
									italic: true,
								}}
							/>
						);
					},
					ul({ children }) {
						return <ul>{children}</ul>;
					},
					hr() {
						return (
							<div
								className={tvc([
									"border-t",
									"h-px",
									"w-full",
									"my-4",
								])}
								{...uiContainer({
									ui: {
										background: "default",
									},
									className: [],
								})}
							/>
						);
					},
				}}
				{...props}
			/>
		</div>
	);
};
