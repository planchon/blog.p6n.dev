import { useTheme } from "next-themes";
import { codeToHtml } from "shiki";

const LIGHT_THEME = "github-light";
const DARK_THEME = "github-dark-dimmed";

export async function CodeBlock({
	code,
	language,
}: {
	code: string;
	language?: string;
}) {
	const out = await codeToHtml(code, {
		lang: language,
		theme: LIGHT_THEME,
	});

	return (
		<div
			dangerouslySetInnerHTML={{ __html: out }}
			className="shiki-wrapper mb-6 text-sm"
		/>
	);
}
