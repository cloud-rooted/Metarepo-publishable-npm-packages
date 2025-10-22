import React from 'react'
import RenderBackground from './ui/CyberParticleBG'

function About() {
  return (
    <div className="relative min-h-screen w-full">
      <RenderBackground />
      
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center bg-transparent px-6 py-24 text-white">
        <h1 className="mb-8 text-4xl font-bold">About me</h1>
        <p className="max-w-2xl text-center">
          A passionate full-stack developer and founder of Electroplix, currently pursuing a degree in Computer Science Engineering, with hands-on experience in building scalable and dynamic end-to-end applications.
        </p>
      </div>
    </div>
  )
}

export default About