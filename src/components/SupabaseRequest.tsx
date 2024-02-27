import { PostgrestError, PostgrestSingleResponse } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import Text from './ui/Text';
import Header from './ui/Header';
import { CircularProgress } from '@nextui-org/react';

interface SimplePromise<T> {
  then: (fn: (out: T) => void) => void;
}

export function useSupabaseRequest<T>(
  supabaseRequest: SimplePromise<PostgrestSingleResponse<T>>
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    supabaseRequest.then((out) => {
      if (out.error) {
        setError(out.error);
      } else {
        // @ts-expect-error data is not null
        if (out.data?.[0] === undefined) {
          setData(null);
          setError({
            message: 'Could not find ressource',
            details:
              'The ressource you are looking for could not be found. Please check the URL and try again.',
            hint: 'Check the URL and try again. If the problem persists, contact the administrator.',
            code: '404',
          });
        }
        setData(out.data);
      }
    });
  }, [supabaseRequest]);

  return {
    data,
    StatusComponent: error
      ? () => <SupabaseError error={error} />
      : data
      ? () => null
      : () => (
          <div className="w-full h-full flex justify-center items-center">
            <CircularProgress size="md" aria-label="Loading..." />
          </div>
        ),
  };
}

interface Props {
  error: PostgrestError;
}

export function SupabaseError({ error }: Props) {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <Header variant="subtitle" color="danger">
        {error.message}
      </Header>
      <Text>Error code: {error.code}</Text>
    </div>
  );
}
