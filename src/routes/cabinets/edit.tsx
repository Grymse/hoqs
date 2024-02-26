/* import { useSupabaseRequest } from '@/components/SupabaseRequest'; */
import PageContainer from '@/components/ui/PageContainer';
/* import { supabase } from '@/lib/supabase';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Tables } from '../../types/supabase'; */
import { Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import Header from '../../components/ui/Header';
import { useState } from 'react';
import ImageUploader from '@/components/ui/content/ImageUploader';
import Text from '../../components/ui/Text';

const cabinetTypes = ['Kick', 'Top', 'Kick/Top', 'Subwoofer'];
const MaxSPLCount = ['1 cab', '2 cabs', '4 cabs', '8 cabs', '16 cabs'];

export function EditCabinet() {
  /* const { id } = useParams();
  const cabReq = useRef(supabase.from('cabinet').select('*').eq('id', id));
  const { StatusComponent, data } = useSupabaseRequest(cabReq.current);
  const cabinet = data?.[0] as Tables<'cabinet'>; */

  const [amountOfMaxSPLCounts, setAmountOfMaxSPLCounts] = useState(2);
  const id = 'Some-cabinet-id';

  return (
    <PageContainer className="flex flex-col gap-4">
      {/* <StatusComponent /> */}
      <Header variant="subtitle">Description</Header>
      <Header variant="sub-subtitle">Details</Header>
      <div className="grid grid-cols-3 gap-4">
        <Input
          type="text"
          variant="bordered"
          placeholder="Paraflex"
          defaultValue="Paraflex"
          label="Brand"
        />
        <Input
          type="text"
          variant="bordered"
          placeholder="Type C"
          defaultValue="Type C"
          label="Model"
        />
        <Select
          items={cabinetTypes}
          label="Type"
          placeholder="Select cabinet type"
          variant="bordered"
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
        />
        <Input
          type="number"
          variant="bordered"
          label="Alt driver"
          endContent="inches"
        />
      </div>
      <Header variant="sub-subtitle">Descriptions</Header>
      <Textarea
        label="Short Entry Description"
        variant="bordered"
        placeholder="Enter your description"
        className="w-full h-fit"
      />
      <Textarea
        label="Full Description"
        variant="bordered"
        placeholder="Enter your description"
        className="w-full"
        minRows={10}
        maxRows={30}
      />
      <Header variant="sub-subtitle">Images</Header>
      <ImageUploader images={[]} bucket="cabinets" path={id} />

      <Header variant="subtitle">Specifications</Header>
      <Header variant="sub-subtitle">Response</Header>
      <div className="grid grid-cols-3 gap-4">
        <Select
          items={MaxSPLCount}
          label="Type"
          placeholder="Max SPL counts"
          variant="bordered"
          value={MaxSPLCount[amountOfMaxSPLCounts - 1]}
          onChange={(e) => {
            setAmountOfMaxSPLCounts(parseInt(e.target.value) + 1);
          }}
        >
          {MaxSPLCount.map((cabinet, index) => (
            <SelectItem key={index}>{cabinet}</SelectItem>
          ))}
        </Select>
        {MaxSPLCount.filter((_, i) => i < amountOfMaxSPLCounts).map((_, i) => (
          <Input
            key={i}
            type="number"
            variant="bordered"
            label={`Max SPL (${MaxSPLCount[i]})`}
            endContent="SPL"
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Input
          type="number"
          variant="bordered"
          label="Frequency Start"
          endContent="Hz"
        />
        <Input
          type="number"
          variant="bordered"
          label="Frequency End"
          endContent="Hz"
        />
        <Input
          type="number"
          variant="bordered"
          label="Sensitivity"
          endContent="dB"
        />
      </div>
      <Header variant="sub-subtitle">Directivity</Header>
      <div className="grid grid-cols-3 gap-4">
        <Input
          type="number"
          variant="bordered"
          label="Horizontal"
          endContent="deg"
        />
        <Input
          type="number"
          variant="bordered"
          label="Vertical"
          endContent="deg"
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
          endContent="cm"
        />
        <Input type="number" variant="bordered" label="Width" endContent="cm" />
        <Input type="number" variant="bordered" label="Depth" endContent="cm" />
        <Input
          type="number"
          variant="bordered"
          label="Weight (Unloaded)"
          endContent="kg"
        />
        <Input
          type="number"
          variant="bordered"
          label="Wood Thickness"
          endContent="mm"
        />
      </div>
      <Text variant="small" color="muted">
        Size: 25 x 15 x 12 inches
        <br /> Thickness: 1/2 inch
        <br /> Weight: 521 pounds
      </Text>
      {/* {cabinet && (
        <div>
          <ImageCaroussel images={cabinet.images as StorageImage[]} />
          <Header>{cabinet.brand + ' ' + cabinet.model}</Header>
          <Text variant="thick">{cabinet.short_description}</Text>
          <Text variant="thick">{cabinet.description}</Text>
        </div>
      )} */}
    </PageContainer>
  );
}

export default EditCabinet;
