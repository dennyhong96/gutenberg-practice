import { Fragment } from "@wordpress/element";
import { registerBlockType } from "@wordpress/blocks";
import {
	InspectorControls,
	MediaUploadCheck,
	MediaUpload,
	MediaPlaceholder,
} from "@wordpress/block-editor";
import { PanelBody, TextControl, Button } from "@wordpress/components";

registerBlockType("lilo-blocks/intro-video", {
	title: "Intro Video",

	description: "Add an intro video",

	category: "lilo-category",

	parent: ["lilo-blocks/home-banner"],

	attributes: {
		imgUrl: {
			type: "string",
			source: "attribute",
			attribute: "src",
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
		},
	},

	edit({ attributes, setAttributes, className }) {
		const { imgUrl, imgAlt, imgId, vidUrl, vidId } = attributes;

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
				<div className={className}>
					{imgUrl ? (
						<img src={imgUrl} alt={imgAlt} />
					) : (
						<MediaPlaceholder
							labels={{
								title: "Intro Image",
								instructions: "Add an intro image",
							}}
							allowedTypes={["image"]}
							accept="image/*"
							onSelect={handleSelectImage}
						/>
					)}
					{vidUrl ? (
						<video src={vidUrl} muted autoPlay loop></video>
					) : (
						<MediaPlaceholder
							labels={{
								title: "Intro Video",
								instructions: "Add an intro video",
							}}
							allowedTypes={["video"]}
							accept="video/*"
							onSelect={handleSelectVideo}
						/>
					)}
				</div>

				<InspectorControls>
					<PanelBody title="Banner Image">
						{imgUrl && (
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
						{vidUrl && (
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
		const { imgUrl, imgAlt, vidUrl } = attributes;

		return (
			<div>
				<img src={imgUrl} alt={imgAlt} />
				<video
					className="banner__phone-video"
					src={vidUrl}
					muted
					autoPlay
					loop></video>
			</div>
		);
	},
});
