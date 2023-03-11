export default function Winners({ winner }) {
  return (
    <div className="winner-details">
      <div>
        <strong>Name: </strong> {winner.fullName}
      </div>
      <div>
        <strong>Tasks Done: </strong> {winner.completedTasks.length}
      </div>
    </div>
  );
}
