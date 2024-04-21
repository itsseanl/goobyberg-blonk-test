/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
	RichText,
} from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

import { useState } from "react";
import { TextControl, Button } from "@wordpress/components";
export default function Edit({ attributes, className, setAttributes }) {
	//used to update edit screen orientation
	const [orientation, setOrientation] = useState("left");
	console.log(attributes);
	console.log("test");
	const getImageButton = (openEvent) => {
		if (attributes.imageUrl) {
			setAttributes();
			return (
				<img
					src={attributes.imageUrl}
					onClick={openEvent}
					alt={attributes?.imageAlt}
					className="image test-image"
				/>
			);
		} else {
			return (
				<div className="button-container">
					<Button onClick={openEvent} className="button button-large">
						Pick an image
					</Button>
				</div>
			);
		}
	};

	return (
		<section {...useBlockProps()}>
			<select
				value={attributes.orientation}
				onChange={(e) => {
					console.log(e.target.value);
					setAttributes({ orientation: e.target.value });
					setOrientation(e.target.value);
				}}
			>
				<option value="left">Image Left, Content Right</option>
				<option value="right">Image Right, Content Left</option>
			</select>

			{orientation == "right" ? (
				<div>
					<p className="test-text">
						<TextControl
							label="write your text"
							value={attributes.text}
							onChange={(value) => setAttributes({ text: value })}
						/>
					</p>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => {
								setAttributes({ imageAlt: media.alt, imageUrl: media.url });
							}}
							type="image"
							value={attributes.imageID}
							render={({ open }) => getImageButton(open)}
						/>
					</MediaUploadCheck>
				</div>
			) : (
				<div>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => {
								setAttributes({ imageAlt: media.alt, imageUrl: media.url });
							}}
							type="image"
							value={attributes.imageID}
							render={({ open }) => getImageButton(open)}
						/>
					</MediaUploadCheck>
					<p className="test-text">
						<TextControl
							label="write your text"
							value={attributes.text}
							onChange={(value) => setAttributes({ text: value })}
						/>
					</p>
				</div>
			)}
		</section>
	);
}
