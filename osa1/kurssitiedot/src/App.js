import React from 'react'

const Header = (props) => {
  return (
    <div>
      <p>
        {props.course.name}
      </p>
    </div>
  )
}

const Part = (props) => {
  //console.log(props)
  return (
    <div>
      <p>{props.name} {props.exer}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
        <Part name= {props.course.parts[0].name} exer={props.course.parts[0].exercises} />
        <Part name= {props.course.parts[1].name} exer={props.course.parts[1].exercises} />
        <Part name= {props.course.parts[2].name} exer={props.course.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  console.log('Here !!')
  return (
    <div>
      <p>
        Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises} 
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name:'Half Stack application development',
    parts: [
    {
      name:'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to passdata',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
}
  return (
    <>
     <h1><Header course= {course} /></h1>
     <Content course={course} />
     <Total course= {course} />
    </>
  );
}

export default App;
