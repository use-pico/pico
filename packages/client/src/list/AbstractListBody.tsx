import type { EntitySchema, withQuerySchema } from "@use-pico/common";
import { AnimatePresence, motion, type Variants } from "motion/react";
import type { withQuery } from "../source/withQuery";
import type { AbstractList } from "./AbstractList";
import type { AbstractListCls } from "./AbstractListCls";

export namespace AbstractListBody {
	export interface Props<
		TQuery extends withQuerySchema.Query,
		TItem extends EntitySchema.Type,
	> {
		withQuery: withQuery.Api<TQuery, TItem[]>;
		query: TQuery;
		slots: AbstractListCls.Slots;
		renderHeader: AbstractList.Header.Render<TItem>;
		renderItem: AbstractList.Item.Render<TItem>;
		renderFooter: AbstractList.Footer.Render<TItem>;
		renderEmpty: AbstractList.Empty.Render;
		renderError: AbstractList.Error.Render;
	}
}

export const AbstractListBody = <
	TQuery extends withQuerySchema.Query,
	TItem extends EntitySchema.Type,
>({
	withQuery,
	query,
	slots,
	renderHeader,
	renderItem,
	renderFooter,
	renderEmpty,
	renderError,
}: AbstractListBody.Props<TQuery, TItem>) => {
	const { isSuccess, isLoading, isFetching, isError, data } =
		withQuery.useQuery(query);

	const EASE = [
		0.22,
		1,
		0.36,
		1,
	] as const;
	const TRANS_IN = {
		duration: 0.18,
		ease: EASE,
	} as const;
	const TRANS_OUT = {
		duration: 0.16,
		ease: EASE,
	} as const;
	const LAYOUT_TRANS = {
		layout: {
			duration: 0.22,
			ease: EASE,
		},
	} as const;

	const stateVariants: Variants = {
		initial: {
			opacity: 0,
			y: 6,
			scale: 0.995,
		},
		loading: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: TRANS_IN,
		},
		error: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: TRANS_IN,
		},
		empty: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: TRANS_IN,
		},
		success: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: TRANS_IN,
		},
		exit: {
			opacity: 0,
			y: -4,
			scale: 0.995,
			transition: TRANS_OUT,
		},
	} as const;

	// Vstup/odchod řádků
	const rowVariants: Variants = {
		initial: {
			opacity: 0,
			y: 8,
		},
		animate: {
			opacity: 1,
			y: 0,
			transition: TRANS_IN,
		},
		exit: {
			opacity: 0,
			y: -8,
			transition: TRANS_OUT,
		},
	} as const;

	const headerVariants: Variants = {
		fetching: {
			opacity: 0.8,
			transition: TRANS_IN,
		},
		stable: {
			opacity: 1,
			transition: TRANS_IN,
		},
	} as const;

	return (
		<motion.div
			className={slots.body()}
			layout
			transition={LAYOUT_TRANS}
			style={{
				overflow: "hidden",
			}}
		>
			<AnimatePresence
				mode="wait"
				initial={false}
			>
				{isLoading && (
					<motion.div
						key="loading"
						variants={stateVariants}
						initial="initial"
						animate="loading"
						exit="exit"
					>
						{renderEmpty({
							loading: "loading",
						})}
					</motion.div>
				)}

				{isError && (
					<motion.div
						key="error"
						variants={stateVariants}
						initial="initial"
						animate="error"
						exit="exit"
					>
						{renderError({})}
					</motion.div>
				)}

				{isSuccess && data.length > 0 && (
					<motion.div
						key="success"
						variants={stateVariants}
						initial="initial"
						animate="success"
						exit="exit"
						layout
						transition={LAYOUT_TRANS}
					>
						<motion.div
							className={slots.items()}
							layout
							transition={LAYOUT_TRANS}
							style={{
								overflow: "hidden",
							}}
						>
							<motion.div
								variants={headerVariants}
								animate={isFetching ? "fetching" : "stable"}
								layout
								transition={LAYOUT_TRANS}
							>
								{renderHeader({
									isFetching,
									items: data,
								})}
							</motion.div>

							<AnimatePresence
								initial={false}
								mode="popLayout"
							>
								{data.map((item) => (
									<motion.div
										key={item.id}
										variants={rowVariants}
										initial="initial"
										animate="animate"
										exit="exit"
										layout
										transition={LAYOUT_TRANS}
									>
										{renderItem({
											item,
											items: data,
											isFetching,
										})}
									</motion.div>
								))}
							</AnimatePresence>

							<motion.div
								variants={headerVariants}
								animate={isFetching ? "fetching" : "stable"}
								layout
								transition={LAYOUT_TRANS}
							>
								{renderFooter({
									isFetching,
									items: data,
								})}
							</motion.div>
						</motion.div>
					</motion.div>
				)}
				{isSuccess && data?.length === 0 && (
					<motion.div
						key="empty"
						variants={stateVariants}
						initial="initial"
						animate="empty"
						exit="exit"
					>
						{renderEmpty({
							loading: undefined,
						})}
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};
