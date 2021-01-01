import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

registerBlockType("lilo-blocks/section-header", {
	title: __("Section Header", "lilo-blocks"),

	description: __("Add a section header", "lilo-blocks"),

	category: "lilo-category",

	keywords: [__("section", "lilo-blocks"), __("header", "lilo-blocks")],

	attributes: {},

	edit({ className }) {
		console.log({ className });
		return (
			<div className={className}>
				<InnerBlocks
					template={[
						["core/paragraph", { content: "Services" }],
						["core/spacer", { height: 10 }],
						["core/heading", { content: "We scale brands" }],
						["core/spacer", { height: 20 }],
						[
							"core/paragraph",
							{
								content:
									"We work alongside your team and brand to be your external growth team, with an in-house feel. We create high-performing content to pair with our paid media strategies to scale your brand, profitably.",
							},
						],
						["core/spacer", { height: 20 }],
						[
							"lilo-blocks/cta",
							{},
							[
								[
									"lilo-blocks/cta-button",
									{
										label: "Our services",
										url: "#",
									},
								],
							],
						],
					]}
					templateLock="all"
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
