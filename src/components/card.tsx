export default function Card({
  title,
  subtitle,
  buttonText,
  buttonUrl,
}: {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonUrl: string;
}) {
  return (
    <div className="card bg-base-300 w-96 shadow-lg">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{subtitle}</p>
        <div className="card-actions justify-end">
          <a href={buttonUrl} className="btn btn-accent">
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
}
