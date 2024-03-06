import PageContainer from '@/components/ui/PageContainer';
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import Header from '../../components/ui/Header';
import { useRef, useState } from 'react';
import ImageUploader from '@/components/content/ImageUploader';
import Text from '../../components/ui/Text';
import { useSupabaseRequest } from '@/components/SupabaseRequest';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase, toPromise } from '@/lib/supabase';
import { SpeakerCabinet, StorageImage } from '@/types/types';
import {
  kgsToPounds,
  mmToInches,
  woodThicknessToInches,
} from '@/lib/translations';
import toast from 'react-hot-toast';
import ConfirmModal from '@/components/modals/ConfirmModal';
import {
  CABINET_TYPES,
  DRIVER_SIZES,
  MAX_SPL_COUNT,
  WOOD_THICKNESS,
} from '@/lib/variables';

export function EditCabinet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cabReq = useRef(supabase.from('cabinets').select('*').eq('id', id));
  const { StatusComponent, data } = useSupabaseRequest(cabReq.current);
  const cabinet = data?.[0] as SpeakerCabinet;

  function saveCabinet(cabinet: SpeakerCabinet) {
    const uploader = toPromise(
      supabase.from('cabinets').update(cabinet).eq('id', cabinet.id)
    );
    toast.promise(uploader, {
      loading: 'Saving cabinet to database',
      success: (c) =>
        `Successfully saved cabinet ${cabinet.brand} - ${cabinet.model}`,
      error: (e) => `Error saving cabinet ${e.message}`,
    });
  }

  function deleteCabinet(cabinet: SpeakerCabinet) {
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

  return (
    <PageContainer className="flex flex-col gap-4">
      <StatusComponent />
      {cabinet && (
        <EditForm
          initialCabinet={cabinet}
          onSave={saveCabinet}
          onDelete={deleteCabinet}
        />
      )}
    </PageContainer>
  );
}

interface EditFormProps {
  initialCabinet: SpeakerCabinet;
  onSave: (cabinet: SpeakerCabinet) => void;
  onDelete?: (cabinet: SpeakerCabinet) => void;
}

