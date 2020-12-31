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
import { PanelBody, TextControl, Button } from "@wordpress/components";

import "./child";

registerBlockType("lilo-blocks/home-banner", {
	title: "Home Banner",
	description: "Home Banner",
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
				</InspectorControls>
			</Fragment>
		);
	},

	save({ attributes }) {
		const { title, subtitle, imgUrl, imgAlt, vidUrl } = attributes;

		return (
			<section className="banner">
				<div className="banner__inner">
					<div className="banner__left">
						<h1>
							<RichText.Content value={title} />
						</h1>
						<p>
							<RichText.Content value={subtitle} />
						</p>

						<div className="banner__actions">
							<InnerBlocks.Content />
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
		);
	},
});
