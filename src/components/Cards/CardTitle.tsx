import TextUppercase from "../TextUppercase";

export default function CardTitle({ children }: { children: React.ReactNode }) {
  return <TextUppercase >{children}</TextUppercase>;
}
