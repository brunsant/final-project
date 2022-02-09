import React from "react"
import Lottie from "react-lottie"
import animationData from "../Animations/loading"

import "./loadinglottie.css"

const LoadingLottie = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  return (
    <div className="lottie-container">
      <div className="lottie">
        <Lottie options={defaultOptions} height={500} width={500} />
      </div>
    </div>
  )
}
export default LoadingLottie
