import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

registerBlockType("lilo-blocks/home-banner", {
	title: __("Home Banner", "lilo-blocks"),

	description: __("Add a home banner", "lilo-blocks"),

	category: "lilo-category",

	keywords: [__("home", "lilo-blocks"), __("banner", "lilo-blocks")],

	attributes: {},

	getEditWrapperProps() {
		return {
			"data-align": "full",
		};
	},
	supports: {
		align: ["full"],
	},

	edit({ className }) {
		return (
			<div className={className}>
				<InnerBlocks
					allowedBlocks={["core/group"]}
					template={[
						[
							"core/group",
							{ backgroundColor: "bg", align: "full" },
							[
								["core/spacer", { height: 50 }],
								[
									"core/columns",
									{
										className: "home_banner",
										align: "wide",
									},
									[
										[
											"core/column",
											{ className: "home_banner__left" },
											[
												[
													"core/group",
													{},
													[
														["core/spacer", { height: 50 }],
														[
															"core/heading",
															{ content: "Your Full-Funnel Growth Agency" },
														],
														["core/spacer", { height: 30 }],
														[
															"core/paragraph",
															{
																content:
																	"We help eCommerce companies scale by bringing data-driven decisions and creativity together for a cohesive approach to paid media.",
															},
														],
														["core/spacer", { height: 30 }],
														["lilo-blocks/cta"],
													],
												],
											],
										],
										[
											"core/column",
											{ className: "home_banner__right" },
											[["lilo-blocks/intro-video"]],
										],
									],
								],
								["core/spacer", { height: 50 }],
							],
						],
					]}
				/>
			</div>
		);
	},

	save() {
		return (
			<div>
				<InnerBlocks.Content />
			</div>
		);
	},
});
