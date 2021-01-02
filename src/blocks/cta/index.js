import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

import "./link";

registerBlockType("lilo-blocks/cta", {
	title: __("CTA", "lilo-blocks"),

	description: __("Add call to action links", "lilo-blocks"),

	category: "lilo-category",

	keywords: [
		__("cta", "lilo-blocks"),
		__("call to action", "lilo-blocks"),
		__("call to action", "lilo-blocks"),
		__("button", "lilo-blocks"),
		__("link", "lilo-blocks"),
	],

	attributes: {},

	edit({ className }) {
		console.log({ className });
		return (
			<div className={className}>
				<InnerBlocks
					allowedBlocks={["lilo-blocks/cta-button"]}
					template={[
						["lilo-blocks/cta-button", { label: "Our services" }],
						["lilo-blocks/cta-button", { label: "Contact us" }],
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
