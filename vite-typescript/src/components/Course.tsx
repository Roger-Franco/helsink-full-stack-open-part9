import type { CourseProps } from '../types'


const Course = ({ part }: CourseProps) => {

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }
  switch (part.kind) {
    case 'basic':
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b> <br></br>

          {part.description}
        </p>
      )
    case 'group':
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b> <br></br>
          project exercises {part.groupProjectCount}
        </p>
      )
    case 'background':
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b> <br></br>
          {part.description} <br></br>
          submit to: {part.backgroundMaterial}
        </p>
      )
    case 'special':
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b> <br></br>
          {part.description} <br></br>
          required skills: {part.requirements[0]} - {part.requirements[1]}
        </p>
      )
    default:
      return assertNever(part)
  }
}

export default Course;