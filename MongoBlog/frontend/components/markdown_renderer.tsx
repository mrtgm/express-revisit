import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CodeComponent } from 'react-markdown/src/ast-to-react';
import { VStack, Heading, Divider, Text } from '@chakra-ui/react';
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CodeBlock: CodeComponent = ({ inline, className, children }: any) => {
  if (inline) {
    return <code className={className}>{children}</code>;
  }
  const match = /language-(\w+)/.exec(className || '');
  const lang = match && match[1] ? match[1] : '';
  return <SyntaxHighlighter style={nord} language={lang} children={String(children).replace(/\n$/, '')} />;
};

export function MarkdownRenderer({ markdown }: { markdown: string }) {
  return (
    <VStack align="stretch" gap="4" bgColor="gray.100" p="8" borderRadius="10">
      <ReactMarkdown
        components={{
          code: CodeBlock,
          h1: (props: any) => <Heading as="h1" fontSize="24px" {...props} />,
          h2: (props: any) => <Heading as="h2" fontSize="20px" {...props} />,
          h3: (props: any) => <Heading as="h3" fontSize="18px" {...props} />,
          h4: (props: any) => <Heading as="h4" fontSize="16px" {...props} />,
          h5: (props: any) => <Heading as="h5" fontSize="14px" {...props} />,
          h6: (props: any) => <Heading as="h6" fontSize="12px" {...props} />,
          hr: (props: any) => <Divider {...props} />,
          p: (props: any) => <Text as="p" fontSize="14px" {...props} />,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </VStack>
  );
}
