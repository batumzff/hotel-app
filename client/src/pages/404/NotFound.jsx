import React from 'react'
import { useNavigate } from 'react-router-dom'
import MyButton from '../../components/FORM-INPUTS/MyButton'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <section>
      <div>
        <img src="https://img.freepik.com/free-vector/404-error-lost-space-concept-illustration_114360-7971.jpg?size=626&ext=jpg&ga=GA1.2.1457292162.1713696621&semt=ais_hybrid" alt="" />
      </div>
      <MyButton onClick={() => navigate("/")}>Home</MyButton>
    </section>
  )
}

export default NotFound