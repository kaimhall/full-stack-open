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
            {courses.map(course => {
                return (
                    <div key={course.id}>
                        <Header course= {course} />
                        <Content course = {course} />
                        <Total course = {course} />
                    </div>
                )
            })}
        </div>
    )
  }

  export default Course