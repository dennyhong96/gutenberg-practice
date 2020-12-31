import { Fragment } from "@wordpress/element";
import { registerBlockType } from "@wordpress/blocks";
import {
	InspectorControls,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck,
	BlockControls,
} from "@wordpress/block-editor";
import {
	IconButton,
	PanelBody,
	TextControl,
	Toolbar,
} from "@wordpress/components";

registerBlockType("lilo-blocks/partner", {
	title: "Partner",
	description: "Partner",
	category: "lilo-category",

	attributes: {
		// Full width
		align: {
			type: "string",
			default: "full",
		},

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

	parent: ["lilo-blocks/partners"],

	edit({ attributes, setAttributes }) {
		const { url, alt, id } = attributes;

		const handleImageSelected = ({ url, alt, id }) => {
			setAttributes({ url, alt, id });
		};
		const handleRemoveImg = () => {
			setAttributes({ url: null, alt: null, id: null });
		};

		return (
			<Fragment>
				{!url ? (
					<MediaPlaceholder
						accept="image/*"
						allowedTypes={["image"]}
						onSelect={handleImageSelected}
					/>
				) : (
					<div className="partners__item">
						<img src={url} alt={alt} />
					</div>
				)}

				{url && (
					<BlockControls>
						<Toolbar>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={handleImageSelected}
									allowedTypes={["image"]}
									value={id}
									render={({ open }) => (
										<IconButton label="Edit Image" icon="edit" onClick={open} />
									)}
								/>
							</MediaUploadCheck>

							<IconButton
								label="Remove Image"
								icon="remove"
								onClick={handleRemoveImg}
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
			<div className="partners__item" data-gsap-child="stagger-up">
				<img src={url} alt={alt} />
			</div>
		);
	},
});
