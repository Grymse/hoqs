import React from 'react';
import { Card, CardHeader, Image } from '@nextui-org/react';
import { StorageImage } from '@/types/types';
import { Link } from 'react-router-dom';

interface Cabinet {
  id: string;
  brand: string;
  model: string;
  images: StorageImage[];
  type: string;
}

interface Props {
  cabinet: Cabinet;
}

export default function CabinetCard({ cabinet }: Props) {
  return (
    <Link to={'/cabinets/' + cabinet.id} className="w-fit flex">
      <Card className="col-span-12 sm:col-span-4 h-64 w-64 cursor-pointer outline-1 hover:outline-primary-500">
        <CardHeader className="absolute pointer-events-none z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            {cabinet.brand}
          </p>
          <h4 className="text-white font-medium text-large">{cabinet.model}</h4>
        </CardHeader>
        <Image
          isZoomed
          removeWrapper
          alt={'Image of ' + cabinet.model}
          className="z-0 w-full h-full object-cover"
          src={cabinet.images?.[0]?.url}
        />
      </Card>
    </Link>
  );
}
