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
											{
												className:
													"home_banner__left gsap gsap-parent gsap-parent-animate-stagger-up",
											},
											[
												[
													"core/group",
													{},
													[
														["core/spacer", { height: 50 }],
														[
															"core/heading",
															{
																content: "Your Full-Funnel Growth Agency",
																className: "gsap-child-animate-stagger-up",
															},
														],
														["core/spacer", { height: 30 }],
														[
															"core/paragraph",
															{
																content:
																	"We help eCommerce companies scale by bringing data-driven decisions and creativity together for a cohesive approach to paid media.",
																className: "gsap-child-animate-stagger-up",
															},
														],
														["core/spacer", { height: 30 }],
														[
															"lilo-blocks/cta",
															{
																className: "gsap-child-animate-stagger-up",
															},
														],
													],
												],
											],
										],
										[
											"core/column",
											{
												className:
													"home_banner__right gsap gsap-animate-fade-in-right",
											},
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
