type TitleProps = {
  title: string;
  publishDate?: string;
};

export default function Title({ title, publishDate }: TitleProps) {
  return (
    <div className="not-prose mb-8">
      <h1 className="text-black dark:text-white font-medium text-2xl mb-1">
        {title}
      </h1>
      {publishDate && <p className="text-sm">{publishDate}</p>}
    </div>
  );
}
