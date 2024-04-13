import Header from '@core/components/ui/Header';
import Text from '@core/components/ui/Text';

export function NotFound() {
  return (
    <main className="grow justify-center items-center text-center max-w-96 flex flex-col gap-2">
      <Header id="notfound.title" />
      <Text id="notfound.description" />
      <img
        src="./blown.jpg"
        alt="A blown speaker driver"
        className="rounded-xl shadow-lg object-cover"
      />
    </main>
  );
}
