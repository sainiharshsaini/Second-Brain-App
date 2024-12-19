import './App.css'
import { Button } from './components/ui/Button'
import { PlusIcon } from './icons/PlusIcon'

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <Button startIcon={<PlusIcon/>} size='sm' variant='primary' text='share'/>
      <Button size='md' variant='secondary' text='Add Content'/>
      <Button size='lg' variant='secondary' text='Add Content'/>
    </>
  )
}

export default App
