
const Course = ({course}) => {
  const p = course.parts
  const Header = () => <h1> {course.name} </h1>
  const Parts = () => p.map(part => <p key={part.id}>{part.name} {part.exercises}</p>) 
  const Content = () => <Parts />
    
  return (
    <div>
      <Header />
      <Content />
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id:1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id:2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id:3
      },
      {
        name: 'Redux',
        exercises: 11,
        id:4
      }
    ]
  }

  return (
    <Course course={course} />
  )
}

export default App