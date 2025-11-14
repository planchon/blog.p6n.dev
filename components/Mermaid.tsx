"use client";

import { cn } from "@lib/utils";
import type { MermaidConfig } from "mermaid";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const initializeMermaid = async (customConfig?: MermaidConfig, theme?: string) => {
	const defaultConfig: MermaidConfig = {
		startOnLoad: false,
		theme: theme === "dark" ? "dark" : "default",
		securityLevel: "strict",
		fontFamily: "monospace",
		suppressErrorRendering: true,
	} as MermaidConfig;

	const config = { ...defaultConfig, ...customConfig };

	const mermaidModule = await import("mermaid");
	const mermaid = mermaidModule.default;

	// Always reinitialize with the current config to support different configs per component
	mermaid.initialize(config);

	return mermaid;
};

type MermaidProps = {
	chart: string;
	className?: string;
	config?: MermaidConfig;
};

export const Mermaid = ({ chart, className, config }: MermaidProps) => {
	const { theme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [svgContent, setSvgContent] = useState<string>("");
	const [lastValidSvg, setLastValidSvg] = useState<string>("");

	useEffect(() => {
		setMounted(true);
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: "Required for Mermaid"
	useEffect(() => {
		if (!mounted) return;

		const renderChart = async () => {
			try {
				setError(null);
				setIsLoading(true);

				// Initialize mermaid with optional custom config and current theme
				const mermaid = await initializeMermaid(config, theme);

				// Use a stable ID based on chart content hash and timestamp to ensure uniqueness
				const chartHash = chart.split("").reduce((acc, char) => {
					// biome-ignore lint/suspicious/noBitwiseOperators: "Required for Mermaid"
					return ((acc << 5) - acc + char.charCodeAt(0)) | 0;
				}, 0);
				const uniqueId = `mermaid-${Math.abs(chartHash)}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

				const { svg } = await mermaid.render(uniqueId, chart);

				// Update both current and last valid SVG
				setSvgContent(svg);
				setLastValidSvg(svg);
			} catch (err) {
				// Silently fail and keep the last valid SVG
				// Don't update svgContent here - just keep what we have

				// Only set error if we don't have any valid SVG
				if (!(lastValidSvg || svgContent)) {
					const errorMessage =
						err instanceof Error
							? err.message
							: "Failed to render Mermaid chart";
					setError(errorMessage);
				}
			} finally {
				setIsLoading(false);
			}
		};

		renderChart();
	}, [chart, config, theme, mounted]);

	// Show loading only on initial load when we have no content
	if (isLoading && !svgContent && !lastValidSvg) {
		return (
			<div className={cn("my-4 flex justify-center p-4", className)}>
				<div className="flex items-center space-x-2 text-muted-foreground">
					<div className="h-4 w-4 animate-spin rounded-full border-current border-b-2" />
					<span className="text-sm">Loading diagram...</span>
				</div>
			</div>
		);
	}

	// Only show error if we have no valid SVG to display
	if (error && !svgContent && !lastValidSvg) {
		return (
			<div
				className={cn(
					"rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/30 p-4",
					className,
				)}
			>
				<p className="font-mono text-red-700 dark:text-red-300 text-sm">Mermaid Error: {error}</p>
				<details className="mt-2">
					<summary className="cursor-pointer text-red-600 dark:text-red-400 text-xs">
						Show Code
					</summary>
					<pre className="mt-2 overflow-x-auto rounded bg-red-100 dark:bg-red-900/50 p-2 text-red-800 dark:text-red-200 text-xs">
						{chart}
					</pre>
				</details>
			</div>
		);
	}

	// Always render the SVG if we have content (either current or last valid)
	const displaySvg = svgContent || lastValidSvg;

	return (
		<div
			aria-label="Mermaid chart"
			className={cn("my-4 flex justify-center", className)}
			// biome-ignore lint/security/noDangerouslySetInnerHtml: "Required for Mermaid"
			dangerouslySetInnerHTML={{ __html: displaySvg }}
			role="img"
		/>
	);
};
