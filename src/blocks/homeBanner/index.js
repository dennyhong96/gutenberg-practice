import { Fragment } from "@wordpress/element";
import { registerBlockType } from "@wordpress/blocks";
import {
	InspectorControls,
	InnerBlocks,
	MediaUploadCheck,
	MediaUpload,
	MediaPlaceholder,
	RichText,
} from "@wordpress/block-editor";
import {
	PanelBody,
	TextControl,
	Button,
	ToggleControl,
} from "@wordpress/components";
import classNames from "classnames";

import "./child";

registerBlockType("lilo-blocks/home-banner", {
	title: "Home Banner",
	description: "Home Banner",
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
		title: {
			type: "string",
			source: "html",
			selector: "h1",
			default: "Your Full-Funnel Growth Agency",
		},
		subtitle: {
			type: "string",
			source: "html",
			selector: "p",
			default:
				"We help eCommerce companies scale by bringing data-driven decisions and creativity together for a cohesive approach to paid media.",
		},

		imgUrl: {
			type: "string",
			source: "attribute",
			attribute: "href",
			selector: "img",
			default: null,
		},
		imgAlt: {
			type: "string",
			source: "attribute",
			attribute: "alt",
			selector: "img",
			default: null,
		},
		imgId: {
			type: "number",
			default: null,
		},
		vidUrl: {
			type: "string",
			source: "attribute",
			attribute: "src",
			selector: "video",
			default: null,
		},
		vidId: {
			type: "number",
			default: null,
		},

		animate: {
			type: "boolean",
			default: false,
		},
	},

	edit({ attributes, setAttributes }) {
		const {
			title,
			subtitle,
			imgUrl,
			imgAlt,
			imgId,
			vidUrl,
			vidId,
			animate,
		} = attributes;

		const handleChange = (key) => (val) => {
			setAttributes({ [key]: val });
		};

		const handleSelectImage = ({ url, alt, id }) => {
			setAttributes({ imgUrl: url, imgAlt: alt, imgId: id });
		};

		const handleSelectVideo = ({ url, id }) => {
			setAttributes({ vidUrl: url, vidId: id });
		};

		const handleRemoveImage = () => {
			setAttributes({ imgUrl: null, imgAlt: null, imgId: null });
		};

		const handleRemoveVideo = () => {
			setAttributes({ vidUrl: null, vidAlt: null, vidId: null });
		};

		return (
			<Fragment>
				<section className="banner">
					<div className="banner__inner">
						<div className="banner__left">
							<RichText
								tagName="h1"
								value={title}
								onChange={handleChange("title")}
							/>
							<RichText
								tagName="p"
								value={subtitle}
								onChange={handleChange("subtitle")}
							/>

							<div className="banner__actions">
								<InnerBlocks
									allowedBlocks={["lilo-blocks/home-banner-cta"]}
									template={[
										["lilo-blocks/home-banner-cta"],
										["lilo-blocks/home-banner-cta"],
									]}
								/>
							</div>
						</div>

						<div className="banner__right">
							<img className="banner__phone-image" src={imgUrl} alt={imgAlt} />
							<video
								className="banner__phone-video"
								src={vidUrl}
								muted
								autoPlay
								loop></video>
						</div>
					</div>
				</section>

				<InspectorControls>
					<PanelBody title="Banner Image">
						{!imgUrl ? (
							<MediaPlaceholder
								allowedTypes={["image"]}
								accept="image/*"
								onSelect={handleSelectImage}
							/>
						) : (
							<Fragment>
								<img width="100%" src={imgUrl} alt={imgAlt} />
								<MediaUploadCheck>
									<MediaUpload
										onSelect={handleSelectImage}
										allowedTypes={["image"]}
										value={imgId}
										render={({ open }) => <Button onClick={open}>Edit</Button>}
									/>
								</MediaUploadCheck>
								<Button onClick={handleRemoveImage} style={{ color: "red" }}>
									Delete
								</Button>

								<TextControl
									label="Alt Text"
									value={imgAlt}
									onChange={(val) => setAttributes({ imgAlt: val })}
								/>
							</Fragment>
						)}
					</PanelBody>

					<PanelBody title="Banner Video">
						{!vidUrl ? (
							<MediaPlaceholder
								allowedTypes={["video"]}
								accept="video/*"
								onSelect={handleSelectVideo}
							/>
						) : (
							<Fragment>
								<video width="100%" src={vidUrl} muted autoPlay loop></video>
								<MediaUploadCheck>
									<MediaUpload
										onSelect={handleSelectVideo}
										allowedTypes={["video"]}
										value={vidId}
										render={({ open }) => <Button onClick={open}>Edit</Button>}
									/>
								</MediaUploadCheck>
								<Button onClick={handleRemoveVideo} style={{ color: "red" }}>
									Delete
								</Button>
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
							onChange={handleChange("animate")}
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	},

	save({ attributes }) {
		const { title, subtitle, imgUrl, imgAlt, vidUrl, animate } = attributes;

		return (
			<section className="banner">
				<div className="banner__inner">
					<div
						className="banner__left"
						data-gsap={classNames({ "stagger-up": animate })}>
						<h1 data-gsap-child={classNames({ "stagger-up": animate })}>
							<RichText.Content value={title} />
						</h1>
						<p data-gsap-child={classNames({ "stagger-up": animate })}>
							<RichText.Content value={subtitle} />
						</p>

						<div
							data-gsap-child={classNames({ "stagger-up": animate })}
							className="banner__actions">
							<InnerBlocks.Content />
						</div>
					</div>

					<div
						className="banner__right"
						data-gsap={classNames({ "fade-in-right": animate })}>
						<img className="banner__phone-image" src={imgUrl} alt={imgAlt} />
						<video
							className="banner__phone-video"
							src={vidUrl}
							muted
							autoPlay
							loop></video>
					</div>
				</div>
			</section>
		);
	},
});
