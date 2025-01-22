import '@mdxeditor/editor/style.css'
import './editor.css';
import { MDXEditor, UndoRedo, BoldItalicUnderlineToggles, linkPlugin, toolbarPlugin, headingsPlugin, listsPlugin, quotePlugin, thematicBreakPlugin, InsertImage, InsertCodeBlock, InsertTable, InsertThematicBreak, ListsToggle, DiffSourceToggleWrapper, diffSourcePlugin, BlockTypeSelect, imagePlugin, linkDialogPlugin, CreateLink, codeBlockPlugin, codeMirrorPlugin, tablePlugin, CodeToggle } from '@mdxeditor/editor'

import { useState } from 'react';
import Document from './Document';
import { Button, Checkbox, Input, Tab, Tabs } from '@nextui-org/react';
import { useFileUploader } from 'libs/core-components/src/lib/upload';
import { DocumentType } from 'libs/core-components/src/types/types';
import UnpublishedBanner from '../../helpers/UnpublishedBanner';
import Text from 'libs/core-components/src/components/ui/Text';
import { formatDateTime } from 'libs/core-components/src/lib/translations';
import { supabase, toPromise } from 'libs/core-components/src/lib/supabase';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type EditorProps = {
  defaultDocument: DocumentType;
}

export default function Editor({defaultDocument}: EditorProps) {
  const [document, setDocument] = useState(defaultDocument);
  const navigate = useNavigate();
  
  function deleteDocument() {
    const deleter = toPromise(
      supabase.from('documents').delete().eq('id', document.id)
    );

    toast.promise(deleter, {
      loading: 'Deleting document from database',
      success: (c) => {
        console.log(c);
        navigate('/wiki');
        return `Successfully deleted document ${document.title}`;
      },
      error: (e) => `Error deleting document ${e.message}`,
    });
  }

  function saveDocument() {
    const uploader = toPromise(
      supabase.from('documents').update(document).eq('id', document.id)
    );

    toast.promise(uploader, {
      loading: 'Saving driver to database',
      success: (c) => {
        navigate(`/wiki/${document.id}`);
        return `Successfully saved document ${document.title}`;
      },
      error: (e) => `Error saving document ${e.message}`,
    });
  }

  return (
    <div className="space-y-4">
      <UnpublishedBanner show={defaultDocument.published} />
      <Tabs aria-label="Options">
        <Tab key="edit" title="Edit">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Input
                placeholder="Title..."
                onChange={(e) => setDocument({...document, title: e.target.value})}
                value={document.title}
                label="Title"
                size="sm"
                type="text"
                variant="underlined"
                description="Title is formattet as 'Heading 1' when rendered"
              />
              <Checkbox
                defaultSelected={document.published}
                aria-label="Is the document published?"
                onChange={(e) => {
                  setDocument({ ...document, published: e.target.checked });
                }}
                >
              Published
            </Checkbox>
            </div>
            <DocumentForm
              content={document.content}
              setContent={content => setDocument({...document, content})}
            />
          </div>
        </Tab>
        <Tab key="preview" title="Preview">
          <Document document={document} />
        </Tab>
      </Tabs>
      <div className="flex justify-between">
        {document.type === "wiki" ?
          <Button color="danger" onClick={deleteDocument}>
            Delete
          </Button> : 
          <div />
        }
        <Button color="primary" onClick={saveDocument}>
          Save
        </Button>
      </div>
      <div className="flex w-full items-end flex-col">
        <Text color="muted" variant="extra-small">Created at {formatDateTime(document.created_at)}.</Text> 
        <Text color="muted" variant="extra-small">Updated at {formatDateTime(document.updated_at)}</Text>
      </div>
    </div>
  );
}

type DocumentFormProps = {
  content: string;
  setContent: (content: string) => void;
};

function DocumentForm({
  content,
  setContent,
}: DocumentFormProps) {
  const uploadFile = useFileUploader({
    allowedTypes: [
      'image/png',
      'image/jpeg',
      'image/svg+xml',
      'image/jpg',
      'image/svg',
    ],
    supabasePath: '',
    supabaseBucket: 'documents',
  });

  async function imageUploadHandler(file: File): Promise<string> {
    return (await uploadFile(file))?.url;
  }

  return <MDXEditor
    markdown={content}
    contentEditableClassName="markdown-editor"
    onChange={(newMarkdown) => {
      setContent(newMarkdown);
    }}
    plugins={[
      headingsPlugin(),
      listsPlugin(),
      quotePlugin(),
      thematicBreakPlugin(),
      diffSourcePlugin(),
      linkPlugin(),
      imagePlugin({
        imageUploadHandler
      }),
      codeBlockPlugin({defaultCodeBlockLanguage: 'txt'}),
      codeMirrorPlugin({ codeBlockLanguages: { txt: 'txt'} }),
      linkDialogPlugin(),
      tablePlugin(),
      toolbarPlugin({
        toolbarClassName: 'markdown-toolbar',
        toolbarContents: () => (
          <>
            {' '}
            <UndoRedo />
            <BlockTypeSelect />
            <BoldItalicUnderlineToggles />
            
            <CreateLink />
            <CodeToggle />
            <InsertImage />
            <InsertCodeBlock />
            <InsertTable />
            <InsertThematicBreak />
            <ListsToggle />
          </>
        )
      })
    ]}
  />
}
