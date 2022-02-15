
const Course = ({course}) => {
  const courses = course.map( c => c)
  
  const Header = ({course}) => <h3 key={course.id}> {course.name} </h3>
  const Parts = ({course}) => course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>) 
  const Content = ({course}) => <Parts course={course} />
  
  const Total= ({course}) => {
    const e = course.parts.map(part => part.exercises)
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
      <h1> Web development curriculum </h1>
      {
        courses.map (
          course => {
            return (
              <div key={course.id}>
                <Header course= {course} />
                <Content course = {course} />
                <Total course = {course} />
              </div>
            )
          }
        )
      }
    </div>
  )
}

const App = () => {
  const courses = [
    {
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        },
        {
          name: 'Server',
          exercises: 10,
          id: 3
        },
        {
          name: 'Debug',
          exercises: 25,
          id: 4
        }
      ]
    }
  ]

  return (
    <Course course={courses} />
  )
}


 
export default App