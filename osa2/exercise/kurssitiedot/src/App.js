
const Course = ({course}) => {
  const Header = () => <h1> {course.name} </h1>
  const p = course.parts
  const Parts = () => p.map(part => <p key={part.id}>{part.name} {part.exercises}</p>) 
  const Content = () => <Parts />
  
  const Total= () => {
    const e = p.map(part => part.exercises)
    return (
      <div>
        <b>
          total of {e.reduce((accumulator, curr) => accumulator + curr)} exercises
        </b>
      </div>
    )
  }
    
  return (
    <div>
      <Header />
      <Content />
      <Total />
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