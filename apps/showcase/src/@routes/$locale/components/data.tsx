import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Data, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/cls";

// Simulate API call with timeout
const fetchClientInfo = async (): Promise<{
	id: string;
	name: string;
	email: string;
	company: string;
	role: string;
	lastLogin: string;
}> => {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 2000));

	return {
		id: "client-001",
		name: "John Doe",
		email: "john.doe@example.com",
		company: "Acme Corporation",
		role: "Senior Developer",
		lastLogin: "2024-01-15T10:30:00Z",
	};
};

export const Route = createFileRoute("/$locale/components/data")({
	component() {
		const clientInfoQuery = useQuery({
			queryKey: [
				"clientInfo",
			],
			queryFn: fetchClientInfo,
			staleTime: 0,
		});

		return (
			<div
				className={tvc([
					"space-y-6",
				])}
			>
				{/* Header */}
				<div
					className={tvc([
						"border-b",
						"border-slate-200",
						"pb-4",
					])}
				>
					<h1
						className={tvc([
							"text-3xl",
							"font-bold",
							"text-slate-900",
						])}
					>
						<Tx label="data_showcase_title" />
					</h1>
					<p
						className={tvc([
							"text-slate-600",
							"mt-2",
						])}
					>
						<Tx label="data_showcase_description" />
					</p>
				</div>

				{/* Main Content */}
				<div
					className={tvc([
						"bg-white",
						"rounded-lg",
						"border",
						"border-slate-200",
						"shadow-sm",
					])}
				>
					<Data<
						{
							id: string;
							name: string;
							email: string;
							company: string;
							role: string;
							lastLogin: string;
						},
						typeof clientInfoQuery
					>
						result={clientInfoQuery}
						renderSuccess={({ data }) => (
							<div
								className={tvc([
									"p-6",
									"space-y-4",
								])}
							>
								<h2
									className={tvc([
										"text-xl",
										"font-semibold",
										"text-slate-900",
										"border-b",
										"border-slate-200",
										"pb-2",
									])}
								>
									<Tx label="client_information" />
								</h2>

								<div
									className={tvc([
										"grid",
										"grid-cols-1",
										"md:grid-cols-2",
										"gap-4",
									])}
								>
									<div
										className={tvc([
											"space-y-2",
										])}
									>
										<label
											className={tvc([
												"text-sm",
												"font-medium",
												"text-slate-700",
											])}
										>
											<Tx label="name" />
										</label>
										<p
											className={tvc([
												"text-slate-900",
												"font-medium",
											])}
										>
											{data.name}
										</p>
									</div>

									<div
										className={tvc([
											"space-y-2",
										])}
									>
										<label
											className={tvc([
												"text-sm",
												"font-medium",
												"text-slate-700",
											])}
										>
											<Tx label="email" />
										</label>
										<p
											className={tvc([
												"text-slate-900",
												"font-medium",
											])}
										>
											{data.email}
										</p>
									</div>

									<div
										className={tvc([
											"space-y-2",
										])}
									>
										<label
											className={tvc([
												"text-sm",
												"font-medium",
												"text-slate-700",
											])}
										>
											<Tx label="company" />
										</label>
										<p
											className={tvc([
												"text-slate-900",
												"font-medium",
											])}
										>
											{data.company}
										</p>
									</div>

									<div
										className={tvc([
											"space-y-2",
										])}
									>
										<label
											className={tvc([
												"text-sm",
												"font-medium",
												"text-slate-700",
											])}
										>
											<Tx label="role" />
										</label>
										<p
											className={tvc([
												"text-slate-900",
												"font-medium",
											])}
										>
											{data.role}
										</p>
									</div>

									<div
										className={tvc([
											"space-y-2",
											"md:col-span-2",
										])}
									>
										<label
											className={tvc([
												"text-sm",
												"font-medium",
												"text-slate-700",
											])}
										>
											<Tx label="last_login" />
										</label>
										<p
											className={tvc([
												"text-slate-900",
												"font-medium",
											])}
										>
											{new Date(
												data.lastLogin,
											).toLocaleString()}
										</p>
									</div>
								</div>
							</div>
						)}
						renderLoading={() => (
							<div
								className={tvc([
									"p-6",
									"text-center",
								])}
							>
								<div
									className={tvc([
										"animate-spin",
										"w-8",
										"h-8",
										"border-4",
										"border-slate-300",
										"border-t-slate-600",
										"rounded-full",
										"mx-auto",
										"mb-4",
									])}
								/>
								<p
									className={tvc([
										"text-slate-600",
										"font-medium",
									])}
								>
									<Tx label="loading_client_info" />
								</p>
								<p
									className={tvc([
										"text-sm",
										"text-slate-500",
										"mt-1",
									])}
								>
									<Tx label="simulating_api_call" />
								</p>
							</div>
						)}
						renderError={({ error }) => (
							<div
								className={tvc([
									"p-6",
									"text-center",
								])}
							>
								<div
									className={tvc([
										"w-12",
										"h-12",
										"bg-red-100",
										"rounded-full",
										"flex",
										"items-center",
										"justify-center",
										"mx-auto",
										"mb-4",
									])}
								>
									<span
										className={tvc([
											"text-red-600",
											"text-xl",
										])}
									>
										⚠️
									</span>
								</div>
								<h3
									className={tvc([
										"text-lg",
										"font-semibold",
										"text-red-900",
										"mb-2",
									])}
								>
									<Tx label="error_loading_data" />
								</h3>
								<p
									className={tvc([
										"text-red-700",
										"mb-4",
									])}
								>
									{error.message}
								</p>
								<button
									type="button"
									onClick={() => clientInfoQuery.refetch()}
									className={tvc([
										"px-4",
										"py-2",
										"bg-red-600",
										"text-white",
										"rounded-md",
										"hover:bg-red-700",
										"transition-colors",
									])}
								>
									<Tx label="try_again" />
								</button>
							</div>
						)}
					>
						{({ content }) => (
							<div
								className={tvc([
									"min-h-[400px]",
								])}
							>
								Something here (all the times)
								{content}
								And here (...all the times)
							</div>
						)}
					</Data>
				</div>

				{/* Footer */}
				<div
					className={tvc([
						"bg-slate-50",
						"rounded-lg",
						"border",
						"border-slate-200",
						"p-4",
					])}
				>
					<h3
						className={tvc([
							"text-lg",
							"font-semibold",
							"text-slate-900",
							"mb-2",
						])}
					>
						<Tx label="how_it_works" />
					</h3>
					<ul
						className={tvc([
							"text-sm",
							"text-slate-600",
							"space-y-1",
							"list-disc",
							"list-inside",
						])}
					>
						<li>
							<Tx label="data_component_handles_states" />
						</li>
						<li>
							<Tx label="loading_state_shows" />
						</li>
						<li>
							<Tx label="success_state_displays" />
						</li>
						<li>
							<Tx label="error_state_provides" />
						</li>
						<li>
							<Tx label="children_function_receives" />
						</li>
					</ul>
				</div>
			</div>
		);
	},
});
