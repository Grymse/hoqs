import PageContainer from '@/components/ui/PageContainer';
import { Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import Header from '../../components/ui/Header';
import { useRef, useState } from 'react';
import ImageUploader from '@/components/ui/content/ImageUploader';
import Text from '../../components/ui/Text';
import { Tables } from '@/types/supabase';
import { useSupabaseRequest } from '@/components/SupabaseRequest';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { StorageImage, WithImages } from '@/types/types';
import { kgsToPounds, mmToInches } from '@/lib/translations';

const cabinetTypes = ['Kick', 'Top', 'Kick/Top', 'Subwoofer'];
const MaxSPLCount = ['1 cab', '2 cabs', '4 cabs', '8 cabs', '16 cabs'];

export function EditCabinet() {
  const { id } = useParams();
  const cabReq = useRef(supabase.from('cabinets').select('*').eq('id', id));
  const { StatusComponent, data } = useSupabaseRequest(cabReq.current);
  const cabinet = data?.[0] as WithImages<Tables<'cabinets'>>;

  return (
    <PageContainer className="flex flex-col gap-4">
      <StatusComponent />
      {cabinet && <EditForm initialCabinet={cabinet} />}
    </PageContainer>
  );
}

interface EditFormProps {
  initialCabinet: WithImages<Tables<'cabinets'>>;
}

function EditForm({ initialCabinet }: EditFormProps) {
  const [cabinet, setCabinet] = useState(initialCabinet);

  function updateImages(fn: (images: StorageImage[] | null) => StorageImage[]) {
    setCabinet((cabinet) => {
      return { ...cabinet, images: fn(cabinet.images) };
    });
  }
  return (
    <>
      <Header variant="subtitle">Description</Header>
      <Text variant="small">
        Here you can edit the details of the cabinet. Please make sure to fill
        out all the fields.
      </Text>
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
          items={cabinetTypes}
          label="Type"
          placeholder="Select cabinet type"
          variant="bordered"
          value={cabinet.type || cabinetTypes[0]}
          onChange={(e) => setCabinet({ ...cabinet, type: e.target.value })}
        >
          {cabinetTypes.map((cabinet) => (
            <SelectItem key={cabinet}>{cabinet}</SelectItem>
          ))}
        </Select>
        <Input
          type="number"
          variant="bordered"
          label="Driver size"
          endContent="inches"
          value={String(cabinet.driver_size ?? 0)}
          onChange={(e) =>
            setCabinet({
              ...cabinet,
              driver_size: parseInt(e.target.value) || null,
            })
          }
        />
        <Input
          type="number"
          variant="bordered"
          label="Alt driver"
          endContent="inches"
          value={String(cabinet.alternative_driver_size ?? 0)}
          onChange={(e) =>
            setCabinet({
              ...cabinet,
              alternative_driver_size: parseInt(e.target.value) || null,
            })
          }
        />
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
          items={MaxSPLCount}
          label="Type"
          placeholder="Max SPL counts"
          variant="bordered"
          value={MaxSPLCount[cabinet.max_spl.length - 1]}
          onChange={(e) => {
            cabinet.max_spl.length = parseInt(e.target.value);
          }}
        >
          {MaxSPLCount.map((cabinet, index) => (
            <SelectItem key={index}>{cabinet}</SelectItem>
          ))}
        </Select>
        {MaxSPLCount.filter((_, i) => i < cabinet.max_spl.length).map(
          (_, i) => (
            <Input
              key={i}
              type="number"
              variant="bordered"
              label={`Max SPL (${MaxSPLCount[i]})`}
              value={String(cabinet.max_spl[i])}
              onChange={(e) => {
                cabinet.max_spl[i] = parseInt(e.target.value);
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
          value={String(cabinet.frequency_start)}
          onChange={(e) =>
            setCabinet({
              ...cabinet,
              frequency_start: parseInt(e.target.value) || null,
            })
          }
        />
        <Input
          type="number"
          variant="bordered"
          label="Frequency End"
          endContent="Hz"
          value={String(cabinet.frequency_end)}
          onChange={(e) =>
            setCabinet({
              ...cabinet,
              frequency_end: parseInt(e.target.value) || null,
            })
          }
        />
        <Input
          type="number"
          variant="bordered"
          label="Sensitivity"
          endContent="dB"
          value={String(cabinet.sensitivity[0])}
          onChange={(e) =>
            setCabinet({
              ...cabinet,
              sensitivity: [parseInt(e.target.value)] || [0],
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
              directivity_horizontal: parseInt(e.target.value) || null,
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
              directivity_vertical: parseInt(e.target.value) || null,
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
          value={String(cabinet.height_mm)}
          onChange={(e) =>
            setCabinet({
              ...cabinet,
              height_mm: parseInt(e.target.value) || null,
            })
          }
        />
        <Input
          type="number"
          variant="bordered"
          label="Width"
          endContent="mm"
          value={String(cabinet.width_mm)}
          onChange={(e) =>
            setCabinet({
              ...cabinet,
              width_mm: parseInt(e.target.value) || null,
            })
          }
        />
        <Input
          type="number"
          variant="bordered"
          label="Depth"
          endContent="mm"
          value={String(cabinet.depth_mm)}
          onChange={(e) =>
            setCabinet({
              ...cabinet,
              depth_mm: parseInt(e.target.value) || null,
            })
          }
        />
        <Input
          type="number"
          variant="bordered"
          label="Weight (Unloaded)"
          endContent="kg"
          value={String(cabinet.weight_kg)}
          onChange={(e) =>
            setCabinet({
              ...cabinet,
              weight_kg: parseInt(e.target.value) || null,
            })
          }
        />
        <Input
          type="number"
          variant="bordered"
          label="Wood Thickness"
          endContent="mm"
          value={String(cabinet.wood_thickness_mm)}
          onChange={(e) =>
            setCabinet({
              ...cabinet,
              wood_thickness_mm: parseInt(e.target.value) || null,
            })
          }
        />
      </div>
      <Text variant="small" color="muted">
        Size: {mmToInches(cabinet.width_mm)} x {mmToInches(cabinet.height_mm)} x{' '}
        {mmToInches(cabinet.depth_mm)} inches (Width, height, depth)
        <br /> Thickness: {mmToInches(cabinet.wood_thickness_mm)} inch
        <br /> Weight: {kgsToPounds(cabinet.weight_kg)} pounds
      </Text>
    </>
  );
}

export default EditCabinet;
