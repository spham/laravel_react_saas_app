import React from 'react'
import SearchBox from './words/SearchBox'
import Word from './words/Word'
import MenuItems from './layouts/MenuItems'

export default function Home() {
    return (
        <div 
            className="card main__card border border-dark 
                border-3 bg-white my-5 rounded-0 shadow">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12">
                        <SearchBox />
                        <Word />
                    </div>
                </div>
            </div>
            <div className="card-footer bg-white">
                <MenuItems />
            </div>
        </div>
    )
}
