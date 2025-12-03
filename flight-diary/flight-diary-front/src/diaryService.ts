import axios from 'axios'
import type { DiaryEntry, newDiaryEntry } from './types'

const baseUrl = 'http://localhost:3030/api/diaries'

export const getAllDiaries = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then(res => res.data)
}

export const createDiary = (object: newDiaryEntry) => {
  return axios.post<DiaryEntry>(baseUrl, object).then(res => res.data)
}