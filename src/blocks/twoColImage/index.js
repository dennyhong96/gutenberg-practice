import { Fragment } from "@wordpress/element";
import { registerBlockType } from "@wordpress/blocks";
import {
	InnerBlocks,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck,
	BlockControls,
	InspectorControls,
} from "@wordpress/block-editor";
import {
	Spinner,
	Toolbar,
	IconButton,
	PanelBody,
	TextControl,
} from "@wordpress/components";

registerBlockType("lilo-blocks/two-col-image", {
	title: "2 Column Image",
	description: "2 Column Image",
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

	attributes: {
		url: {
			type: "string",
			source: "attribute",
			attribute: "src",
			selector: "img",
			default: null,
		},
		alt: {
			type: "string",
			source: "attribute",
			attribute: "alt",
			selector: "img",
			default: null,
		},
		id: {
			type: "number",
			default: null,
		},
	},

	edit({ attributes, setAttributes }) {
		const { url, alt, id } = attributes;

		const handleSelectImage = ({ url, alt, id }) => {
			setAttributes({ url, alt, id });
		};

		return (
			<Fragment>
				<section className="two-col-image">
					<div className="two-col-image__inner">
						<div className="two-col-image__left">
							{!url ? (
								<MediaPlaceholder
									accept="image/*"
									allowedTypes={["image"]}
									onSelect={handleSelectImage}
								/>
							) : (
								<Fragment>
									<img src={url} alt={alt} />
									{!id && <Spinner src={url} alt={alt} />}
								</Fragment>
							)}
						</div>

						<div className="two-col-image__right">
							<InnerBlocks
								allowedBlocks={["lilo-blocks/section-header"]}
								template={[["lilo-blocks/section-header"]]}
								templateLock="insert"
							/>
						</div>
					</div>
				</section>

				{url && id && (
					<BlockControls>
						<Toolbar>
							<MediaUploadCheck>
								<MediaUpload
									allowedTypes={["image"]}
									value={id}
									onSelect={handleSelectImage}
									render={({ open }) => (
										<IconButton label="Edit Image" icon="edit" onClick={open} />
									)}
								/>
							</MediaUploadCheck>

							<IconButton
								label="Remove Image"
								icon="remove"
								onClick={setAttributes.bind(this, {
									url: null,
									alt: null,
									id: null,
								})}
							/>
						</Toolbar>
					</BlockControls>
				)}

				{url && (
					<InspectorControls>
						<PanelBody title="Image Settings">
							<TextControl
								label="Alt Text"
								value={alt}
								onChange={(val) => setAttributes({ alt: val })}
							/>
						</PanelBody>
					</InspectorControls>
				)}
			</Fragment>
		);
	},

	save({ attributes }) {
		const { url, alt } = attributes;

		return (
			<section className="two-col-image">
				<div className="two-col-image__inner">
					<div className="two-col-image__left">
						<img src={url} alt={alt} />
					</div>

					<div className="two-col-image__right">
						<InnerBlocks.Content />
					</div>
				</div>
			</section>
		);
	},
});
