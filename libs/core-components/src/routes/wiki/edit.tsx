import PageContainer from '../../components/ui/PageContainer';
import { DocumentType } from '../../types/types';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { useSupabaseRequest } from '../../components/helpers/SupabaseRequest';
import Editor from '../../components/content/document/Editor';

export function EditWikiPage() {
  const { id } = useParams();
  const docRef = useRef(supabase.from('documents').select('*').eq('id', id));
  const { StatusComponent, data } = useSupabaseRequest<DocumentType[]>(docRef.current);

  const document = data?.[0];
  
  return (
    <PageContainer>
      {document && <Editor defaultDocument={document} />}
      <StatusComponent />
    </PageContainer>
  );
}
