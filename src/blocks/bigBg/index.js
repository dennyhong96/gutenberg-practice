import { Fragment } from "@wordpress/element";
import { registerBlockType } from "@wordpress/blocks";
import {
	InspectorControls,
	InnerBlocks,
	MediaUploadCheck,
	MediaUpload,
	MediaPlaceholder,
} from "@wordpress/block-editor";
import {
	PanelBody,
	TextControl,
	Button,
	ToggleControl,
} from "@wordpress/components";
import classNames from "classnames";

registerBlockType("lilo-blocks/big-bg", {
	title: "Big Background",
	description: "Big Background",
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

		animate: {
			type: "boolean",
			default: true,
		},
	},

	edit({ attributes, setAttributes }) {
		const {
			desktopUrl,
			desktopAlt,
			desktopId,
			mobileUrl,
			mobileAlt,
			mobileId,
			animate,
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

					<PanelBody
						icon={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
								/>
							</svg>
						}
						title="Animation">
						<ToggleControl
							label="Enable animation?"
							checked={animate}
							onChange={(val) => setAttributes({ animate: val })}
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	},

	save({ attributes }) {
		const {
			desktopUrl,
			desktopAlt,
			mobileUrl,
			mobileAlt,
			animate,
		} = attributes;

		return (
			<section className="big-bg">
				<div className="big-bg__inner">
					<div
						data-gsap={classNames({ "fade-in-up": animate })}
						style={{ zIndex: 1, position: "relative" }}>
						<InnerBlocks.Content />
					</div>
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
