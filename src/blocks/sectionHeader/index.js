import { registerBlockType, getBlockDefaultClassName } from "@wordpress/blocks";
import { InnerBlocks } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

registerBlockType("lilo-blocks/section-header", {
	title: __("Section Header", "lilo-blocks"),

	description: __("Add a section header", "lilo-blocks"),

	category: "lilo-category",

	keywords: [__("section", "lilo-blocks"), __("header", "lilo-blocks")],

	attributes: {},

	edit({ className }) {
		return (
			<div
				className={`${className} gsap gsap-parent gsap-parent-animate-stagger-up`}>
				<InnerBlocks
					allowedBlocks={[
						"core/paragraph",
						"core/spacer",
						"core/heading",
						"lilo-blocks/cta",
					]}
					template={[
						[
							"core/paragraph",
							{
								content: "Services",
								className: "gsap-child-animate-stagger-up",
							},
						],
						["core/spacer", { height: 10 }],
						[
							"core/heading",
							{
								content: "We scale brands",
								className: "gsap-child-animate-stagger-up",
							},
						],
						["core/spacer", { height: 25 }],
						[
							"core/paragraph",
							{
								content:
									"We work alongside your team and brand to be your external growth team, with an in-house feel. We create high-performing content to pair with our paid media strategies to scale your brand, profitably.",
								className: "gsap-child-animate-stagger-up",
							},
						],
						["core/spacer", { height: 25 }],
						["lilo-blocks/cta", { className: "gsap-child-animate-stagger-up" }],
					]}
				/>
			</div>
		);
	},

	save() {
		const className = getBlockDefaultClassName("lilo-blocks/section-header");
		return (
			<div
				className={`${className} gsap gsap-parent gsap-parent-animate-stagger-up`}>
				<InnerBlocks.Content />
			</div>
		);
	},
});
