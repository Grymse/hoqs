import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header from '../../ui/Header';
import Text from '../../ui/Text';
import { Blockquote } from './components/Blockquote';
import { Tcol, Thead, Trow, Table } from './components/Table';
import { List, OrderedList } from './components/List';
import Link from './components/Link';
import { Code, Kbd } from '@nextui-org/react';
import { Divider } from '@nextui-org/divider';
import ImageCaroussel from '../images/ImageCaroussel';

type Props = {
  content: string;
};

export default function Document({ content }: Props) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => <Header variant="title">{children}</Header>,
        h2: ({ children }) => <Header variant="subtitle">{children}</Header>,
        h3: ({ children }) => (
          <Header variant="sub-subtitle">{children}</Header>
        ),
        h4: ({ children }) => <Text variant="thick">{children}</Text>,
        p: ({ children }) => <Text>{children}</Text>,
        b: ({ children }) => <Text>{children}</Text>,
        blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
        table: ({ children }) => <Table>{children}</Table>,
        thead: ({ children }) => <Thead>{children}</Thead>,
        tr: ({ children }) => <Trow>{children}</Trow>,
        td: ({ children }) => <Tcol>{children}</Tcol>,
        ul: ({ children }) => <List>{children}</List>,
        ol: ({ children }) => <OrderedList>{children}</OrderedList>,
        li: ({ children }) => <li>{children}</li>,
        a: ({ children, href }) => <Link href={href}>{children}</Link>,
        kbd: () => <Kbd className="py-0.5 px-1.5" />,
        hr: () => <Divider />,
        img: ({ src, alt, title }) => (
          <ImageCaroussel
            images={[
              {
                title: title ?? alt ?? 'No Title',
                url: src ?? '',
                updatedAt: '',
                createdAt: '',
                size: 0,
                mimetype: '',
              },
            ]}
          />
        ),
        code: (x) => (
          <Code className="px-2 py-1 text-primary-700">{x.children}</Code>
        ),
        pre: ({ children }) => (
          <pre className="[&>code]:w-full [&>code]:px-4 [&>code]:py-2">
            {children}
          </pre>
        ),
      }}
    >
      {content}
    </Markdown>
  );
}
