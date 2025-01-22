import { DocumentType } from "libs/core-components/src/types/types";
import Header from "../../ui/Header";
import Markdown from "./Markdown";

type Props = {
  document: DocumentType;
};

export default function Document({ document }: Props) {
  return <>
    <Header>{document.title}</Header>
    <Markdown>{document.content}</Markdown>
    </>;
}
