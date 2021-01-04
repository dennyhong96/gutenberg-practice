import { registerBlockType, getBlockDefaultClassName } from "@wordpress/blocks";
import { InnerBlocks } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

registerBlockType("lilo-blocks/partners", {
	title: __("Partners", "lilo-blocks"),

	description: __("Add a partners block", "lilo-blocks"),

	category: "lilo-category",

	getEditWrapperProps() {
		return {
			"data-align": "full",
		};
	},
	supports: {
		align: ["full"],
	},

	attributes: {},

	edit({ className }) {
		return (
			<div className={className}>
				<InnerBlocks
					template={[
						[
							"core/group",
							{ backgroundColor: "bg-light", align: "full" },
							[
								["core/spacer", { height: 50 }],
								[
									"core/columns",
									{
										align: "wide",
										className:
											"gsap gsap-parent gsap-parent-animate-stagger-up",
									},
									[
										[
											"core/column",
											{},
											[
												[
													"core/image",
													{
														className: `${className}__image gsap-child-animate-stagger-up`,
													},
												],
											],
										],
										[
											"core/column",
											{},
											[
												[
													"core/image",
													{
														className: `${className}__image gsap-child-animate-stagger-up`,
													},
												],
											],
										],
										[
											"core/column",
											{},
											[
												[
													"core/image",
													{
														className: `${className}__image gsap-child-animate-stagger-up`,
													},
												],
											],
										],
										[
											"core/column",
											{},
											[
												[
													"core/image",
													{
														className: `${className}__image gsap-child-animate-stagger-up`,
													},
												],
											],
										],
										[
											"core/column",
											{},
											[
												[
													"core/image",
													{
														className: `${className}__image gsap-child-animate-stagger-up`,
													},
												],
											],
										],
										[
											"core/column",
											{},
											[
												[
													"core/image",
													{
														className: `${className}__image gsap-child-animate-stagger-up`,
													},
												],
											],
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
		const className = getBlockDefaultClassName("lilo-blocks/partners");
		return (
			<div className={className}>
				<InnerBlocks.Content />
			</div>
		);
	},
});
