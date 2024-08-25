import React from 'react'

function Sectionupper({link,description,name,content}) {
  return (
    <div className='mt-10'>
        <article className="relative h-96 overflow-hidden rounded-lg shadow transition hover:bg-transparent hover:scale-105 hover:shadow-lg">
  <img
    alt=""
    src={`${link}`}
    className="absolute inset-0 h-full w-full hover:scale-125 object-cover"
  />

  <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25  pt-32 sm:pt-48 lg:pt-64">
    <div className="p-4 sm:p-6">
      <time dateTime="2022-10-10" className="block text-xs text-white/90"> 10th Oct 2022 </time>

      <a href="#">
        <h3 className="mt-0.5 text-lg text-white">{name}</h3>
      </a>

      <p className="mt-2 line-clamp-3 text-sm/relaxed text-white/95">
        {content}
      </p>
    </div>
  </div>
</article>  
    </div>
  )
}

export default Sectionupper
