import { Driver } from '@core/types/types';
import { Button, Input } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  setDriver: (driver: Driver) => void;
  driver: Partial<Driver>;
}

export default function DriverImporter({ setDriver, driver }: Props) {
  const [importURL, setImportURL] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [importURL]);

  function importDriver(e: React.MouseEvent<HTMLButtonElement>) {
    if (
      !(
        importURL.startsWith('https://www.loudspeakerdatabase.com') ||
        importURL.startsWith('www.loudspeakerdatabase.com') ||
        importURL.startsWith('loudspeakerdatabase.com') ||
        importURL.startsWith('https://loudspeakerdatabase.com')
      )
    ) {
      toast.error("URL must be from 'loudspeakerdatabase.com'");
      setError(`URL must be from 'loudspeakerdatabase.com`);
      return;
    }

    e.preventDefault();

    const URL =
      'https://loudspeakerdatabase.com' +
      importURL.split('database.com').slice(1).join('');

    const promise = new Promise((resolve, reject) => {
      fetch(
        `https://vgtljajaxrfrybokahvz.supabase.co/functions/v1/import?url=${URL}`
      )
        .then((res) => {
          if (res.ok) {
            res
              .json()
              .then((data) => {
                setDriver({ ...driver, ...data });
                resolve(driver);
              })
              .catch(reject);
          } else {
            reject(res.statusText);
          }
        })
        .catch((e) => {
          reject(
            (e.message || e) +
              ' - Ensure the link is correct & that you have internet'
          );
        });
    });

    toast.promise(promise, {
      loading: 'Importing driver...',
      success: 'Driver imported successfully',
      error: (e) => {
        setError(`Error importing driver ${e}`);
        return `Error importing driver ${e}`;
      },
    });
  }

  return (
    <div className="flex gap-4">
      <Input
        label="Import URL"
        size="sm"
        value={importURL}
        onChange={(e) => setImportURL(e.target.value)}
        errorMessage={error}
        isInvalid={error.length !== 0}
        description="Insert an URL from 'loudspeakerdatabase.com' to import driver data. Example: 'https://loudspeakerdatabase.com/TangBand/W6-1139SI'"
      />
      <Button onClick={importDriver} variant="bordered" color="primary">
        Import
      </Button>
    </div>
  );
}
