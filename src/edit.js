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
	const [orientation, setOrientation] = useState(attributes.orientation);
	const blockProps = useBlockProps({
		className: orientation,
	});

	const getImageButton = (openEvent) => {
		return (
			<img
				src={attributes.imageUrl}
				onClick={openEvent}
				alt={attributes?.imageAlt}
				data-imageid={attributes?.imageID}
				className={`image wp-image${attributes?.imageID}`}
			/>
		);
	};

	return (
		<section {...blockProps}>
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

			{/* <p className="test-text"> */}
			{/* <TextControl
							label="write your text"
							value={attributes.text}
							onChange={(value) => setAttributes({ text: value })}
						/> */}
			<RichText
				tagName="p" // The tag here is the element output and editable in the admin
				value={attributes.text} // Any existing content, either from the database or an attribute default
				allowedFormats={["core/bold", "core/italic", "core/link"]} // Allow the content to be made bold or italic, but do not allow other formatting options
				onChange={(content) => setAttributes({ text: content })} // Store updated content as a block attribute
				placeholder={__("Heading...")} // Display this text before any content has been added by the user
			/>
			{/* </p> */}
			<MediaUploadCheck>
				<MediaUpload
					onSelect={(media) => {
						console.log(media);
						setAttributes({
							imageAlt: media.alt,
							imageUrl: media.url,
							imageID: media.id,
							imageSizes: media.sizes,
						});
					}}
					type="image"
					value={attributes.imageID}
					render={({ open }) => getImageButton(open)}
				/>
			</MediaUploadCheck>
		</section>
	);
}
