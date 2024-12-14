import React from 'react'
import MobileCategoryBtnChild from './Unchild'


const MobileCategoryBtn = () => {
  return (
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-[#062654]">Top Pornstar</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <MobileCategoryBtnChild
            title="Digital Photography"
            description="Master the art of digital photography with professional techniques and modern equipment."
            imageUrl="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=1000"
          />
        </div>
      </div>
  )
}

export default MobileCategoryBtn