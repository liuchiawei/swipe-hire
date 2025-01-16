export default function Dialog({ job }: { job: Job }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold">Dialog</h2>
        <p>{job.title}</p>
        <p>{job.description}</p>
      </div>
    </div>
  );
}
