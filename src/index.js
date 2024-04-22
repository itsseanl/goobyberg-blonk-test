/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./style.scss";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save: save,
	//These are your block variables, think of them as ACF fields. Schema is defined here, then can be accessed via the 'attributes' prop in edit/save
	//https://developer.wordpress.org/block-editor/reference-guides/block-api/block-attributes/
	attributes: {
		text: {
			type: "string",
		},
		imageUrl: {
			attribute: "src",
			selector: ".card__image",
		},
		imageAlt: {
			attribute: "alt",
			selector: ".card__image",
		},
		imageID: {
			attribute: "data-imageid",
			type: "number",
		},
		orientation: {
			attribute: "className",
			type: "string",
		},
	},
});
