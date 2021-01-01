import { registerBlockStyle, unregisterBlockStyle } from "@wordpress/blocks";

const registerButton = () => {
	unregisterBlockStyle("core/button", "fill");
	unregisterBlockStyle("core/button", "outline");
	registerBlockStyle("core/button", {
		name: "primary",
		label: "Primary",
		isDefault: true,
	});
	registerBlockStyle("core/button", { name: "secondary", label: "Secondary" });
};

wp.domReady(registerButton);
