import React from 'react'
import { useParams } from 'react-router-dom'
import { memberImages } from '../../assets/PyScript-members/memberImages'
import "./AboutDetails.css"

const AboutDetails = () => {
    const { id } = useParams()
    const desiredDetail = memberImages.find(item => item.id == id)
    
  return (
    <main>
        <section>
            <div className="main-details">
             {
                <div className="detail-container" key={desiredDetail.id}>
                   <h3>{desiredDetail.info}</h3>
                   <img src={desiredDetail.imageAddress} alt="member-image" />
                   <span className='details'>{desiredDetail.details}</span>
                </div>
             }
            </div>
        </section>
        
    </main>
  )
}

export default AboutDetails