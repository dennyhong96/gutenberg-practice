import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks } from "@wordpress/block-editor";

import "./child";

registerBlockType("lilo-blocks/partners", {
	title: "Partners",
	description: "Partners",
	category: "lilo-category",

	// Full width block
	getEditWrapperProps() {
		return {
			"data-align": "full",
		};
	},
	supports: {
		align: ["full"],
	},

	attributes: {},

	edit() {
		return (
			<section className="partners">
				<div className="partners__inner">
					<InnerBlocks
						allowedBlocks={["lilo-blocks/partner"]}
						template={[["lilo-blocks/partner"]]}
					/>
				</div>
			</section>
		);
	},

	save() {
		return (
			<section className="partners" data-gsap="stagger-up">
				<div className="partners__inner">
					<InnerBlocks.Content />
				</div>
			</section>
		);
	},
});
