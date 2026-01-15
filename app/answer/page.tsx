// app/answer/page.tsx
import AnswerClient from "./AnswerClient";

export const dynamic = "force-dynamic";

export default function Page() {
  return <AnswerClient />;
}