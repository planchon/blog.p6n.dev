"use client";

import {
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockItem,
  CodeBlock as NewCodeBlock,
} from "./NewCode";

export function CodeBlock({
  code,
  language,
}: {
  code: string;
  language?: string;
}) {
  const data: { language: string; filename: string; code: string }[] = [
    { language: language ?? "text", filename: "code.ts", code },
  ];

  return (
    <NewCodeBlock
      className="mb-4 shadow-gray-200/30 shadow-md"
      data={data}
      defaultValue={data[0].language}
    >
      <CodeBlockBody>
        {(item) => (
          <CodeBlockItem key={item.language} value={item.language}>
            <CodeBlockContent>{item.code}</CodeBlockContent>
          </CodeBlockItem>
        )}
      </CodeBlockBody>
    </NewCodeBlock>
  );
}
