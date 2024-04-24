import { SpeakerCabinetWithRecommedationChanges } from 'libs/core-components/src/routes/cabinets/edit';
import ButtonWithConfirm from '../../../modals/ButtonWithConfirm';
import { supabase, toPromise } from 'libs/core-components/src/lib/supabase';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type Props = { cabinet: SpeakerCabinetWithRecommedationChanges };

export default function DeleteCabinetButton({ cabinet }: Props) {
  const navigate = useNavigate();
  return (
    <ButtonWithConfirm
      title="Are you sure?"
      description="Do you want to delete this precious cabinet?"
      cancelText="Cancel"
      color="danger"
      onConfirm={() => deleteCabinet(cabinet, navigate)}
    >
      Delete Cabinet
    </ButtonWithConfirm>
  );
}

function deleteCabinet(
  cabinet: SpeakerCabinetWithRecommedationChanges,
  navigate: ReturnType<typeof useNavigate>
) {
  const deleter = toPromise(
    supabase.from('cabinets').delete().eq('id', cabinet.id)
  );

  toast.promise(deleter, {
    loading: 'Deleting cabinet from database',
    success: (c) => {
      navigate('/cabinets');
      return `Successfully deleted cabinet ${cabinet.brand} - ${cabinet.model}`;
    },
    error: (e) => `Error deleting cabinet ${e.message}`,
  });
}
