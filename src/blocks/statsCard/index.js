import {
	InnerBlocks,
	withColors,
	PanelColorSettings,
	InspectorControls,
	getColorClassName,
	RichText,
} from "@wordpress/block-editor";
import { Fragment } from "@wordpress/element";
import { registerBlockType, getBlockDefaultClassName } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import classNames from "classnames";

registerBlockType("lilo-blocks/stats-card", {
	title: __("Stats Card", "lilo-blocks"),

	description: __("Add a stats card", "lilo-blocks"),

	category: "lilo-category",

	keywords: [
		__("stats", "lilo-blocks"),
		__("card", "lilo-blocks"),
		__("statistics", "lilo-blocks"),
	],

	attributes: {
		cardTitle: {
			type: "string",
			default: "$33M",
		},
		cardDescription: {
			type: "string",
			default: "Trackable revenue generated across our portfolio",
		},
		backgroundColor: {
			type: "string",
			default: "bg",
		},
		color: {
			type: "string",
			default: "orange",
		},
		customBackgroundColor: {
			type: "string",
		},
	},

	edit: withColors({ backgroundColor: "backgroundColor", color: "color" })(
		({
			className,
			color,
			setColor,
			customColor,
			backgroundColor,
			customBackgroundColor,
			setBackgroundColor,
			attributes,
			setAttributes,
		}) => {
			const { cardTitle, cardDescription } = attributes;

			return (
				<Fragment>
					<div
						className={classNames(className, {
							[backgroundColor.class]: !!backgroundColor.class,
						})}
						style={{
							backgroundColor: backgroundColor.class
								? undefined
								: customBackgroundColor,
						}}>
						<RichText
							tagName="h4"
							className={classNames(`${className}__title`, {
								[color.class]: !!color.class,
							})}
							style={{
								color: color.class ? undefined : customColor,
							}}
							value={cardTitle}
							onChange={(val) => setAttributes({ cardTitle: val })}
						/>

						<RichText
							tagName="p"
							className={`${className}__description`}
							value={cardDescription}
							onChange={(val) => setAttributes({ cardDescription: val })}
						/>

						<InnerBlocks
							allowedBlocks={["core/image"]}
							template={[["core/image", { className: `${className}__image` }]]}
							templateLock="all"
						/>
					</div>

					<InspectorControls>
						<PanelColorSettings
							title={__("Color Settings", "lilo-blocks")}
							colorSettings={[
								{
									label: __("Color", "lilo-blocks"),
									onChange: setColor,
									value: color.color,
								},
								{
									label: __("Background Color", "lilo-blocks"),
									onChange: setBackgroundColor,
									value: backgroundColor.color,
								},
							]}
						/>
					</InspectorControls>
				</Fragment>
			);
		}
	),

	save({ attributes }) {
		const className = getBlockDefaultClassName("lilo-blocks/stats-card");
		const {
			color,
			customColor,
			backgroundColor,
			customBackgroundColor,
			cardTitle,
			cardDescription,
		} = attributes;
		const backgroundClass = getColorClassName(
			"backgroundColor",
			backgroundColor
		);
		const colorClass = getColorClassName("color", color);

		return (
			<div
				className={classNames(`${className} gsap-child-animate-stagger-up`, {
					[backgroundClass]: !!backgroundClass,
				})}
				style={{
					backgroundColor: backgroundClass ? undefined : customBackgroundColor,
				}}>
				<RichText.Content
					tagName="h4"
					className={classNames(`${className}__title`, {
						[colorClass]: !!colorClass,
					})}
					style={{ color: colorClass ? undefined : customColor }}
					value={cardTitle}
				/>

				<RichText.Content
					tagName="p"
					className={`${className}__description`}
					value={cardDescription}
				/>
				<InnerBlocks.Content />
			</div>
		);
	},
});
