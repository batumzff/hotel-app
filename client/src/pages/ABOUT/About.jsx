import { Suspense } from "react"
import { useNavigate } from "react-router-dom"
import { memberImages } from "../../assets/PyScript-members/memberImages"
import "./About.css"

const About = () => {

const navigate = useNavigate()
  const handleClick = (id) => {
   navigate(`/about-details/${id}`)
  }
  return (
    <main>
      <section>
        <h2>PyScript Groups</h2>
        <h3 >more than a life style</h3>
        <p>
          We began our journey with a group of Full Stack Developers  and keeping our enthusiast on IT World and at the same time we are serving people who deserve the best at anytime for anything with our best.
        </p>
        <p>We are trying to be everywhere with the best quality to make you get what you deserve in your life journey. We hope to see you more frequent to serve you the best quality with the best price that makes you smile and get comfortable.
        </p>
        <Suspense fallback={ <h3>Loading...</h3> }>
            <div >
          { memberImages.map((image) => (
            <div  key={image.id} onClick={() => handleClick(image.id)}>
             <img src={image.imageAddress} alt="members" />
            <div >{image.info}</div>
            </div>
          ))}
        </div>
        </Suspense>
      
      </section>
    </main>
  )
}

export default About