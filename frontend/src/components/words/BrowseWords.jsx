import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setMessage } from '../../redux/slices/wordDetailsSlice'
import { axiosRequest } from '../../helpers/config'
import SearchResults from './SearchResults'
import { alphabetsList } from '../../helpers/alphabetsList'
import Word from './Word'
import MenuItems from '../layouts/MenuItems'
import TopRightMenu from '../layouts/TopRightMenu'

export default function BrowseWords() {
    const [words, setWords] = useState([])
    const { message } = useSelector(state => state.word)
    const { isLoggedIn, user } = useSelector(state => state.user)
    const dispatch = useDispatch()

    //find words start with a character
    const findWordByCharacter = async (character) => {
        clearState()
        try {
            const response = await axiosRequest.get(`words/${character}/starts`) 
            if(response.data.data.length > 0) {
                setWords(response.data.data)
            }else {
                dispatch(setMessage('No results found!'))
            }
        } catch (error) {
            console.log(error)
        }
    }

    //clear the state variables
    const clearState = () => {
        setWords([])
        dispatch(setMessage(''))
    }

    return (
        <div className="card main__card border border-dark 
                border-3 bg-white my-5 rounded-0 shadow">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12">
                        <div className="d-flex flex-column justify-content-start">
                            <div className="mb-3">
                                {
                                    alphabetsList.map((alphabet,index) => (
                                        <button className="btn btn-sm btn-dark rounded-0 me-1 mb-1"
                                            key={index}
                                            onClick={() => findWordByCharacter(alphabet)}
                                            disabled={!isLoggedIn || isLoggedIn && user?.number_of_hearts === 0}
                                        >
                                            { alphabet }
                                        </button>
                                    ))
                                }
                            </div>
                            <TopRightMenu />
                        </div>
                        <div className="row">
                            <div className="col-md-6 mx-auto">
                                {
                                    message ? 
                                        <div className="mt-2 text-center">
                                            <span className="fw-bold">
                                                { message }
                                            </span>
                                        </div>
                                    :
                                    <SearchResults
                                        words={words}
                                        setSearchTerm={null}
                                        clearState={clearState}
                                    />
                                }
                            </div>
                        </div>
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
