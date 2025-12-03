export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  description?: string;
}

export interface CoursePartBasic extends CoursePartWithDescription {
  kind: "basic"
}

export interface CoursePartGroup extends CoursePartWithDescription {
  groupProjectCount: number;
  kind: "group"
}

export interface CoursePartBackground extends CoursePartWithDescription {
  backgroundMaterial: string;
  kind: "background"
}

export interface CoursePartSpecial extends CoursePartWithDescription {
  requirements: string[];
  kind: "special"
}

interface CoursePartWithDescription extends CoursePartBase {
  description?: string
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

export interface CourseProps {
  part: CoursePart
}