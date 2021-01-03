import { Fragment } from "@wordpress/element";
import { registerBlockType, getBlockDefaultClassName } from "@wordpress/blocks";
import {
	getColorClassName,
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	withColors,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import {
	RangeControl,
	PanelBody,
	Button,
	TextControl,
} from "@wordpress/components";
import classNames from "classnames";

registerBlockType("lilo-blocks/full-bg", {
	title: __("Full Background", "lilo-blocks"),

	description: __("Add a full background group", "lilo-blocks"),

	category: "lilo-category",

	getEditWrapperProps() {
		return {
			"data-align": "full",
		};
	},
	supports: {
		align: ["full"],
	},

	attributes: {
		topSpacing: {
			type: "number",
			default: 50,
		},
		bottomSpacing: {
			type: "number",
			default: 50,
		},
		backgroundColor: {
			type: "string",
			default: "bg",
		},
		customBackgroundColor: {
			type: "string",
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

	edit: withColors({ backgroundColor: "backgroundColor" })(
		({
			className,
			attributes,
			setAttributes,
			backgroundColor,
			customBackgroundColor,
			setBackgroundColor,
		}) => {
			const {
				topSpacing,
				bottomSpacing,
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
					<section
						className={classNames(className, {
							[backgroundColor.class]: !!backgroundColor.class,
						})}
						style={{
							paddingTop: topSpacing,
							paddingBottom: bottomSpacing,
							backgroundColor: backgroundColor.class
								? undefined
								: customBackgroundColor,
						}}>
						<div className={`${className}__inner alignwide`} data-align="wide">
							<InnerBlocks template={[["core/columns", { align: "wide" }]]} />
							<div className={`${className}__image`}>
								<img src={desktopUrl} alt={desktopAlt} />
							</div>
							<div
								className={`${className}__image ${className}__image--mobile`}>
								<img src={mobileUrl} alt={mobileAlt} />
							</div>
						</div>
					</section>

					<InspectorControls>
						<PanelBody title="Spacing">
							<RangeControl
								label="Top spacing"
								value={topSpacing}
								onChange={(val) => setAttributes({ topSpacing: val })}
								min={0}
								max={100}
								step={1}
							/>
							<RangeControl
								label="Bottom spacing"
								value={bottomSpacing}
								onChange={(val) => setAttributes({ bottomSpacing: val })}
								min={0}
								max={100}
								step={1}
							/>
						</PanelBody>

						<PanelBody title="Color settings">
							<PanelColorSettings
								colorSettings={[
									{
										label: "Background Color",
										value: backgroundColor.color,
										onChange: setBackgroundColor,
									},
								]}
							/>
						</PanelBody>

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
											render={({ open }) => (
												<Button onClick={open}>Edit</Button>
											)}
										/>
									</MediaUploadCheck>
									<Button
										style={{ color: "red" }}
										onClick={handleRemoveDesktop}>
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
											render={({ open }) => (
												<Button onClick={open}>Edit</Button>
											)}
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
		}
	),

	save({ attributes }) {
		const {
			topSpacing,
			bottomSpacing,
			backgroundColor,
			customBackgroundColor,
			desktopUrl,
			desktopAlt,
			mobileUrl,
			mobileAlt,
		} = attributes;
		const className = getBlockDefaultClassName("lilo-blocks/full-bg");
		const colorClass = getColorClassName("backgroundColor", backgroundColor);
		return (
			<section
				className={classNames(className, { [colorClass]: !!colorClass })}
				style={{
					paddingTop: topSpacing,
					paddingBottom: bottomSpacing,
					backgroundColor: backgroundColor.class
						? undefined
						: customBackgroundColor,
				}}>
				<div className={`${className}__inner alignwide`}>
					<InnerBlocks.Content />
					<div className={`${className}__image`}>
						<img src={desktopUrl} alt={desktopAlt} />
					</div>
					<div className={`${className}__image ${className}__image--mobile`}>
						<img src={mobileUrl} alt={mobileAlt} />
					</div>
				</div>
			</section>
		);
	},
});
