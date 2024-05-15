import React from 'react'

export default function Header() {
  return (
    <div >
    Header
    <div>
                <nav>
                    <ul className="flex flex-row gap-2 text-right">
                        <li><a href="/" className="text-xs hover:underline">home</a></li>
                        <li><a href="/about" className="text-xs hover:underline">about</a></li>
                        <li><a href="/signin"
                                className="text-xs bg-orange-600 p-1 rounded-lg text-white shadow-lg hover:bg-orange-500">login</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
  )
}
