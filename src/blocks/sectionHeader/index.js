import { Fragment } from "@wordpress/element";
import { registerBlockType } from "@wordpress/blocks";
import { RichText, InspectorControls, URLInput } from "@wordpress/block-editor";
import { PanelBody, TextControl, ToggleControl } from "@wordpress/components";
import classNames from "classnames";

registerBlockType("lilo-blocks/section-header", {
	title: "Section Header",
	description: "Section Header",
	category: "lilo-category",

	attributes: {
		// Full width block
		getEditWrapperProps() {
			return {
				"data-align": "full",
			};
		},
		align: {
			type: "string",
			default: "full",
		},

		subtitle: {
			type: "string",
			source: "html",
			selector: "p",
			default: "Services",
		},
		title: {
			type: "string",
			selector: "h2",
			source: "html",
			default: "We scale brands",
		},
		paragraph: {
			type: "string",
			selector: "p",
			source: "html",
			default:
				"We work alongside your team and brand to be your external growth team, with an in-house feel. We create high-performing content to pair with our paid media strategies to scale your brand, profitably.",
		},
		linkLabel: {
			type: "string",
			selector: "a",
			source: "html",
			default: "View services",
		},
		linkUrl: {
			type: "string",
			selector: "a",
			source: "attribute",
			attribute: "href",
			default: "/service",
		},
		isInternal: {
			type: "boolean",
			default: false,
		},
		linkTargetBlank: {
			type: "boolean",
			default: false,
		},
		linkNoFollow: {
			type: "boolean",
			default: false,
		},
	},

	edit({ attributes, setAttributes }) {
		const {
			subtitle,
			title,
			paragraph,
			linkLabel,
			linkUrl,
			linkTargetBlank,
			linkNoFollow,
			isInternal,
		} = attributes;

		const handleChange = (key) => (val) => setAttributes({ [key]: val });
		return (
			<Fragment>
				<div className="section-header">
					<RichText
						tagName="p"
						className="section-header__subtitle"
						value={subtitle}
						allowedFormats={[]}
						onChange={handleChange("subtitle")}
					/>

					<RichText
						tagName="h2"
						className="section-header__title"
						value={title}
						allowedFormats={[]}
						onChange={handleChange("title")}
					/>

					<RichText
						tagName="p"
						className="section-header__description"
						value={paragraph}
						allowedFormats={[]}
						onChange={handleChange("paragraph")}
					/>

					<a className="section-header__link">{linkLabel}</a>
				</div>

				<InspectorControls>
					<PanelBody title="Link Settings">
						<TextControl
							label="Link Label"
							value={linkLabel}
							onChange={handleChange("linkLabel")}
						/>
						<URLInput
							isFullWidth
							label="Link Url"
							value={linkUrl}
							onChange={handleChange("linkUrl")}
						/>
						<ToggleControl
							label="Is this an internal link?"
							checked={isInternal}
							onChange={(val) => setAttributes({ isInternal: val })}
						/>
						{!isInternal && (
							<Fragment>
								<ToggleControl
									label="Open in new tab?"
									checked={linkTargetBlank}
									onChange={(val) => setAttributes({ linkTargetBlank: val })}
								/>
								<ToggleControl
									label="Ignored by search engine?"
									checked={linkNoFollow}
									onChange={(val) => setAttributes({ linkNoFollow: val })}
								/>
							</Fragment>
						)}
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	},

	save({ attributes }) {
		const {
			subtitle,
			title,
			paragraph,
			linkLabel,
			linkUrl,
			linkTargetBlank,
			linkNoFollow,
			isInternal,
		} = attributes;

		return (
			<div className="section-header">
				<p className="section-header__subtitle">
					<RichText.Content value={subtitle} />
				</p>

				<h2 className="section-header__title">
					<RichText.Content value={title} />
				</h2>

				<p className="section-header__description">
					<RichText.Content value={paragraph} />
				</p>

				<a
					data-internal={classNames("", { ["internal"]: isInternal })}
					data-target={classNames("", { ["_blank"]: linkTargetBlank })}
					data-rel={classNames("", {
						["noopener noreferrer"]: linkTargetBlank,
						["nofollow"]: linkNoFollow,
					})}
					href={linkUrl}
					className={"banner__cta"}>
					{linkLabel}
				</a>
			</div>
		);
	},
});