function EditForm({ initialCabinet, onSave, onDelete }: EditFormProps) {
  const [cabinet, setCabinet] = useState(initialCabinet);

  function updateImages(fn: (images: StorageImage[] | null) => StorageImage[]) {
    setCabinet((cabinet) => {
      return { ...cabinet, images: fn(cabinet.images) };
    });
  }

  return (
    <>
      <Header variant="subtitle">
        {cabinet.brand} - {cabinet.model}
      </Header>
      <Header variant="sub-subtitle">Details</Header>
      <div className="grid grid-cols-3 gap-4">
        <Input
          type="text"
          variant="bordered"
          placeholder="Paraflex"
          defaultValue="Paraflex"
          label="Brand"
          value={cabinet.brand}
          onChange={(e) => setCabinet({ ...cabinet, brand: e.target.value })}
        />
        <Input
          type="text"
          variant="bordered"
          placeholder="Type C"
          defaultValue="Type C"
          label="Model"
          value={cabinet.model}
          onChange={(e) => setCabinet({ ...cabinet, model: e.target.value })}
        />
        <Select
          items={CABINET_TYPES}
          label="Type"
          placeholder="Select cabinet type"
          selectedKeys={[cabinet.type || '']}
          variant="bordered"
          onChange={(e) => setCabinet({ ...cabinet, type: e.target.value })}
        >
          {CABINET_TYPES.map((type) => (
            <SelectItem key={type}>{type}</SelectItem>
          ))}
        </Select>

        <Select
          items={DRIVER_SIZES}
          label="Driver Size"
          selectionMode="multiple"
          placeholder="Select cabinet size"
          variant="bordered"
          selectedKeys={cabinet.driver_size}
          onChange={(e) =>
            setCabinet((cabinet) => ({
              ...cabinet,
              driver_size: e.target.value.split(','),
            }))
          }
        >
          {DRIVER_SIZES.map((driverSize) => (
            <SelectItem key={driverSize}>{driverSize}</SelectItem>
          ))}
        </Select>
      </div>
      <Header variant="sub-subtitle">Descriptions</Header>
      <Textarea
        label="Short Entry Description"
        variant="bordered"
        placeholder="Enter your description"
        className="w-full h-fit"
        minRows={3}
        maxRows={5}
        value={cabinet.short_description}
        onChange={(e) =>
          setCabinet({ ...cabinet, short_description: e.target.value })
        }
      />
      <Textarea
        label="Full Description"
        variant="bordered"
        placeholder="Enter your description"
        className="w-full"
        minRows={10}
        maxRows={30}
        value={cabinet.description}
        onChange={(e) =>
          setCabinet({ ...cabinet, description: e.target.value })
        }
      />
      <Header variant="sub-subtitle">Images</Header>
      <ImageUploader
        updateImages={updateImages}
        images={(cabinet.images ?? []) as StorageImage[]}
        bucket="cabinets"
        path={cabinet.id}
      />

      <Header variant="subtitle">Specifications</Header>
      <Header variant="sub-subtitle">Response</Header>
      <div className="grid grid-cols-3 gap-4">
        <Select
          items={MAX_SPL_COUNT}
          label="Type"
          placeholder="Max SPL counts"
          variant="bordered"
          value={MAX_SPL_COUNT[cabinet.max_spl.length - 1]}
          defaultSelectedKeys={String(cabinet.max_spl.length - 1)}
          onChange={(e) => {
            cabinet.max_spl.length = parseInt(e.target.value) + 1;
            setCabinet({ ...cabinet });
          }}
        >
          {MAX_SPL_COUNT.map((cabinet, index) => (
            <SelectItem key={index}>{cabinet}</SelectItem>
          ))}
        </Select>
        {MAX_SPL_COUNT.filter((_, i) => i < cabinet.max_spl.length).map(
          (_, i) => (
            <Input
              key={i}
              type="number"
              variant="bordered"
              label={`Max SPL (${MAX_SPL_COUNT[i]})`}
              value={String(cabinet.max_spl[i])}
              onChange={(e) => {
                cabinet.max_spl[i] = parseInt(e.target.value);
                setCabinet({ ...cabinet });
              }}
              endContent="SPL"
            />
          )
        )}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Input
          type="number"
          variant="bordered"
          label="Frequency Start"
          endContent="Hz"
          value={String(cabinet.frequency_start ?? '')}
          onChange={(e) =>
            setCabinet({
              ...cabinet,
              frequency_start: e.target.value ? parseInt(e.target.value) : null,
            })
          }
        />
        <Input
          type="number"
          variant="bordered"
          label="Frequency End"
          endContent="Hz"
          value={String(cabinet.frequency_end ?? '')}
          onChange={(e) =>
            setCabinet({
              ...cabinet,
              frequency_end: e.target.value ? parseInt(e.target.value) : null,
            })
          }
        />
        <Input
          type="number"
          variant="bordered"
          label="Sensitivity"
          endContent="dB"
          value={String(cabinet.sensitivity[0] ?? '')}
          onChange={(e) =>
            setCabinet({
              ...cabinet,
              sensitivity: e.target.value ? [parseInt(e.target.value)] : [0],
            })
          }
        />
      </div>
      <Header variant="sub-subtitle">Directivity</Header>

      <div className="grid grid-cols-3 gap-4">
        <Input
          type="number"
          variant="bordered"
          label="Horizontal"
          endContent="deg"
          value={String(cabinet.directivity_horizontal ?? '')}
          onChange={(e) =>
            setCabinet({
              ...cabinet,
              directivity_horizontal: e.target.value
                ? parseInt(e.target.value)
                : null,
            })
          }
        />
        <Input
          type="number"
          variant="bordered"
          label="Vertical"
          endContent="deg"
          value={String(cabinet.directivity_vertical ?? '')}
          onChange={(e) =>
            setCabinet({
              ...cabinet,
              directivity_vertical: e.target.value
                ? parseInt(e.target.value)
                : null,
            })
          }
        />
        <Text variant="small" color="muted">
          Leave fields empty, if directivity doesn't apply
        </Text>
      </div>
      <Header variant="sub-subtitle">Dimensions</Header>
      <div className="grid grid-cols-3 gap-4">
        <Input
          type="number"
          variant="bordered"
          label="Height"
          endContent="mm"
          value={String(cabinet.height_mm ?? '')}
          onChange={(e) =>
            setCabinet({
              ...cabinet,
              height_mm: e.target.value ? parseInt(e.target.value) : null,
            })
          }
        />
        <Input
          type="number"
          variant="bordered"
          label="Width"
          endContent="mm"
          value={String(cabinet.width_mm ?? '')}
          onChange={(e) =>
            setCabinet({
              ...cabinet,
              width_mm: e.target.value ? parseInt(e.target.value) : null,
            })
          }
        />
        <Input
          type="number"
          variant="bordered"
          label="Depth"
          endContent="mm"
          value={String(cabinet.depth_mm ?? '')}
          onChange={(e) =>
            setCabinet({
              ...cabinet,
              depth_mm: e.target.value ? parseInt(e.target.value) : null,
            })
          }
        />
        <Input
          type="number"
          variant="bordered"
          label="Weight (Unloaded)"
          endContent="kg"
          value={String(cabinet.weight_kg ?? '')}
          onChange={(e) =>
            setCabinet({
              ...cabinet,
              weight_kg: e.target.value ? parseInt(e.target.value) : null,
            })
          }
        />

        <Select
          items={WOOD_THICKNESS}
          label="Wood Thickness"
          placeholder="Select wood Thickness"
          variant="bordered"
          onChange={(e) =>
            setCabinet({
              ...cabinet,
              wood_thickness_mm: e.target.value,
            })
          }
          selectedKeys={[cabinet.wood_thickness_mm || '']}
        >
          {WOOD_THICKNESS.map((thickness) => (
            <SelectItem key={thickness}>{thickness}</SelectItem>
          ))}
        </Select>
        <Text variant="small" color="muted">
          Leave fields empty, if measures aren't known
        </Text>
      </div>
      <Text variant="small" color="muted">
        Size: {mmToInches(cabinet.width_mm)} x {mmToInches(cabinet.height_mm)} x{' '}
        {mmToInches(cabinet.depth_mm)} inches (Width, height, depth)
        <br /> Thickness:{' '}
        {woodThicknessToInches(cabinet.wood_thickness_mm ?? '')} inch
        <br /> Weight: {kgsToPounds(cabinet.weight_kg)} pounds
      </Text>
      <div className="flex justify-between flex-row-reverse">
        <Button color="primary" onClick={() => onSave(cabinet)}>
          Save Cabinet
        </Button>
        {onDelete && (
          <ConfirmModal
            title="Are you sure?"
            description="Do you want to delete this precious cabinet?"
            cancelText="Cancel"
            color="danger"
            onConfirm={() => onDelete(cabinet)}
          >
            Delete Cabinet
          </ConfirmModal>
        )}
      </div>
    </>
  );
}

export default EditCabinet;
