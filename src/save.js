/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
	console.log(attributes);
	return attributes.orientation == "right" ? (
		<section {...useBlockProps.save()}>
			<p>{attributes.text}</p>
			<img src={attributes.imageUrl} alt={attributes.imageAlt} />
		</section>
	) : (
		<section {...useBlockProps.save()}>
			<img src={attributes.imageUrl} alt={attributes.imageAlt} />
			<p>{attributes.text}</p>
		</section>
	);
}
