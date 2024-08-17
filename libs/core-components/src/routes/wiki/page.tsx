import Document from '../../components/content/document/Document';
import PageContainer from '../../components/ui/PageContainer';
import content from './test';

export function WikiPage() {
  // const doc = useDocument('wiki', 'index');

  /* const { id } = useParams();
  const cabReq = useRef(supabase.from('drivers').select('*').eq('id', id));
  const { StatusComponent, data } = useSupabaseRequest(cabReq.current); */
  const doc = content;

  return (
    <PageContainer>
      <Document content={doc} />;
    </PageContainer>
  );
}
