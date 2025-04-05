import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@heroui/react";

type CardUIProps = {
  title: string;
  content?: string;
};

export default function CardUI({ title, content }: CardUIProps) {
  return (
    <Card className=" hover:shadow-lg transition-shadow duration-300 hover:scale-105 ">
      <CardHeader className="flex gap-2">
        <Image
          alt={`${title} logo`}
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md font-semibold">{title}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{content || "Made with ❤️ by Yash | Byte&Circuits"}</p>
      </CardBody>
      <Divider />
    </Card>
  );
}
