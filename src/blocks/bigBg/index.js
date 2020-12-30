import { Fragment } from "@wordpress/element";
import { registerBlockType } from "@wordpress/blocks";
import {
	InspectorControls,
	InnerBlocks,
	MediaUploadCheck,
	MediaUpload,
	MediaPlaceholder,
} from "@wordpress/block-editor";
import { PanelBody, TextControl, Button } from "@wordpress/components";

registerBlockType("lilo-blocks/big-bg", {
	title: "Big Background",
	description: "Big Background",
	category: "lilo-category",

	attributes: {
		// Full width
		align: {
			type: "string",
			default: "full",
		},

		desktopUrl: {
			type: "string",
			source: "attribute",
			attribute: "src",
			selector: "img",
		},
		desktopAlt: {
			type: "string",
			source: "attribute",
			attribute: "alt",
			selector: "img",
		},
		desktopId: {
			type: "number",
		},
		mobileUrl: {
			type: "string",
			source: "attribute",
			attribute: "src",
			selector: "img",
		},
		mobileAlt: {
			type: "string",
			source: "attribute",
			attribute: "alt",
			selector: "img",
		},
		mobileId: {
			type: "number",
		},
	},

	// Full width
	getEditWrapperProps() {
		return {
			"data-align": "full",
		};
	},

	edit({ attributes, setAttributes }) {
		const {
			desktopUrl,
			desktopAlt,
			desktopId,
			mobileUrl,
			mobileAlt,
			mobileId,
		} = attributes;

		const handleDesktopImageSelect = ({ url, alt, id }) => {
			setAttributes({ desktopUrl: url, desktopAlt: alt, desktopId: id });
		};
		const handleRemoveDesktop = () => {
			setAttributes({ desktopUrl: null, desktopAlt: null, desktopId: null });
		};
		const handleMobileImageSelect = ({ url, alt, id }) => {
			setAttributes({ mobileUrl: url, mobileAlt: alt, mobileId: id });
		};
		const handleRemoveMobile = () => {
			setAttributes({ mobileUrl: null, mobileAlt: null, mobileId: null });
		};
		return (
			<Fragment>
				<section className="big-bg">
					<div className="big-bg__inner">
						<InnerBlocks
							allowedBlocks={["lilo-blocks/section-header"]}
							template={[["lilo-blocks/section-header"]]}
							templateLock="insert"
						/>
						{desktopUrl && (
							<div className="big-bg__img-box">
								<img src={desktopUrl} alt={desktopAlt} />
							</div>
						)}
						{mobileUrl && (
							<img
								className="big-bg__img-mobile"
								src={mobileUrl}
								alt={mobileAlt}
							/>
						)}
					</div>
				</section>

				<InspectorControls>
					<PanelBody title="Desktop Background Image">
						{!desktopUrl ? (
							<MediaPlaceholder
								accept="image/*"
								allowedTypes={["image"]}
								onSelect={handleDesktopImageSelect}
							/>
						) : (
							<Fragment>
								<img src={desktopUrl} alt={desktopAlt} width="100%" />
								<MediaUploadCheck>
									<MediaUpload
										onSelect={handleDesktopImageSelect}
										allowedTypes={["image"]}
										value={desktopId}
										render={({ open }) => <Button onClick={open}>Edit</Button>}
									/>
								</MediaUploadCheck>
								<Button style={{ color: "red" }} onClick={handleRemoveDesktop}>
									Delete
								</Button>
								<TextControl
									label="Alt Text"
									value={desktopAlt}
									onChange={(val) => setAttributes({ desktopAlt: val })}
								/>
							</Fragment>
						)}
					</PanelBody>
					<PanelBody title="Mobile Background Image">
						{!mobileUrl ? (
							<MediaPlaceholder
								accept="image/*"
								allowedTypes={["image"]}
								onSelect={handleMobileImageSelect}
							/>
						) : (
							<Fragment>
								<img src={mobileUrl} alt={mobileAlt} width="100%" />
								<MediaUploadCheck>
									<MediaUpload
										onSelect={handleMobileImageSelect}
										allowedTypes={["image"]}
										value={mobileId}
										render={({ open }) => <Button onClick={open}>Edit</Button>}
									/>
								</MediaUploadCheck>
								<Button style={{ color: "red" }} onClick={handleRemoveMobile}>
									Delete
								</Button>
								<TextControl
									label="Alt Text"
									value={mobileAlt}
									onChange={(val) => setAttributes({ mobileAlt: val })}
								/>
							</Fragment>
						)}
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	},

	save({ attributes }) {
		const { desktopUrl, desktopAlt, mobileUrl, mobileAlt } = attributes;

		return (
			<section className="big-bg">
				<div className="big-bg__inner">
					<InnerBlocks.Content />
					{desktopUrl && (
						<div className="big-bg__img-box">
							<img src={desktopUrl} alt={desktopAlt} />
						</div>
					)}
					{mobileUrl && (
						<img
							className="big-bg__img-mobile"
							src={mobileUrl}
							alt={mobileAlt}
						/>
					)}
				</div>
			</section>
		);
	},
});
