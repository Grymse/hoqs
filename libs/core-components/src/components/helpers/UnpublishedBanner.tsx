import Text from "../ui/Text"

type Props = {show?: boolean}

export default function UnpublishedBanner({show=true}: Props) {
if (!show) return null

  return (
    <div className="w-full flex justify-center bg-red-500">
        <Text className="my-0">NOT PUBLISHED</Text>
    </div>
  )
}