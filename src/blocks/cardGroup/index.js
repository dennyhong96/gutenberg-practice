import { Fragment } from "@wordpress/element";
import { registerBlockType } from "@wordpress/blocks";
import {
	InspectorControls,
	InnerBlocks,
	MediaUploadCheck,
	MediaUpload,
	MediaPlaceholder,
} from "@wordpress/block-editor";
import { PanelBody, TextControl, Button, Modal } from "@wordpress/components";

registerBlockType("lilo-blocks/card-group", {
	title: "Card Group",
	description: "Card Group",
	category: "lilo-category",

	attributes: {
		// Full width
		align: {
			type: "string",
			default: "full",
		},

		numberOfCards: {
			type: "number",
			default: 3,
		},

		cards: {
			type: "array",
		},
	},

	// Full width
	getEditWrapperProps() {
		return {
			"data-align": "full",
		};
	},

	edit() {
		return (
			<section className="cards-group">
				<div className="cards-group__inner">
					<InnerBlocks
						allowedBlocks={["section-header"]}
						template={[["section-header"]]}
						templateLock="insert"
					/>

					<div className="cards-group__cards">
						<div className="card">
							<h4 className="card__title">$33M</h4>
							<p className="card__description">
								Trackable revenue generated across our portfolio
							</p>
							<img
								className="card__image"
								src="/images/money.png"
								alt="money"
							/>
						</div>
						<div className="card">
							<h4 className="card__title">$33M</h4>
							<p className="card__description">
								Trackable revenue generated across our portfolio
							</p>
							<img
								className="card__image"
								src="/images/money.png"
								alt="money"
							/>
						</div>
						<div className="card">
							<h4 className="card__title">$33M</h4>
							<p className="card__description">
								Trackable revenue generated across our portfolio
							</p>
							<img
								className="card__image"
								src="/images/money.png"
								alt="money"
							/>
						</div>
					</div>
				</div>
			</section>
		);
	},

	save() {
		return (
			<section className="cards-group">
				<div className="cards-group__inner">
					<InnerBlocks.Content />

					<div className="cards-group__cards">
						<div className="card">
							<h4 className="card__title">$33M</h4>
							<p className="card__description">
								Trackable revenue generated across our portfolio
							</p>
							<img
								className="card__image"
								src="/images/money.png"
								alt="money"
							/>
						</div>
						<div className="card">
							<h4 className="card__title">$33M</h4>
							<p className="card__description">
								Trackable revenue generated across our portfolio
							</p>
							<img
								className="card__image"
								src="/images/money.png"
								alt="money"
							/>
						</div>
						<div className="card">
							<h4 className="card__title">$33M</h4>
							<p className="card__description">
								Trackable revenue generated across our portfolio
							</p>
							<img
								className="card__image"
								src="/images/money.png"
								alt="money"
							/>
						</div>
					</div>
				</div>
			</section>
		);
	},
});
