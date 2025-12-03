import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { getAllDiaries } from './diaryService'
import { Visibility, Weather, type DiaryEntry } from './types'
// import './App.css'

function App() {

  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])
  const [newDiaryEntry, setNewDiaryEntry] = useState<DiaryEntry>({} as DiaryEntry)
  const [date, setDate] = useState<string>('')
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great)
  const [weather, setWeather] = useState<Weather>(Weather.Sunny)
  const [comment, setComment] = useState<string>(3)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaryEntries(data)
    })
    // axios.get('http://localhost:3030/api/diaries').then(res => setDiaryEntries(res.data))
    // const result = getAllDiaries()
    // setDiaryEntries(result)
    // const response = fetch('http://localhost:3030/diaries')
    // response.then(res => res.json()).then(json => console.log(json))
  }, [])

  const createDiary = (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log(date, visibility, weather, comment, 'date, visibility, weather, comment')
    try {
      const id = Math.max(...diaryEntries.map(d => d.id)) + 1
      console.log(newDiaryEntry, 'newDiaryEntry')
      const resp = axios.post('http://localhost:3030/api/diaries', { id, date, visibility, weather, comment }).then(res => {
        console.log(res.data, 'res.data')
        setDiaryEntries([...diaryEntries, res.data])
      })
      console.log(resp, 'resp')
      return resp
    } catch (error) {
      console.log(error, 'error')
      if (axios.isAxiosError(error)) {
        console.log(error.status, 'error.status')
        console.error(error.response, 'error.response');
        // Do something with this error...
        setError(error.response?.data as string)
      } else {
        console.error(error);
        console.log(error, 'error')
        setError((error as Error)?.message ?? '')
      }
    }
  }

  return (
    <>
      <div style={{ padding: '10px' }}>
        <form onSubmit={createDiary} style={{ padding: '10px', border: '1px solid black' }}>
          <h2>Add new entrie</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div>
            <label htmlFor=">date">Date: </label>
            <input onChange={(e) => setDate(e.target.value)} type="date" name="date" id="date" />
          </div>
          <fieldset>
            <legend>Visibility: </legend>
            <div>
              <input onChange={(e) => setVisibility(e.target.value as Visibility)} type="radio" id="great" name="visibility" value="great" />
              <label htmlFor="great">great</label>

              <input onChange={(e) => setVisibility(e.target.value as Visibility)} type="radio" id="good" name="visibility" value="good" />
              <label htmlFor="good">good</label>

              <input onChange={(e) => setVisibility(e.target.value as Visibility)} type="radio" id="ok" name="visibility" value="ok" />
              <label htmlFor="ok">ok</label>

              <input onChange={(e) => setVisibility(e.target.value as Visibility)} type="radio" id="poor" name="visibility" value="poor" />
              <label htmlFor="poor">poor</label>
            </div>
          </fieldset>
          <fieldset>
            <legend>Weather: </legend>
            <div>
              <input onChange={(e) => setWeather(e.target.value as Weather)} type="radio" id="sunny" name="weather" value="sunny" />
              <label htmlFor="sunny">sunny</label>

              <input onChange={(e) => setWeather(e.target.value as Weather)} type="radio" id="rainy" name="weather" value="rainy" />
              <label htmlFor="rainy">rainy</label>

              <input onChange={(e) => setWeather(e.target.value as Weather)} type="radio" id="cloudy" name="weather" value="cloudy" />
              <label htmlFor="cloudy">cloudy</label>

              <input onChange={(e) => setWeather(e.target.value as Weather)} type="radio" id="stormy" name="weather" value="stormy" />
              <label htmlFor="stormy">stormy</label>

              <input onChange={(e) => setWeather(e.target.value as Weather)} type="radio" id="windy" name="weather" value="windy" />
              <label htmlFor="windy">windy</label>
            </div>
          </fieldset>
          <div style={{ marginTop: '10px' }}>
            <label htmlFor="comment">Comment: </label>
            <textarea onChange={(e) => setComment(e.target.value)} name="comment" id="comment" cols={30} rows={1}></textarea>
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>

        <div>
          <h2>Diary entries</h2>
          <div>
            {diaryEntries.map(entry => (
              <div key={entry.id} style={{ padding: '10px', border: '1px solid black' }}>
                <p>{entry.date}</p>
                <p>visibility: {entry.visibility}</p>
                <p>weather: {entry.weather}</p>
                <p>{entry.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
