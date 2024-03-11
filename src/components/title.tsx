type TitleProps = {
  title: string;
  date?: string;
};

export default function Title({ title, date }: TitleProps) {
  return (
    <div className="not-prose mb-8">
      <h1 className="text-black dark:text-white font-medium text-2xl">
        {title}
      </h1>
      {date && <span className="text-sm">{date}</span>}
    </div>
  );
}
