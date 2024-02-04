import { useParams } from 'react-router-dom';

export function Cabinet() {
  const { id } = useParams();

  return (
    <div className="w-96 h-96 flex justify-center items-center">
      <p>Cabinet page! {id}</p>
    </div>
  );
}

export default Cabinet;
