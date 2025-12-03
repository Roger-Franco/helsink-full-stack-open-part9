interface TotalProps {
  // courseParts: Array<{ name: string, exerciseCount: number }>
  totalExercises: number
}

const Total = (props: TotalProps) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.totalExercises}
        {/* {props.courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)} */}
      </p>
    </div>
  )
}

export default Total;