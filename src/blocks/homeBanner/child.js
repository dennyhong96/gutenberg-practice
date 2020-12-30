import { Fragment } from "@wordpress/element";
import { registerBlockType } from "@wordpress/blocks";
import {
	InspectorControls,
	BlockControls,
	URLInput,
} from "@wordpress/block-editor";
import {
	PanelBody,
	TextControl,
	IconButton,
	Toolbar,
	ToggleControl,
} from "@wordpress/components";
import className from "classnames";

registerBlockType("lilo-blocks/home-banner-cta", {
	title: "Home Banner CTA",
	description: "Home Banner CTA",
	category: "lilo-category",

	parent: ["lilo-blocks/home-banner"],

	attributes: {
		// Full width
		align: {
			type: "string",
			default: "full",
		},

		label: {
			type: "string",
			source: "html",
			selector: "a",
			default: "Contact Us",
		},
		href: {
			type: "string",
			source: "attribute",
			selector: "a",
			attribute: "href",
			default: "#",
		},
		targetBlank: {
			type: "boolean",
			default: false,
		},
		noFollow: {
			type: "boolean",
			default: false,
		},
		style: {
			type: "string",
			default: "filled",
		},
	},

	// Full width
	getEditWrapperProps() {
		return {
			"data-align": "full",
		};
	},

	edit({ attributes, setAttributes }) {
		const { label, href, targetBlank, noFollow, style } = attributes;

		const handleChange = (key) => (val) => {
			setAttributes({ [key]: val });
		};

		return (
			<Fragment>
				<a
					target={className({ ["_blank"]: targetBlank })}
					rel={className({
						["noopener noreferrer"]: targetBlank,
						["nofollow"]: noFollow,
					})}
					className={className("banner__cta", {
						["banner__cta--alt"]: style === "outlined",
					})}>
					{label}
				</a>

				<BlockControls>
					<Toolbar>
						<IconButton
							label="Filled"
							icon="star-filled"
							onClick={handleChange("style").bind(this, "filled")}
						/>
						<IconButton
							label="Outlined"
							icon="star-empty"
							onClick={handleChange("style").bind(this, "outlined")}
						/>
					</Toolbar>
				</BlockControls>

				<InspectorControls>
					<PanelBody title="Link Settings">
						<TextControl
							label="Link Label"
							value={label}
							onChange={handleChange("label")}
						/>
						<URLInput
							isFullWidth
							label="Link Href"
							value={href}
							onChange={handleChange("href")}
						/>
						<ToggleControl
							label="Open in new tab?"
							checked={targetBlank}
							onChange={handleChange("targetBlank").bind(this, !targetBlank)}
						/>
						<ToggleControl
							label="Ignored by search engine?"
							checked={noFollow}
							onChange={handleChange("targetBlank").bind(this, !noFollow)}
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	},

	save({ attributes }) {
		const { label, href, targetBlank, noFollow, style } = attributes;

		return (
			<a
				href={href}
				target={className({ ["_blank"]: targetBlank })}
				rel={className({
					["noopener noreferrer"]: targetBlank,
					["nofollow"]: noFollow,
				})}
				className={className("banner__cta", {
					["banner__cta--alt"]: style === "outlined",
				})}>
				{label}
			</a>
		);
	},
});
