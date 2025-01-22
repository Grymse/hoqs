import AddDocumentButton from '../../components/content/document/AddDocumentButton';
import PageContainer from '../../components/ui/PageContainer';

export function Wiki() {
  return (
    <PageContainer>
      <AddDocumentButton />
      <div>List of all documents</div>
    </PageContainer>
  );
}
