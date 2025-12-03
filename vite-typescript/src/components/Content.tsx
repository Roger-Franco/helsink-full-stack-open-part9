// import type { CoursePart } from '../App'

import type { CoursePart } from '../types'
import Course from './Course';

interface ContentProps {
  // courseParts: Array<{ name: string, exerciseCount: number }>
  courseParts: CoursePart[]
}

const Content = ({ courseParts }: ContentProps) => {
  // console.log(props, 'props')
  // const { courseParts } = props

  // const assertNever = (value: never): never => {
  //   throw new Error(
  //     `Unhandled discriminated union member: ${JSON.stringify(value)}`
  //   )
  // }
  // const infoCourses = courseParts.map(part => {
  //   switch (part.kind) {
  //     case 'basic':
  //       return (
  //         <p>
  //           {part.name} {part.exerciseCount} {part.description}
  //         </p>
  //       )
  //     case 'group':
  //       return (
  //         <p>
  //           {part.name} {part.exerciseCount} {part.groupProjectCount}
  //         </p>
  //       )
  //     case 'background':
  //       return (
  //         <p>
  //           {part.name} {part.exerciseCount} {part.description} {part.backgroundMaterial}
  //         </p>
  //       )
  //     case 'special':
  //       return (
  //         <p>
  //           {part.name} {part.exerciseCount} {part.description} {part.requirements}
  //         </p>
  //       )
  //     default:
  //       return assertNever(part)
  //   }
  // })
  return (
    <div>
      {/* {infoCourses} */}
      {courseParts.map((part, i) => (
        <Course key={i} part={part} />
      ))}
    </div>
  )
}

export default Content;