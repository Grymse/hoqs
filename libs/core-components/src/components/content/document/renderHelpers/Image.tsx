import React from 'react'
import ImageCaroussel from '../../images/ImageCaroussel'


type Props = { src: string, alt?: string, title?: string }

export default function Image({src, alt, title}: Props) {
  return <ImageCaroussel
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
}