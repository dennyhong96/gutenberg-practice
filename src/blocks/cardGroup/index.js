import { Fragment } from "@wordpress/element";
import { registerBlockType } from "@wordpress/blocks";
import {
	InspectorControls,
	InnerBlocks,
	MediaUploadCheck,
	MediaUpload,
	MediaPlaceholder,
	BlockControls,
} from "@wordpress/block-editor";
import {
	PanelBody,
	TextControl,
	Button,
	IconButton,
	Toolbar,
	TextareaControl,
} from "@wordpress/components";

registerBlockType("lilo-blocks/card-group", {
	title: "Card Group",
	description: "Card Group",
	category: "lilo-category",

	attributes: {
		// Full width
		align: {
			type: "string",
			default: "full",
		},

		cards: {
			type: "array",
			default: [
				{
					title: "$33M",
					description: "Trackable revenue generated across our portfolio",
					url: null,
					alt: null,
					id: null,
				},
			],
		},
	},

	// Full width
	getEditWrapperProps() {
		return {
			"data-align": "full",
		};
	},

	edit({ attributes, setAttributes }) {
		const { cards } = attributes;

		const handleAddCard = () => {
			setAttributes({
				cards: [
					...cards,
					{
						title: "$33M",
						description: "Trackable revenue generated across our portfolio",
						url: null,
						alt: null,
						id: null,
					},
				],
			});
		};

		const handleRemoveCard = () => {
			setAttributes({
				cards: cards.filter((_, idx) => idx !== cards.length - 1),
			});
		};

		const handleChange = (curIdx) => (key) => (val) => {
			setAttributes({
				cards: cards.map((card, idx) =>
					idx === curIdx ? { ...card, [key]: val } : card
				),
			});
		};

		const handleImageUpload = (curIdx) => ({ url, alt, id }) => {
			setAttributes({
				cards: cards.map((card, idx) =>
					idx === curIdx ? { ...card, url, alt, id } : card
				),
			});
		};

		const handleRemoveImage = (curIdx) => () => {
			setAttributes({
				cards: cards.map((card, idx) =>
					idx === curIdx ? { ...card, url: null, alt: null, id: null } : card
				),
			});
		};

		return (
			<Fragment>
				<section className="cards-group">
					<div className="cards-group__inner">
						<InnerBlocks
							allowedBlocks={["lilo-blocks/section-header"]}
							template={[["lilo-blocks/section-header"]]}
							templateLock="insert"
						/>

						<div className="cards-group__cards">
							{cards.map((card, idx) => (
								<div className="card" key={idx}>
									<h4 className="card__title">{card.title}</h4>
									<p className="card__description">{card.description}</p>
									<img className="card__image" src={card.url} alt={card.alt} />
								</div>
							))}
						</div>
					</div>
				</section>

				<BlockControls>
					<Toolbar>
						{cards.length < 6 && (
							<IconButton
								label="Add a card"
								icon="plus"
								onClick={handleAddCard}
							/>
						)}
						{cards.length > 1 && (
							<IconButton
								label="Remove a card"
								icon="minus"
								onClick={handleRemoveCard}
							/>
						)}
					</Toolbar>
				</BlockControls>

				<InspectorControls>
					{cards.map((card, idx) => (
						<PanelBody key={idx} title={`Card ${idx + 1} - ${card.title}`}>
							<TextControl
								value={card.title}
								onChange={handleChange(idx)("title")}
							/>
							<TextareaControl
								value={card.description}
								onChange={handleChange(idx)("description")}
							/>

							{!card.url ? (
								<MediaPlaceholder
									accept="image/*"
									allowedTypes={["image"]}
									onSelect={handleImageUpload(idx)}
								/>
							) : (
								<Fragment>
									<img src={card.url} alt={card.alt} width="100%" />
									<MediaUploadCheck>
										<MediaUpload
											onSelect={handleImageUpload(idx)}
											allowedTypes={["image"]}
											value={card.id}
											render={({ open }) => (
												<Button onClick={open}>Edit</Button>
											)}
										/>
									</MediaUploadCheck>
									<Button
										style={{ color: "red" }}
										onClick={handleRemoveImage(idx)}>
										Delete
									</Button>
									<TextControl
										label="Alt Text"
										value={card.alt}
										onChange={handleChange(idx)("alt")}
									/>
								</Fragment>
							)}
						</PanelBody>
					))}
				</InspectorControls>
			</Fragment>
		);
	},

	save({ attributes }) {
		const { cards } = attributes;

		return (
			<section className="cards-group">
				<div className="cards-group__inner">
					<InnerBlocks.Content />

					<div className="cards-group__cards">
						{cards.map((card, idx) => (
							<div className="card" key={idx}>
								<h4 className="card__title">{card.title}</h4>
								<p className="card__description">{card.description}</p>
								{card.url && (
									<img className="card__image" src={card.url} alt={card.alt} />
								)}
							</div>
						))}
					</div>
				</div>
			</section>
		);
	},
});
