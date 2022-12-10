import { Heading } from '@chakra-ui/react'
import TaskList from './components/TaskList'
import Main from './layout/Main'

function App() {

  return (
    <Main>
      
      <Heading as='h1' size={{base: 'md', lg:'xl'}} textAlign="center">Streamframe Coding Assignment</Heading>

      <TaskList/>
      

    </Main>
  )
}

export default App
