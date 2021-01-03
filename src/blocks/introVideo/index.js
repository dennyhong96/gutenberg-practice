import { Fragment } from "@wordpress/element";
import { registerBlockType } from "@wordpress/blocks";
import {
	InspectorControls,
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

registerBlockType("lilo-blocks/intro-video", {
	title: "Intro Video",

	description: "Add an intro video",

	category: "lilo-category",

	parent: ["lilo-blocks/home-banner"],

	attributes: {
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

	edit({ attributes, setAttributes, className }) {
		const { imgUrl, imgAlt, imgId, vidUrl, vidId, animate } = attributes;

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
		const { imgUrl, imgAlt, vidUrl } = attributes;

		return (
			<div>
				<img src={imgUrl} alt={imgAlt} />
				<video src={vidUrl} muted autoPlay loop></video>
			</div>
		);
	},
});
