import { useState, Fragment } from "@wordpress/element";
import { registerBlockType } from "@wordpress/blocks";
import {
	BlockControls,
	InspectorControls,
	__experimentalLinkControl as LinkControl,
	RichText,
} from "@wordpress/block-editor";
import {
	PanelBody,
	Popover,
	ToggleControl,
	Toolbar,
	ToolbarButton,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import classNames from "classnames";

registerBlockType("lilo-blocks/cta-button", {
	title: __("CTA Button", "lilo-blocks"),

	description: __("Add a call to action button", "lilo-blocks"),

	category: "lilo-category",

	keywords: [
		__("cta", "lilo-blocks"),
		__("call to action", "lilo-blocks"),
		__("call to action", "lilo-blocks"),
		__("button", "lilo-blocks"),
		__("link", "lilo-blocks"),
	],

	parent: ["lilo-blocks/cta"],

	styles: [
		{ name: "primary", label: __("Primary", "lilo-blocks"), isDefault: true },
		{
			name: "secondary",
			label: __("Secondary", "lilo-blocks"),
			isDefault: false,
		},
	],

	attributes: {
		label: { type: "string", default: "label" },
		url: { type: "string", default: "" },
		opensInNewTab: { type: "boolean", default: false },
		noFollow: { type: "boolean", default: false },
	},

	edit({ className, attributes, setAttributes }) {
		const [isUrlPickerOpen, setIsUrlPickerOpen] = useState(false);
		const { url, opensInNewTab, noFollow, label } = attributes;

		return (
			<Fragment>
				<a className={className}>
					<RichText
						value={label}
						onChange={(val) => setAttributes({ label: val })}
						allowedFormats={[]}
					/>
				</a>

				<BlockControls>
					<Toolbar title={__("Link settings", "lilo-blocks")}>
						<ToolbarButton
							title={__("Pick a link", "lilo-blocks")}
							icon="admin-links"
							onClick={setIsUrlPickerOpen.bind(this, true)}
						/>
						{isUrlPickerOpen && (
							<Popover onClose={setIsUrlPickerOpen.bind(this, false)}>
								<LinkControl
									value={{ url, opensInNewTab }}
									onChange={setAttributes}
								/>
							</Popover>
						)}

						{url && (
							<ToolbarButton
								title={__("Unlink", "lilo-blocks")}
								icon="editor-unlink"
								onClick={setAttributes.bind(this, {
									url: "",
									opensInNewTab: false,
									noFollow: false,
								})}
							/>
						)}
					</Toolbar>
				</BlockControls>

				<InspectorControls>
					<PanelBody title={__("Extra link settings", "lilo-blocks")}>
						{url && (
							<ToggleControl
								label={__("Hide this link from search engines?", "lilo-blocks")}
								onChange={(val) => setAttributes({ noFollow: val })}
								checked={noFollow}
							/>
						)}
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	},

	save({ attributes }) {
		const { url, opensInNewTab, noFollow, label } = attributes;
		return (
			<a
				href={url}
				target={classNames("", { _blank: opensInNewTab })}
				rel={classNames("noopener", {
					noreferrer: opensInNewTab,
					nofollow: noFollow,
				})}>
				<RichText.Content value={label} />
			</a>
		);
	},
});
