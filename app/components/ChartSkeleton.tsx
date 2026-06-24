import React from 'react'

const ChartSkeleton = () => {
  return (
    <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl p-4 shadow-sm animate-pulse my-2">
    <div className="h-4 bg-slate-200 rounded w-1/3 mb-4"></div>
    <div className="h-32 bg-slate-100 rounded-lg w-full flex items-end justify-between p-2 space-x-2">
      <div className="bg-slate-200 h-12 w-full rounded"></div>
      <div className="bg-slate-200 h-24 w-full rounded"></div>
      <div className="bg-slate-200 h-16 w-full rounded"></div>
      <div className="bg-slate-200 h-28 w-full rounded"></div>
    </div>
    <div className="h-3 bg-slate-200 rounded w-1/4 mt-4 ml-auto"></div>
  </div>
  )
}

export default ChartSkeleton